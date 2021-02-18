import HttpClient from './http-client';
import { AxiosRequestConfig } from 'axios';
import OAUTH from './oauth';
import {
    TSubscriptionCreateRequest,
    TSubscriptionCreateResponse,
    TSubscriptionRetrieveResponse,
    TSubscriptionDeleteRequest,
} from './types';
import { API_URL } from './constants';
import { validateError } from './validate';
export class Subscription extends HttpClient {
    private static classInstance?: Subscription;

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
            this.classInstance = new Subscription();
        }
        return this.classInstance;
    }

    public create = async (body: TSubscriptionCreateRequest) => {
        try {
            const result = await this.instance.post<
                TSubscriptionCreateResponse
            >(`/v2/messages/provisioning/subscriptions`, body);
            return result;
        } catch (error) {
            throw validateError(error);
        }
    };

    public get = async () => {
        try {
            const result = await this.instance.get<
                TSubscriptionRetrieveResponse
            >(`/v2/messages/provisioning/subscriptions`);
            return result;
        } catch (error) {
            console.error(error);
            throw validateError(error);
        }
    };

    public delete = async (body: TSubscriptionDeleteRequest) => {
        try {
            const result = await this.instance.delete(
                `/v2/messages/provisioning/subscriptions`,
                { data: body }
            );
            return result;
        } catch (error) {
            throw validateError(error);
        }
    };
}
