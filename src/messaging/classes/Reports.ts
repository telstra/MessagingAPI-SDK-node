import { HttpClient } from './HttpClient';
import { TReport, AuthConfigProps, TCreateReport } from '../types';
import { Validator } from './Validator';
import { Schemas } from '../schemas';

export class Reports extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    /**
     * Fetch details of all reports recently generated for your account.
     * Use it to check the status of a report, plus fetch the report ID,
     * status, report type and expiry date.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Fetchallreports
     * @example
        ```typescript
        import { Report } from '@telstra/messaging'

        const report = new Report();

        report.getAll()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async getAll() {
        try {
            const result = await this.instance.get<TReport[]>(
                `/messaging/v3/reports`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Use the reportId to fetch a download link for a report generated.
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FetchaReport
     * @example
        ```typescript
        import { Report } from '@telstra/messaging'

        const report = new Report();

        report.get('6940c774-4335-4d2b-b758-4ecb19412e85')
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async get(reportId: string) {
        try {
            const result = await this.instance.get<TReport>(
                `/messaging/v3/reports/${reportId}`
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Request a CSV report of messages (both incoming and outgoing) that have been sent to/from your account within the last three months.
     * @param createReport.startDate
     * @param createReport.endDate
     * @param createReport.reportCallbackUrl
     * @param createReport.filter
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Submitarequestforamessagesreport
     * @example
        ```typescript
        import { Report } from '@telstra/messaging'

        const report = new Report();

        report.create({
            startDate: '2023-03-15',
            endDate: '2023-03-30',
            filter: '0412345678'
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async create(createReport: TCreateReport) {
        try {
            const validate = new Validator<TCreateReport>(createReport);
            validate.schemaInline(Schemas.CREATE_MESSAGES_REPORT);

            const result = await this.instance.post<TReport>(
                `/messaging/v3/reports/messages`,
                createReport
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Request a CSV report of messages (both incoming and outgoing) that have been sent to/from your account within the last three months.
     * @param createReport.startDate
     * @param createReport.endDate
     * @param createReport.reportCallbackUrl
     * @param createReport.filter
     * @link https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Submitarequestforamessagesreport
     * @example
        ```typescript
        import { Report } from '@telstra/messaging'

        const report = new Report();

        report.create({
            startDate: '2023-03-15',
            endDate: '2023-03-30',
            filter: '0412345678'
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
        ```
     */
    public async createDailySummary(createReport: TCreateReport) {
        try {
            const validate = new Validator<TCreateReport>(createReport);
            validate.schemaInline({
                type: 'object',
                properties: {
                    startDate: {
                        type: 'string',
                        format: 'date-time',
                        minLength: 10,
                        maxLength: 24,
                    },
                    endDate: {
                        type: 'string',
                        format: 'date-time',
                        minLength: 10,
                        maxLength: 24,
                    },
                    reportCallbackUrl: {
                        type: 'string',
                    },
                    filter: {
                        type: 'string',
                    },
                },
                required: ['startDate', 'endDate'],
            });
            const result = await this.instance.post<TReport>(
                `/messaging/v3/reports/messages/daily`,
                createReport
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}
