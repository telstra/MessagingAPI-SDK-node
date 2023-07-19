import { HttpClient } from './HttpClient';
import {
    TFreeTrialNumbers,
    AuthConfigProps,
    TGetAll,
} from '../types';
import { Validator } from './Validator';
import { Schemas } from '../schemas';

export class FreeTrialNumbers extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    /**
     * Telstra offers a free trial for the messaging API to help you evaluate whether
     * it meets your needs. There are some restrictions that apply compared to the
     * full API, including a maximum number of messages that can be sent and requiring the
     * registration of a limited number of destinations before a message can be sent
     * to that destination.
     * @param data.freeTrialNumbers - A list of destinations, expected to be phone numbers of the form `04XXXXXXXX`.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#RegisteraFreeTrialNumber
     * @example
        ```typescript
        import { FreeTrialNumber } from '@telstra/messaging'

        const freeTrialNumber = new FreeTrialNumber();

        freeTrialNumber.create({
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
    public async create(data: TFreeTrialNumbers) {
        try {
            const validate = new Validator<TFreeTrialNumbers>(data);
            validate
                .schemaInline(Schemas.CREATE_FREETRIAL_NUMBER);

            const result = await this.instance.post<TFreeTrialNumbers>(
                `/messaging/v3/free-trial-numbers`,
                data
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch the Free Trial Number(s) currently assigned to your account.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FetchyourFreeTrialNumbers
     * @example
        ```typescript
        import { FreeTrialNumber } from '@telstra/messaging'

        const freeTrialNumber = new FreeTrialNumber();

        freeTrialNumber.getAll()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async getAll(data: TGetAll) {
        try {
            const validate = new Validator<TGetAll>(data);
            validate
                .schemaInline(Schemas.GET_ALL);

            const result = await this.instance.get<TFreeTrialNumbers>(
                `/messaging/v3/free-trial-numbers`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}
