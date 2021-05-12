import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { Auth } from './Auth';
import {
    TBnumRetrieveResponse,
    TBnumRegisterRequest,
    TBnumRegisterResponse,
} from './types';
import { API_URL } from './constants';
import { remap } from './errors';

export class TrialNumbers extends HttpClient {
    private constructor() {
        super(API_URL);
        this._initializeRequestInterceptor();
    }

    private _initializeRequestInterceptor() {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError
        );
    }

    private async _handleRequest(config: AxiosRequestConfig) {
        try {
            const auth = new Auth();
            const authToken = await auth.getToken();
            config.headers['Content-Type'] = `application/json`;
            config.headers['Authorization'] = `Bearer ${authToken}`;
            return config;
        } catch (error) {
            throw remap(error);
        }
    }

    public async register(body: TBnumRegisterRequest) {
        try {
            const result = await this.instance.post<TBnumRegisterResponse>(
                `/v2/messages/freetrial/bnum`,
                body
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }

    public async get() {
        try {
            const result = await this.instance.get<TBnumRetrieveResponse>(
                `/v2/messages/freetrial/bnum`
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }
}
