import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { Auth } from './Auth';
import {
    TMessage,
    TMessageSendResponse,
    TMessageRepliesResponse,
    TMessageStatusResponse,
} from './types';
import { Validator } from './Validator';
import { API_URL } from './Constants';
import { remap } from './Errors';
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
     * Send an SMS Message to a single or multiple mobile number/s.
     * @param data.to - (Required) Phone number (in E.164 format) to send the message to.
     * @param data.body - (Required) The text body of the message.
     * @param data.from - This will be the source address that will be displayed on the receiving device.
     * @param data.validity - How long the platform should attempt to deliver the message for.
     * @param data.scheduledDelivery - How long the platform should wait before attempting to send the message - specified in minutes.
     * @param data.notifyURL - Contains a URL that will be called once your message has been processed.
     * @param data.replyRequest - If false or not present, then normal message handling is implemented.
     * @param data.priority - When messages are queued up for a number, then it is possible to set where a new message will be placed in the queue.
     * @param data.receiptOff - Whether Delivery Receipt will be sent back or not.
     * @param data.userMsgRef - Optional field used by some clients for custom reporting.
     * @link https://dev.telstra.com/content/messaging-api#operation/sendSms
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = Message.getInstance();

        message.send({
            to: '+61000000000',
            body: 'Hello from Messaging SDK'
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async send(data: TMessage): Promise<TMessageSendResponse> {
        try {
            const validator = new Validator<TMessage>(data);
            validator.check('to', 'string').check('body', 'string');

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
