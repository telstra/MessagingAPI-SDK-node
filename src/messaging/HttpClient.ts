/* eslint-disable */
import axios, {
    AxiosInstance,
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';
import {
    AuthConfigProps,
    AuthCredentials,
} from './types';
import { Constants } from './Constants';
import { Auth } from './Auth';
import { URLSearchParams } from 'url';
import {
    RequestError,
    AuthError,
} from './Errors';
import {
    getAuthToken,
    setAuthToken,
} from './config';

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
            this._handleRequestError,
        );
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleResponseError,
        );
    };

    private _handleRequest = async (config: AxiosRequestConfig) => {

        if (config.url !== '/v2/oauth/token') {
            config.headers['Content-Type'] = `application/json`;

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
                    // set authorization headers in storage
                    await setAuthToken(renewToken);
                }
            }
        } else {
            // api auth token endpoint requires this :(
            config.headers['Content-Type'] = `application/x-www-form-urlencoded`;
        }
        return config;
    }

    protected _handleRequestError = (error: AxiosError) => Promise.reject(error);

    private _handleResponse = ({ data }: AxiosResponse) => data;

    protected _handleResponseError = async (error: AxiosError) => {

        // request for token failed, issue with client credentials
        if (error.response?.status === 401 && error.response?.config.url === '/v2/oauth/token') {
            return Promise.reject(
                new AuthError(Constants.ERRORS.AUTH_ERROR_INVALID_CLIENT_CREDENTIALS)
            );
        }

        if (error.response?.data?.code && error.response?.data?.message) {
            return Promise.reject(
                new RequestError({
                    errorCode: error.response?.data?.code,
                    errorMessage: error.response?.data?.message,
                })
            );
        }

        return Promise.reject(error);
    };

    private async renewToken(authCredentials: AuthCredentials): Promise<string> {
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
