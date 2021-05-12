import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { Auth } from './Auth';
import {
    TMessageSendRequest,
    TMessageSendResponse,
    TMessageRepliesResponse,
    TMessageStatusResponse,
} from './types';
import { API_URL } from './constants';
import { remap } from './errors';
export class Message extends HttpClient {
    /**
     * property to cache our single instance
     * private - so we can’t get it outside the class
     * static - so we use it without creating an instance
     */
    private static classInstance?: Message;

    /**
     * private constructor to prevent the ability to create an instance
     */
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

    private async _handleRequest(
        config: AxiosRequestConfig
    ): Promise<AxiosRequestConfig> {
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

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new Message();
        }
        return this.classInstance;
    }

    /**
     * @param data.to - Number of the recipient who will receive the message
     * @param data.body - Message you are sending to the recipient
     */
    public async send(
        data: TMessageSendRequest
    ): Promise<TMessageSendResponse> {
        try {
            const result = await this.instance.post<TMessageSendResponse>(
                `/v2/messages/sms`,
                data
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }

    public async getNextUnreadReply(): Promise<TMessageRepliesResponse> {
        try {
            const result = await this.instance.get<TMessageRepliesResponse>(
                `/v2/messages/sms`
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }

    /**
     * @param messageId - Id of the message being retrieved
     */
    public async status(messageId: string): Promise<TMessageStatusResponse> {
        try {
            const result = await this.instance.get<TMessageStatusResponse>(
                `/v2/messages/sms/${messageId}/status`
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }
}
