import axios, {
    AxiosInstance,
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { AuthConfigProps, AuthCredentials } from '../types';
import { Constants } from '../constants';
import { Auth } from './Auth';
import { URLSearchParams } from 'url';
import { RequestError, AuthError } from '../common/Errors';
import { setAuthToken, checkTokenValidity } from '../utils';
import { addMinutes } from 'date-fns';

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
    protected readonly instance: AxiosInstance;
    private auth: Auth;

    public constructor(public authConfig?: AuthConfigProps) {
        this.instance = axios.create({
            baseURL: Constants.API_URL,
        });

        if (authConfig) {
            this.auth = new Auth(authConfig);
        } else {
            this.auth = new Auth();
        }

        this._initializeRequestInterceptor();
        this._initializeResponseInterceptor();
    }

    private _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleRequestError
        );
    };

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleResponseError
        );
    };

    private _handleRequest = async (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers ?? {};

        // set headers due to oauth api proxy differences
        if (config.url === '/v2/oauth/token') {
            config.headers['Accept'] = `*/*`;
            config.headers[
                'Content-Type'
            ] = `application/x-www-form-urlencoded`;
        } else {
            config.headers['Telstra-api-version'] = `3.x`;
            config.headers['Content-Language'] = `en-au`;
            config.headers['Accept-Charset'] = `utf-8`;
            config.headers['Accept'] = `application/json`;
            config.headers['Content-Type'] = `application/json`;
            //config.headers['content-type'] = `application/json`;
        }

        if (config.url !== '/v2/oauth/token') {
            // check token validity
            let access_token = await checkTokenValidity();
                       
            if (access_token) {
                config.headers['Authorization'] = `Bearer ${access_token}`;                    
            } else {
                // retrieve auth credentials
                const authCredentials = await this.auth.getCredentials();

                // request new token                                
                let renewed_token = await this.renewToken(authCredentials);                
                // set token if valid
                if (renewed_token) {
                    // set authorization headers
                    config.headers['Authorization'] = `Bearer ${renewed_token}`;                   
                    // set authorization token in storage
                    const futureTimeStamp = addMinutes(
                        new Date(),
                        Constants.TOKEN_EXPIRE_IN_50_MINS
                    );
                    await setAuthToken(
                        renewed_token,
                        futureTimeStamp.toISOString()
                    );
                }
            }
        }

        return config;
    };

    protected _handleRequestError = (error: AxiosError) => {
        return Promise.reject(error);
    };

    private _handleResponse = ({ data }: AxiosResponse) => {
        return data;
    };

    protected _handleResponseError = async (error: AxiosError) => {
        const originalRequest = error.config;

        // request for token failed, issue with client credentials
        if (
            error.response?.status === 401 &&
            error.response?.config.url === '/v2/oauth/token'
        ) {
            return Promise.reject(
                new AuthError(
                    Constants.ERRORS.AUTH_ERROR_INVALID_CLIENT_CREDENTIALS
                )
            );
        }

        // attempt to refresh an auth token
        if (
            error.response?.status === 401 &&
            error.response?.config.url !== '/v2/oauth/token'
        ) {
            // retrieve auth credentials
            const authCredentials = await this.auth.getCredentials();

            // request new token
            let renewed_token = await this.renewToken(authCredentials);

            // set token if valid
            if (renewed_token) {
                // set authorization token in storage
                const futureTimeStamp = addMinutes(
                    new Date(),
                    Constants.TOKEN_EXPIRE_IN_50_MINS
                );
                await setAuthToken(renewed_token, futureTimeStamp.toISOString());

                return this.instance(
                    originalRequest as InternalAxiosRequestConfig
                );
            }
        }

        const responseData: any = error.response?.data;

        if (responseData?.code && responseData?.message) {
            return Promise.reject(
                new RequestError({
                    errorCode: responseData.code,
                    errorMessage: responseData.message,
                })
            );
        }

        if (error.response?.status && error.response?.statusText) {
            return Promise.reject(
                new RequestError({
                    errorCode: `${error.response.status}`,
                    errorMessage: error.response.statusText,
                })
            );
        }

        return Promise.reject(error);
    };

    private async renewToken(authCredentials: AuthCredentials): Promise<string | null> {
        const params = new URLSearchParams();
        params.append('client_id', `${authCredentials.client_id}`);
        params.append('client_secret', `${authCredentials.client_secret}`);
        params.append('grant_type', 'client_credentials');
        params.append(
            'scope',
            'free-trial-numbers:read free-trial-numbers:write messages:read messages:write virtual-numbers:read virtual-numbers:write reports:read reports:write'
        );
    
        try {
            const auth = await this.instance.post(`/v2/oauth/token`, params);
    
            if (auth && auth.access_token) {
                return auth.access_token;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}
