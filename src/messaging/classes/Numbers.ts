import { HttpClient } from './HttpClient';
import {
    TSubscriptionCreateRequest,
    TSubscriptionCreateResponse,
    TSubscriptionRetrieveResponse,
    TSubscriptionDeleteRequest,
    AuthConfigProps,
} from '../types';
import { Validator } from './Validator';

export class Numbers extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    /**
     * Invoke the provisioning API to get a dedicated mobile number for an application.
     * @param subscription.activeDays - (Optional) The number of days before for which this number is provisioned.
     * @param subscription.notifyURL - (Optional) A notification URL that will be POSTed to whenever a new message (i.e. a reply to a message sent) arrives at this destination address. Must end with a trailing slash.
     * @link https://dev.telstra.com/content/messaging-api#operation/createSubscription
     * @example
        ```typescript
        import { Numbers } from '@telstra/messaging'

        const numbers = new Numbers();

        numbers.register({ activeDays: 1 })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async create(subscription: TSubscriptionCreateRequest) {
        try {
            const validate = new Validator<TSubscriptionCreateRequest>(
                subscription
            );
            validate.schemaInline({
                properties: {
                    activeDays: {
                        type: 'number',
                        minimum: 1,
                        exclusiveMaximum: 1825,
                    },
                    notifyURL: {
                        type: 'string',
                    },
                },
                additionalProperties: false,
            });

            const result = await this.instance.post<
                TSubscriptionCreateResponse
            >(`/v2/messages/provisioning/subscriptions`, subscription);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieve mobile number subscription for an account.
     * @link https://dev.telstra.com/content/messaging-api#operation/getSubscription
     * @example
        ```typescript
        import { Numbers } from '@telstra/messaging'

        const numbers = new Numbers();

        numbers.get()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async get() {
        try {
            const result = await this.instance.get<
                TSubscriptionRetrieveResponse
            >(`/v2/messages/provisioning/subscriptions`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a mobile number subscription from an account
     * @param subscription.emptyArr - (Required)
     * @link https://dev.telstra.com/content/messaging-api#operation/deleteSubscription
     * @example
        ```typescript
        import { Numbers } from '@telstra/messaging'

        const numbers = new Numbers();

        numbers.delete({ emptyArr: 0 })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async delete(subscription: TSubscriptionDeleteRequest) {
        try {
            const validate = new Validator<TSubscriptionDeleteRequest>(
                subscription
            );
            validate.schemaRef('DeleteNumberRequest').schemaInline({
                properties: {
                    emptyArr: {
                        type: 'number',
                    },
                },
                required: ['emptyArr'],
                additionalProperties: false,
            });

            const result = await this.instance.delete(
                `/v2/messages/provisioning/subscriptions`,
                { data: subscription }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}
