import { HttpClient } from './HttpClient';
import {
    TBnumRetrieveResponse,
    TBnumRegisterRequest,
    TBnumRegisterResponse,
    AuthConfigProps,
} from '../types';
import { Validator } from './Validator';

export class TrialNumbers extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    /**
     * Free Trial apps are required to register destination mobile numbers that will be used while trialling Telstra's Messaging API.
     * Up to five destination numbers can be registered.
     * @param data.bnum - (Required) List of destination numbers.
     * @link https://dev.telstra.com/content/messaging-api#operation/freeTrialBnumRegister
     * @example
        ```typescript
        import { TrialNumbers } from '@telstra/messaging'

        const trialNumber = new TrialNumbers();

        trialNumber.register({
            bnum: [
                "<MOBILE_NUMBER>"
            ]
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async register(body: TBnumRegisterRequest) {
        try {
            const validate = new Validator<TBnumRegisterRequest>(body);
            validate
                // .schemaRef('inline_object')
                .schemaInline({
                    properties: {
                        bnum: {
                            type: 'array',
                            items: {
                                type: 'string',
                                minLength: 10,
                                maxLength: 12,
                            },
                            minItems: 1,
                            maxItems: 5,
                            uniqueItems: true,
                        },
                    },
                    required: ['bnum'],
                    additionalProperties: false,
                });

            const result = await this.instance.post<TBnumRegisterResponse>(
                `/v2/messages/freetrial/bnum`,
                body
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get list of destination numbers registered for Free Trial account.
     * @link https://dev.telstra.com/content/messaging-api#operation/freeTrialBnumList
     * @example
        ```typescript
        import { TrialNumbers } from '@telstra/messaging'

        const trialNumber = new TrialNumbers();

        trialNumber.get()
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
            const result = await this.instance.get<TBnumRetrieveResponse>(
                `/v2/messages/freetrial/bnum`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}
