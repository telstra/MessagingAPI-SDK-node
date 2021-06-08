import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { Auth } from './Auth';
import {
    TBnumRetrieveResponse,
    TBnumRegisterRequest,
    TBnumRegisterResponse,
    AuthConfigProps,
} from './types';
import { Validator } from './Validator';
import { Constants } from './Constants';

export class TrialNumbers extends HttpClient {
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

            const accessToken = await this.auth.getToken();
            this.instance.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

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
            const accessToken = await this.auth.getToken();
            this.instance.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

            const result = await this.instance.get<TBnumRetrieveResponse>(
                `/v2/messages/freetrial/bnum`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}
