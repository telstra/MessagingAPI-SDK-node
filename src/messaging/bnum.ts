import HttpClient from './http-client';
import { AxiosRequestConfig } from 'axios';
import OAUTH from './oauth';
import {
    TBnumRetrieveResponse,
    TBnumRegisterRequest,
    TBnumRegisterResponse,
} from './types';
import { API_URL } from './constants';
import { validateError } from './validate';

export class BNUM extends HttpClient {
    private static classInstance?: BNUM;

    private constructor() {
        super(API_URL);
        this._initializeRequestInterceptor();
    }

    private _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError
        );
    };

    private _handleRequest = async (config: AxiosRequestConfig) => {
        try {
            const oauth = new OAUTH();
            const authToken = await oauth.getToken();
            config.headers['Content-Type'] = `application/json`;
            config.headers['Authorization'] = `Bearer ${authToken}`;
            return config;
        } catch (error) {
            throw validateError(error);
        }
    };

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new BNUM();
        }
        return this.classInstance;
    }

    public register = async (body: TBnumRegisterRequest) => {
        try {
            const result = await this.instance.post<TBnumRegisterResponse>(
                `/v2/messages/freetrial/bnum`,
                body
            );
            return result;
        } catch (error) {
            throw validateError(error);
        }
    };

    public get = async () => {
        try {
            const result = await this.instance.get<TBnumRetrieveResponse>(
                `/v2/messages/freetrial/bnum`
            );
            return result;
        } catch (error) {
            throw validateError(error);
        }
    };
}
