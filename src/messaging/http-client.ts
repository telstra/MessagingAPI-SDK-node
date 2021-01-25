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
            console.log('Resolved:', result);
        }

        function rejected(result: any) {
            const { response } = result;
            if (!response) {
                throw new RequestError({
                    status: 500,
                    code: `ERROR`,
                    message: `An error has occurred.`,
                });
            }

            const { data } = response;
            if (!data) {
                throw new RequestError({
                    status: response.status,
                    code: `ERROR`,
                    message: `An error has occurred.`,
                });
            }

            const { error, status, code, message } = data;

            if (error && response.status === 401) {
                throw new AuthError({
                    status: response.status,
                    code: `AUTH_ERROR`,
                    message: `An error has occurred. [${error}]`,
                });
            } else if (response.status === 401) {
                throw new AuthError({ status: response.status, code, message });
            } else if (response.status === 403) {
                throw new AuthError({ status: response.status, code, message });
            } else {
                throw new RequestError({ status, code, message });
            }
        }

        Promise.reject(error).then(resolved, rejected);
    };
}
