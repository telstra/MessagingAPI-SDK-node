import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { Auth } from './Auth';
import {
    TMessage,
    TMessageSendResponse,
    TMessageRepliesResponse,
    TMessageStatusResponse,
    AuthConfigProps,
} from './types';
import { Validator } from './Validator';
import { API_URL } from './Constants';
import { remap } from './Errors';
export class Message extends HttpClient {
    public auth: Auth;

    public constructor(authConfig?: AuthConfigProps) {
        super(API_URL);
        if (authConfig) {
            this.auth = new Auth(authConfig);
        } else {
            this.auth = new Auth();
        }
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
            config.headers['Content-Type'] = `application/json`;
            return config;
        } catch (error) {
            throw remap(error);
        }
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

        const message = new Message();

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
    public async send(data: TMessage): Promise<{}> {
        try {
            const validator = new Validator<TMessage>(data);
            validator.check('to').check('body');

            const accessToken = await this.auth.getToken();
            this.instance.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

            const result = await this.instance.post<TMessageSendResponse>(
                `/v2/messages/sms`,
                data
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }

    /**
     * Messages are retrieved one at a time, starting with the earliest reply.
     * The API supports the encoding of emojis in the reply message. The emojis will be in their UTF-8 format.
     * If the subscription has a notifyURL, reply messages will be logged there instead.
     * @link https://dev.telstra.com/content/messaging-api#operation/retrieveInboundSms
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.getNextUnreadReply()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async getNextUnreadReply(): Promise<TMessageRepliesResponse> {
        try {
            const accessToken = await this.auth.getToken();
            this.instance.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

            const result = await this.instance.get<TMessageRepliesResponse>(
                `/v2/messages/sms`
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }

    /**
     * If no delivery receipt notification URL has been specified, it is possible to poll for the message status.
     * @param data.messageId - (Required) Phone number (in E.164 format) to send the message to.
     * @link https://dev.telstra.com/content/messaging-api#operation/getSmsStatus
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.status('<MESSAGE_ID>')
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async status(messageId: string): Promise<TMessageStatusResponse> {
        try {
            const accessToken = await this.auth.getToken();
            this.instance.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

            const result = await this.instance.get<TMessageStatusResponse>(
                `/v2/messages/sms/${messageId}/status`
            );
            return result;
        } catch (error) {
            throw remap(error);
        }
    }
}
