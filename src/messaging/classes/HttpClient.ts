import axios, {
    AxiosInstance,
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
} from 'axios';
import { AuthConfigProps, AuthCredentials } from '../types';
import { Constants } from '../constants';
import { Auth } from './Auth';
import { URLSearchParams } from 'url';
import { RequestError, AuthError } from './Errors';
import {
    getAuthToken,
    setAuthToken,
    getAuthTokenRetryCount,
    setAuthTokenRetryCount,
} from '../utils';

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
    protected readonly instance: AxiosInstance;
    private auth: Auth;
    private authRetryCount: number = 0;

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

    private _handleRequest = async (config: AxiosRequestConfig) => {
        config.headers['User-Agent'] = Constants.USER_AGENT;
        config.headers['X-Telstra-Media-Type'] =
            Constants.X_TELSTRA_AGENT_MEDIA_TYPE;

        // set headers due to oauth api proxy differences
        if (config.url === '/v2/oauth/token') {
            config.headers['Accept'] = `*/*`;
            config.headers[
                'Content-Type'
            ] = `application/x-www-form-urlencoded`;
        } else {
            config.headers['Accept'] = `application/json`;
            config.headers['Content-Type'] = `application/json`;
        }

        if (
            config.url !== '/v2/oauth/token' &&
            config.url !== '/v2/messages/sms/healthcheck' &&
            config.url !== '/v2/messages/mms/healthcheck'
        ) {
            // retrieve token from storage
            const authToken = await getAuthToken();

            if (authToken) {
                // set authorization headers from storage
                config.headers['Authorization'] = `Bearer ${authToken}`;
            }

            if (!authToken) {
                // retrieve auth credentials
                const authCredentials = await this.auth.getCredentials();

                // request new token
                const renewToken = await this.renewToken(authCredentials);

                // set token if valid
                if (renewToken) {
                    // set authorization headers
                    config.headers['Authorization'] = `Bearer ${renewToken}`;
                    // set authorization token in storage
                    await setAuthToken(renewToken);
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

        this.authRetryCount = await getAuthTokenRetryCount();

        // attempt to refresh an auth token
        if (
            error.response?.status === 401 &&
            error.response?.config.url !== '/v2/oauth/token' &&
            this.authRetryCount < 3
        ) {
            // increment auth token retry count
            this.authRetryCount++;
            await setAuthTokenRetryCount(this.authRetryCount.toString());

            // retrieve auth credentials
            const authCredentials = await this.auth.getCredentials();

            // request new token
            const renewToken = await this.renewToken(authCredentials);

            // set token in storage & action original request
            if (renewToken) {
                await setAuthToken(renewToken);
                return this.instance(originalRequest);
            }
        }

        if (error.response?.data?.code && error.response?.data?.message) {
            return Promise.reject(
                new RequestError({
                    errorCode: error.response?.data?.code,
                    errorMessage: error.response?.data?.message,
                })
            );
        }

        if (error.response?.status && error.response?.statusText) {
            return Promise.reject(
                new RequestError(Constants.ERRORS.UNKNOWN_ERROR)
            );
        }

        return Promise.reject(error);
    };

    private async renewToken(
        authCredentials: AuthCredentials
    ): Promise<string> {
        const params = new URLSearchParams();
        params.append('client_id', `${authCredentials.client_id}`);
        params.append('client_secret', `${authCredentials.client_secret}`);
        params.append('grant_type', 'client_credentials');
        params.append('scope', 'NSMS');

        const auth = await this.instance.post(`/v2/oauth/token`, params);
        if (!auth) return auth;
        const { access_token } = auth;
        return access_token;
    }
}
