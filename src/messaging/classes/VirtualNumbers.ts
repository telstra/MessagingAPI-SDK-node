import { HttpClient } from './HttpClient';
import {
    TVirtualNumber,
    TVirtualNumbers,
    TRecipientOptouts,
    AuthConfigProps,
    TAssignVirtualNumberRequest,
    TUpdateVirtualNumberRequest,
    TGetAll,
} from '../types';
import { Validator } from './Validator';
import { Schemas } from '../schemas';
import { ToQueryString } from '../utils';

export class VirtualNumbers extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    /**
     * When a recipient receives your message, you can choose whether they'll see a privateNumber, 
     * Virtual Number or senderName (paid plans only) in the from field. 
     * If you want to use a Virtual Number, use this function to assign one.
     * @param data.replyCallbackUrl - (Optional) The URL that replies to the Virtual Number will be posted to.
     * @param data.tags - (Optional) Create your own tags and use them to fetch, sort and report on your Virtual Numbers through our other endpoints. 
     * You can assign up to 10 tags per number.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#AssignaVirtualNumber
     * @example
        ```typescript
        import { VirtualNumber } from '@telstra/messaging'

        const virtualNumber = new VirtualNumber();

        virtualNumber.assign({ tags: ['V3','Batch1'] })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async assign(data?: TAssignVirtualNumberRequest) {
        try {
            if (data) {
                const validate = new Validator<TAssignVirtualNumberRequest>(
                    data
                );
                validate.schemaInline({
                    properties: {
                        tags: {
                            type: 'array',
                            minItems: 0,
                            maxItems: 10,
                            items: {
                                type: 'string',
                                minLength: 1,
                                maxLength: 64,
                            },
                        },
                        replyCallbackUrl: {
                            type: 'string',
                        },
                    },
                    additionalProperties: false,
                });
            }

            const result = await this.instance.post<TVirtualNumber>(
                `/messaging/v3/virtual-numbers`,
                data
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch all Virtual Numbers currently assigned to your account.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FetchallVirtualNumbers
     * @example
        ```typescript
        import { VirtualNumber } from '@telstra/messaging'

        const virtualNumber = new VirtualNumber();

        virtualNumber.getAll()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async getAll(data?: TGetAll) {
        try {
            let qs = '';
            if (data) {
                const validate = new Validator<TGetAll>(data);
                validate.schemaInline(Schemas.GET_ALL);

                qs = `?${ToQueryString(data)}`;
            }

            const result = await this.instance.get<TVirtualNumbers>(
                `/messaging/v3/virtual-numbers${qs}`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch the tags, replyCallbackUrl and lastUse date for a Virtual Number.
     * @param virtualNumber - path param
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FetchaVirtualNumber
     * @example
        ```typescript
        import { VirtualNumber } from '@telstra/messaging'

        const virtualNumber = new VirtualNumber();

        virtualNumber.get('0401234567')
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async get(virtualNumber: string) {
        try {
            const validate = new Validator<object>({ virtualNumber });
            validate.schemaInline({
                properties: {
                    virtualNumber: {
                        type: 'string',
                        minLength: 10,
                        maxLength: 10,
                    },
                },
                additionalProperties: false,
            });
            const result = await this.instance.get<TVirtualNumber>(
                `/messaging/v3/virtual-numbers/${virtualNumber}`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update a virtual number attributes. For more information.
     * @param virtualNumber - path param
     * @param data.replyCallbackUrl - (Optional) The URL that replies to the Virtual Number will be posted to.
     * @param data.tags - (Optional) Create your own tags and use them to fetch, sort and report on your Virtual Numbers through our other endpoints. 
     * You can assign up to 10 tags per number.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#UpdateaVirtualNumber>
     * @example
        ```typescript
        import { VirtualNumber } from '@telstra/messaging'

        const virtualNumber = new VirtualNumber();

        virtualNumber.update({virtualNumber: '0401234567', updateData: { tags: ['V3','Batch1'] }})
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async update(data: TUpdateVirtualNumberRequest) {
        try {
            const validate = new Validator<TUpdateVirtualNumberRequest>(data);
            validate.schemaInline({
                properties: {
                    updateData: {
                        type: 'object',
                        properties: {
                            tags: {
                                type: 'array',
                                minItems: 0,
                                maxItems: 10,
                                items: {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 64,
                                },
                            },
                            replyCallbackUrl: {
                                type: 'string',
                            },
                        },
                        additionalProperties: false,
                    },
                    virtualNumber: {
                        type: 'string',
                        minLength: 10,
                        maxLength: 10,
                    },
                },
                additionalProperties: false,
            });

            const result = await this.instance.put<TVirtualNumber>(
                `/messaging/v3/virtual-numbers/${data.virtualNumber}`,
                data.updateData
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a mobile number subscription from an account
     * @param virtualNumber - path param
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#DeleteaVirtualNumber
     * @example
        ```typescript
        import { VirtualNumber } from '@telstra/messaging'

        const virtualNumber = new VirtualNumber();

        virtualNumber.delete('0401234567')
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async delete(virtualNumber: string) {
        try {
            const validate = new Validator<string>(virtualNumber);
            validate.schemaInline({
                type: 'string',
                minLength: 10,
                maxLength: 10,
            });

            const result = await this.instance.delete(
                `/messaging/v3/virtual-numbers/${virtualNumber}`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch any mobile number(s) that have opted out of receiving messages from a Virtual Number assigned to your account.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Fetchallrecipientoptoutslist
     * @example
        ```typescript
        import { VirtualNumber } from '@telstra/messaging'

        const virtualNumber = new VirtualNumber();

        virtualNumber.getOptouts('0401234567')
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async getOptouts(virtualNumber: string) {
        try {
            const validate = new Validator<object>({ virtualNumber });
            validate.schemaInline({
                properties: {
                    virtualNumber: {
                        type: 'string',
                        minLength: 10,
                        maxLength: 10,
                    },
                },
                additionalProperties: false,
            });

            const result = await this.instance.get<TRecipientOptouts>(
                `/messaging/v3/virtual-numbers/${virtualNumber}/optouts`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}
