/* eslint-disable */
import { HttpClient } from './HttpClient';
import {
    TMessage,
    TMessageSendResponse,
    TMessageRepliesResponse,
    TMessageRepliesSMSResponseObject,
    TMessageRepliesMMSResponseObject,
    TMessageStatusResponse,
    AuthConfigProps,
    THealthCheck,
    TMessageHealthCheck,
    TMessagingMulti,
} from '../types';
import { Validator } from './Validator';

export class Message extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    /**
     * Send a Message to a single or multiple mobile number/s.
     * @param message.to - (Required) Phone number (in E.164 format) to send the message to.
     * @param message.body - (Required) The text body of the message.
     * @param message.from - This will be the source address that will be displayed on the receiving device.
     * @param message.validity - How long the platform should attempt to deliver the message for.
     * @param message.scheduledDelivery - How long the platform should wait before attempting to send the message - specified in minutes.
     * @param message.notifyURL - Contains a URL that will be called once your message has been processed.
     * @param message.replyRequest - If false or not present, then normal message handling is implemented.
     * @param message.priority - When messages are queued up for a number, then it is possible to set where a new message will be placed in the queue.
     * @param message.receiptOff - Whether Delivery Receipt will be sent back or not.
     * @param message.MMSContent - Optional field used by some clients to send a mms.
     * @link https://dev.telstra.com/content/messaging-api#operation/sendMms
     * @param message.subject - Optional field used by some clients to send a mms with a subject.
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
            let apiResource: string = '/v2/messages/sms';
            const validate = new Validator<TMessage>(message);
            /** validate a multimedia message */
            if (message?.MMSContent) {
                validate
                    // .schemaRef('SendMmsRequest')
                    .schemaInline({
                        type: 'object',
                        properties: {
                            to: {
                                anyOf: [
                                    {
                                        $ref: '#/$defs/to',
                                    },
                                    {
                                        type: 'array',
                                        items: { $ref: '#/$defs/to' },
                                        minItems: 1,
                                        maxItems: 10,
                                        uniqueItems: true,
                                    },
                                ],
                            },
                            from: {
                                type: 'string',
                            },
                            notifyURL: {
                                type: 'string',
                            },
                            replyRequest: {
                                type: 'boolean',
                            },
                            subject: {
                                type: 'string',
                                maxLength: 64,
                            },
                            MMSContent: {
                                type: 'array',
                                items: {
                                    $ref: '#/$defs/MMSContentObject',
                                },
                                uniqueItems: true,
                            },
                        },
                        required: ['to', 'MMSContent'],
                        $defs: {
                            to: {
                                type: 'string',
                                minLength: 10,
                                maxLength: 12,
                            },
                            MMSContentObject: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                        enum: [
                                            'audio/amr',
                                            'audio/aac',
                                            'audio/mp3',
                                            'audio/mpeg3',
                                            'audio/mpeg',
                                            'audio/mpg',
                                            'audio/wav',
                                            'audio/3gpp',
                                            'audio/mp4',
                                            'image/gif',
                                            'image/jpeg',
                                            'image/jpg',
                                            'image/png',
                                            'image/bmp',
                                            'video/mpeg4',
                                            'video/mp4',
                                            'video/mpeg',
                                            'video/3gpp',
                                            'video/3gp',
                                            'video/h263',
                                            'text/plain',
                                            'text/x-vCard',
                                            'text/x-vCalendar',
                                        ],
                                    },
                                    payload: {
                                        type: 'string',
                                    },
                                    filename: {
                                        type: 'string',
                                    },
                                },
                                required: ['type', 'payload'],
                            },
                        },
                    });
                apiResource = '/v2/messages/mms';
            } else {
                /** validate a text message */
                validate
                    // .schemaRef('SendSMSRequest')
                    .schemaInline({
                        type: 'object',
                        properties: {
                            to: {
                                anyOf: [
                                    {
                                        $ref: '#/$defs/to',
                                    },
                                    {
                                        type: 'array',
                                        items: { $ref: '#/$defs/to' },
                                        minItems: 1,
                                        maxItems: 10,
                                        uniqueItems: true,
                                    },
                                ],
                            },
                            body: {
                                type: 'string',
                                minLength: 1,
                                maxLength: 1900,
                            },
                            from: {
                                type: 'string',
                            },
                            validity: {
                                type: 'number',
                                minimum: 1,
                                exclusiveMaximum: 10080, // max 7 days
                            },
                            scheduledDelivery: {
                                type: 'number',
                                minimum: 1,
                            },
                            notifyURL: {
                                type: 'string',
                            },
                            replyRequest: {
                                type: 'boolean',
                            },
                            priority: {
                                type: 'boolean',
                            },
                            receiptOff: {
                                type: 'boolean',
                            },
                            userMsgRef: {
                                type: 'string',
                            },
                        },
                        required: ['to', 'body'],
                        $defs: {
                            to: {
                                type: 'string',
                                minLength: 10,
                                maxLength: 12,
                            },
                        },
                    });
            }
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
     * Send multiple messages.
     * @param message.smsMulti - (Required) Array, multiple SMS. Up to 10 messages can be sent in one API call.
     * @param message.notifyURL - Contains a URL that will be called once your message has been processed.
     * @link https://dev.telstra.com/content/messaging-api#operation/sendMultipleSms
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.sendBulk(
            [
                { to: '<MOBILE_NUMBER_1>', body: 'Hello and welcome recipient 1' },
                { to: '<MOBILE_NUMBER_2>', body: 'New message to recipient 2' }
                { to: '<MOBILE_NUMBER_3>', body: 'Followup message to recipient 3' }
            ],
            notifyURL: '<WEBHOOK_ENDPOINT>'
        )
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async sendBulk(
        message: TMessagingMulti
    ): Promise<TMessageSendResponse> {
        try {
            const validate = new Validator<TMessagingMulti>(message);
            validate
                // .schemaRef('SendSmsMultiRequest')
                .schemaInline({
                    $id:
                        'https://dev.telstra.com/messages-send-multi.schema.json',
                    // $schema: "https://dev.telstra.com/telstra-root.schema.json",
                    description: 'A representation of a send multi messages',
                    type: 'object',
                    properties: {
                        smsMulti: {
                            type: 'array',
                            items: { $ref: '#/$defs/multisms' },
                            minItems: 1,
                            maxItems: 10,
                            uniqueItems: true,
                        },
                    },
                    required: ['smsMulti'],
                    optionalProperties: {
                        notifyURL: {
                            type: 'string',
                        },
                    },
                    $defs: {
                        multisms: {
                            type: 'object',
                            required: ['to', 'body'],
                            properties: {
                                to: {
                                    type: 'string',
                                    minLength: 10,
                                    maxLength: 12,
                                },
                                body: {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 1900,
                                },
                                receiptOff: {
                                    type: 'boolean',
                                },
                            },
                        },
                    },
                });

            // Constraint that json schema is not able to cover
            const receiptOff =
                message.smsMulti.filter(function(o) {
                    return o.hasOwnProperty('receiptOff');
                }).length > 0;
            if (!receiptOff) {
                validate.schemaInline({
                    type: 'object',
                    properties: {
                        notifyURL: {
                            type: 'string',
                        },
                    },
                    required: ['notifyURL'],
                });
            }

            const result = await this.instance.post<TMessageSendResponse>(
                `/v2/messages/sms/multi`,
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
            const smsResult = await this.instance.get<
                TMessageRepliesSMSResponseObject
            >(`/v2/messages/sms`);
            const mmsResult = await this.instance.get<
                TMessageRepliesMMSResponseObject
            >(`/v2/messages/mms`);
            let result = { sms: smsResult, mms: mmsResult };
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
            const regex = /mmsc.telstra.com/g;
            const isMMS = messageId.match(regex);
            validate.schemaInline({
                type: 'string',
            });
            const result =
                isMMS !== null
                    ? await this.instance.get<TMessageStatusResponse>(
                          `/v2/messages/mms/${messageId}/status`
                      )
                    : await this.instance.get<TMessageStatusResponse>(
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
