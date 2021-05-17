import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { Auth } from './Auth';
import {
    TSubscriptionCreateRequest,
    TSubscriptionCreateResponse,
    TSubscriptionRetrieveResponse,
    TSubscriptionDeleteRequest,
} from './types';
import { API_URL } from './Constants';
import { remap } from './Errors';
export class Numbers extends HttpClient {
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

    public async create(body: TSubscriptionCreateRequest) {
        try {
            const result = await this.instance.post<
                TSubscriptionCreateResponse
            >(`/v2/messages/provisioning/subscriptions`, body);
            return result;
        } catch (error) {
            throw remap(error);
        }
    }

    public async get() {
        try {
            const result = await this.instance.get<
                TSubscriptionRetrieveResponse
            >(`/v2/messages/provisioning/subscriptions`);
            return result;
        } catch (error) {
            console.error(error);
            throw remap(error);
        }
    }

    public async delete(body: TSubscriptionDeleteRequest) {
        try {
            const result = await this.instance.delete(
                `/v2/messages/provisioning/subscriptions`,
                { data: body }
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }
}
