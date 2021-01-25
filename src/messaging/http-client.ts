import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthError, RequestError } from './errors';

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError
        );
    };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    // protected _handleError = (error: any) => Promise.reject(error);
    protected _handleError = (error: any) => {
        function resolved(result: any) {
            console.error('resolved:', result);
        }

        function rejected(result: any) {
            // console.error('rejected:', result);
            const { response } = result;
            if (!response) {
                throw new RequestError({
                    errorStatus: 500,
                    errorCode: `ERROR`,
                    errorMessage: `An error has occurred`,
                });
            }

            const { data } = response;
            if (!data) {
                throw new RequestError({
                    errorStatus: response.status,
                    errorCode: `ERROR`,
                    errorMessage: `An error has occurred`,
                });
            }

            const { error, error_description, code, message } = data;

            if (response.status === 401 && error) {
                throw new AuthError({
                    errorStatus: response.status,
                    errorCode: `AUTH_ERROR`,
                    errorMessage: `${error}`,
                });
            } else if (response.status === 401) {
                throw new AuthError({
                    errorStatus: response.status,
                    errorCode: code,
                    errorMessage: message,
                });
            } else if (response.status === 400 && error && error_description) {
                throw new RequestError({
                    errorStatus: response.status,
                    errorCode: `BAD_REQUEST`,
                    errorMessage: `${error} - ${error_description}`,
                });
            } else if (response.status === 400 && error) {
                throw new RequestError({
                    errorStatus: response.status,
                    errorCode: `BAD_REQUEST`,
                    errorMessage: `${error}`,
                });
            } else if (response.status === 400 && code && message) {
                throw new RequestError({
                    errorStatus: response.status,
                    errorCode: code,
                    errorMessage: message,
                });
            } else {
                throw new RequestError({
                    errorStatus: response.status,
                    errorCode: `ERROR`,
                    errorMessage: `An error has occurred`,
                });
            }
        }

        Promise.reject(error).then(resolved, rejected);
    };
}
