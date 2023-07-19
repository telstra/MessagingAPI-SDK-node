/* eslint-disable */
import { HttpClient } from './HttpClient';
import {
    TMessages,
    TMessageSendResponse,
    AuthConfigProps,
    TMessageGetResponse,
    TMessageUpdateTags,
    TMessageUpdate,
    TMessageSend,
    TGetAll,
} from '../types';
import { Validator } from './Validator';
import { Schemas } from '../schemas';
import { AssertionError } from './Errors';
import * as uuid from 'uuid';

export class Messages extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    private validateSendUpdateMessageArgs(message: TMessageSend) {
        if(message.scheduleSend) {
            const regExp = new RegExp('^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2}(?:\\.\\d*)?)(Z)$');
            if(!regExp.test(message.scheduleSend)) {
                throw new AssertionError({
                    errorCode: 'MISSING_ATTRIBUTE',
                    errorMessage: `data.scheduleSend should match a ISO format date-time string, e.g. '2022-07-13T05:25:14.591Z'`,
                });
            }
        }

        if(message.statusCallbackUrl) {
            const regExp = new RegExp('^(https:\/\/)([a-zA-Z0-9\.\/]{2,})');
            if(!regExp.test(message.statusCallbackUrl)) {
                throw new AssertionError({
                    errorCode: 'MISSING_ATTRIBUTE',
                    errorMessage: `data.statusCallbackUrl should match a URL format string, e.g. 'https://example.com'`,
                });
            }
        }
    }

    private validateMessageIdParam(messageId: string) {
        if (!uuid.validate(messageId) || uuid.version(messageId) !== 1) {
            throw new AssertionError({
                errorCode: 'MISSING_ATTRIBUTE',
                errorMessage: `data.messageId should match UUID v1 format string.`,
            });
        }
    }

    /**
     * Send a Message to a single or multiple mobile number/s.
     * @param message.to - The destination address, expected to be a phone number of the form `+614XXXXXXXX` or `04XXXXXXXX`.
     * @param message.from - This will be either "privateNumber", one of your Virtual Numbers or your senderName.
     * @param message.messageContent - The content of the message. Either one of messageContent or multimedia is required.
     * @param message.multimedia - MMS multimedia content.
     * @param message.retryTimeout - How many minutes you asked the server to keep trying to send the message.
     * @param message.scheduled - The time (in Central Standard Time) the message is scheduled to send.
     * @param message.deliveryNotification - If set to true, you will receive a notification to the statusCallbackUrl when your SMS or MMS is delivered (paid feature).
     * @param message.statusCallbackUrl - The URL the API will call when the status of the message changes.
     * @param message.tags - Any customisable tags assigned to the message.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#SendanSMSorMMS
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
    public async send(message: TMessageSend): Promise<TMessageSendResponse> {
        try {
            const validate = new Validator<TMessageSend>(message);
            validate
                .schemaInline(Schemas.SEND_MESSAGE);

            this.validateSendUpdateMessageArgs(message);

            const result = await this.instance.post<TMessageSendResponse>(
                '/messaging/v3/messages',
                message
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update a message that's scheduled for sending, you can change any of the below parameters, as long as the message hasn't been sent yet.
     * @param message.messageId - (Required) Unique identifier for the message.
     * @param message.to - The destination address, expected to be a phone number of the form `+614XXXXXXXX` or `04XXXXXXXX`.
     * @param message.from - This will be either "privateNumber", one of your Virtual Numbers or your senderName.
     * @param message.messageContent - The content of the message. Either one of messageContent or multimedia is required.
     * @param message.multimedia - MMS multimedia content.
     * @param message.retryTimeout - How many minutes you asked the server to keep trying to send the message.
     * @param message.scheduled - The time (in Central Standard Time) the message is scheduled to send.
     * @param message.deliveryNotification - If set to true, you will receive a notification to the statusCallbackUrl when your SMS or MMS is delivered (paid feature).
     * @param message.statusCallbackUrl - The URL the API will call when the status of the message changes.
     * @param message.tags - Any customisable tags assigned to the message.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Updateamessage
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.update(
        )
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async update(
        message: TMessageUpdate
    ): Promise<TMessageSendResponse> {
        try {
            const validate = new Validator<TMessageUpdate>(message);
            validate
                .schemaInline(Schemas.UPDATE_MESSAGE);

            this.validateSendUpdateMessageArgs(message);
            
            const result = await this.instance.put<TMessageSendResponse>(
                `/messaging/v3/messages/${message.messageId}`,
                message
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update message tags, you can update them even after your message has been delivered.
     * @param message.messageId - (Required) Unique identifier for the message.
     * @param message.tags - Any customisable tags assigned to the message.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Updatemessagetags
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.updateTags({
                messageId: '<MESSAGE_ID>',
                tags: ['tag1', 'tag2']
            }
        )
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async updateTags(
        message: TMessageUpdateTags
    ): Promise<void> {
        try {
            const validate = new Validator<TMessageUpdateTags>(message);
            validate
                .schemaInline(Schemas.UPDATE_MESSAGE_TAGS);

            this.validateMessageIdParam(message.messageId);
            
            const result = await this.instance.patch(
                `/messaging/v3/messages/${message.messageId}`,
                message
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Use the messageId to fetch a message that's been sent from/to your account within the last 30 days.
     * @param messageId - (Required) Unique identifier for the message.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Fetchamessage
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.get('<MESSAGE_ID>')
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async get(messageId: string): Promise<TMessageGetResponse> {
        try {            
            this.validateMessageIdParam(messageId);
            
            const result = await this.instance.get(`/messaging/v3/messages/${messageId}`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch messages that have been sent from/to your account in the last 30 days.
     * @param messageId - (Required) Unique identifier for the message.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Fetchallsent/receivedmessages
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.getAll()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async getAll(data: TGetAll): Promise<TMessages> {
        try {
            const validate = new Validator<TGetAll>(data);
            validate
                .schemaInline(Schemas.GET_ALL);
            
            const result = await this.instance.get<TMessages>(`/messaging/v3/messages`);            
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a scheduled message, but hasn't yet sent.
     * @param messageId - (Required) Unique identifier for the message.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Deleteamessage
     * @example
        ```typescript
        import { Message } from '@telstra/messaging'

        const message = new Message();

        message.delete('<MESSAGE_ID>')
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async delete(messageId: string): Promise<void> {
        try {
            const validate = new Validator<string>(messageId);
            validate.schemaInline({
                    type: 'string',                    
                    minLength: 36,
                    maxLength: 36,
                    format: 'uuid',
                });
            
            const result = await this.instance.delete(`/messaging/v3/messages/${messageId}`);
            return result;
        } catch (error) {
            throw error;
        }
    }
} 