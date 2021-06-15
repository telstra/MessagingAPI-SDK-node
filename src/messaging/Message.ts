import { HttpClient } from './HttpClient';
import {
    TMessage,
    TMessageSendResponse,
    TMessageRepliesResponse,
    TMessageStatusResponse,
    AuthConfigProps,
    THealthCheck,
    TMessageHealthCheck,
} from './types';
import { Validator } from './Validator';

export class Message extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    /**
     * Send an SMS Message to a single or multiple mobile number/s.
     * @param message.to - (Required) Phone number (in E.164 format) to send the message to.
     * @param message.body - (Required) The text body of the message.
     * @param message.from - This will be the source address that will be displayed on the receiving device.
     * @param message.validity - How long the platform should attempt to deliver the message for.
     * @param message.scheduledDelivery - How long the platform should wait before attempting to send the message - specified in minutes.
     * @param message.notifyURL - Contains a URL that will be called once your message has been processed.
     * @param message.replyRequest - If false or not present, then normal message handling is implemented.
     * @param message.priority - When messages are queued up for a number, then it is possible to set where a new message will be placed in the queue.
     * @param message.receiptOff - Whether Delivery Receipt will be sent back or not.
     * @param message.userMsgRef - Optional field used by some clients for custom reporting.
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
    public async send(message: TMessage): Promise<TMessageSendResponse> {
        try {
            const validate = new Validator<TMessage>(message);

            // validate using json schema
            validate.schemaRef('SendSMSRequest');

            // validate message type sms|mms
            if (message?.type) {
                validate.schemaInline({
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                            enum: ['sms', 'mms'],
                        },
                    },
                });
            }

            let apiResource: string = '/v2/messages/sms';
            if (message?.multimedia) {
                apiResource = '/v2/messages/mms';
            }

            const result = await this.instance.post<TMessageSendResponse>(
                apiResource,
                message
            );
            return result;
        } catch (error) {
            throw error;
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
            const result = await this.instance.get<TMessageRepliesResponse>(
                `/v2/messages/sms`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * If no delivery receipt notification URL has been specified, it is possible to poll for the message status.
     * @param messageId - (Required) Phone number (in E.164 format) to send the message to.
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
            const validate = new Validator<string>(messageId);
            validate.schemaInline({
                type: 'string',
            });

            const result = await this.instance.get<TMessageStatusResponse>(
                `/v2/messages/sms/${messageId}/status`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Determine whether the messaging service is up or down.
     * @link https://dev.telstra.com/content/messaging-api#operation/smsHealthCheck
     * @link https://dev.telstra.com/content/messaging-api#operation/mmsHealthCheck
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.healthCheck()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async healthCheck(): Promise<TMessageHealthCheck> {
        try {
            let result: TMessageHealthCheck = {
                sms: { status: undefined },
                mms: { status: undefined },
            };
            result.sms = await this.instance.get<THealthCheck>(
                '/v2/messages/sms/healthcheck'
            );
            result.mms = await this.instance.get<THealthCheck>(
                `/v2/messages/mms/healthcheck`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}
