import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import OAUTH from './oauth';
import {
    TMessageSendRequest,
    TMessageSendResponse,
    TMessageRepliesResponse,
    TMessageStatusResponse,
} from './types';
import { API_URL } from './constants';
import { validateError } from './validate';
export class SMS extends HttpClient {
    /**
     * private, to prevent the ability to create an instance
     */
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

    public send = async (body: TMessageSendRequest) => {
        try {
            const result = await this.instance.post<TMessageSendResponse>(
                `/v2/messages/sms`,
                body
            );
            return result;
        } catch (error) {
            throw validateError(error);
        }
    };

    public get_next_unread_reply = async () => {
        try {
            const result = await this.instance.get<TMessageRepliesResponse>(
                `/v2/messages/sms`
            );
            return result;
        } catch (error) {
            throw validateError(error);
        }
    };

    public status = async (messageId: string) => {
        try {
            const result = await this.instance.get<TMessageStatusResponse>(
                `/v2/messages/sms/${messageId}/status`
            );
            return result;
        } catch (error) {
            throw validateError(error);
        }
    };
}
