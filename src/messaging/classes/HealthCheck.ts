/* eslint-disable */
import { HttpClient } from './HttpClient';
import {
    AuthConfigProps,
    THealthCheck,
} from '../types';

export class HealthCheck extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }
        
    /**
     * Determine whether the messaging service is up or down.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#HealthCheck
     * @example
        ```typescript
        import { HealthCheck } from '@telstra/messaging'

        const healthCheck = new HealthCheck();

        healthCheck.get()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async get(): Promise<THealthCheck> {
        try {
            let result: THealthCheck = { status: undefined };            
            result = await this.instance.get<THealthCheck>(
                `/messaging/v3/health-check`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}