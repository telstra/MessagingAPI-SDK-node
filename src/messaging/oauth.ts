import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { API_URL } from './constants';
import { URLSearchParams } from 'url';
import { getConfig } from './config';
import { validateError } from './validate';
export default class OAUTH extends HttpClient {
    public constructor() {
        super(API_URL);
        this._initializeRequestInterceptor();
    }

    public _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError
        );
    };

    public _handleRequest = (config: AxiosRequestConfig) => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        return config;
    };

    public getToken = async () => {
        try {
            const params = new URLSearchParams();
            const authConfig = await getConfig();
            const { tls_client_key, tls_client_secret } = JSON.parse(
                authConfig
            );
            params.append('client_id', `${tls_client_key}`);
            params.append('client_secret', `${tls_client_secret}`);
            params.append('grant_type', 'client_credentials');
            params.append('scope', 'NSMS');
            const auth = await this.instance.post(`/v2/oauth/token`, params);
            if (!auth) return false;
            const { access_token } = auth;
            return access_token;
        } catch (error) {
            throw validateError(error);
        }
    };
}
