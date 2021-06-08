import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { Auth } from './Auth';
import {
    TSubscriptionCreateRequest,
    TSubscriptionCreateResponse,
    TSubscriptionRetrieveResponse,
    TSubscriptionDeleteRequest,
    AuthConfigProps,
} from './types';
import { Validator } from './Validator';
import { Constants } from './Constants';

export class Numbers extends HttpClient {
    private auth: Auth;

    public constructor(authConfig?: AuthConfigProps) {
        super(Constants.API_URL);
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
            throw error;
        }
    }

    /**
     * Invoke the provisioning API to get a dedicated mobile number for an application.
     * @param subscription.activeDays - (Required) The number of days before for which this number is provisioned.
     * @param subscription.notifyURL - A notification URL that will be POSTed to whenever a new message (i.e. a reply to a message sent) arrives at this destination address. Must end with a trailing slash.
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
            validate.schemaRef('ProvisionNumberRequest').schemaInline({
                properties: {
                    activeDays: {
                        type: 'number',
                        minimum: 1,
                        exclusiveMaximum: 1825,
                    },
                },
                optionalProperties: {
                    notifyURL: {
                        type: 'string',
                    },
                },
                required: ['activeDays'],
                additionalProperties: false,
            });

            const accessToken = await this.auth.getToken();
            this.instance.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

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
            const accessToken = await this.auth.getToken();
            this.instance.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

            const result = await this.instance.get<
                TSubscriptionRetrieveResponse
            >(`/v2/messages/provisioning/subscriptions`);
            return result;
        } catch (error) {
            console.error(error);
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

            const accessToken = await this.auth.getToken();
            this.instance.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

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
