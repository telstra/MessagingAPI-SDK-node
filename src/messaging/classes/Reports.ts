import { HttpClient } from './HttpClient';
import { TReport, AuthConfigProps, TCreateReport } from '../types';
import { Validator } from './Validator';
import { Schemas } from '../schemas';
import { AssertionError } from './Errors';
import * as uuid from 'uuid';

export class Reports extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(authConfig);
    }

    private validateReportIdParam(reportId: string) {
        if (!uuid.validate(reportId)) {
            throw new AssertionError({
                errorCode: 'MISSING_ATTRIBUTE',
                errorMessage: `data.reportId should match UUID format string.`,
            });
        }
    }

    private validateReportDates(startDate: string, endDate: string) {
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const reportStartRangeDate = new Date(today);
        reportStartRangeDate.setDate(today.getDate() - 90);

        if (sDate > tomorrow || eDate > tomorrow) {
            throw new AssertionError({
                errorCode: 'INVALID_ATTRIBUTE',
                errorMessage: `data.startDate, data.endDate should match 'yyyy-mm-dd' date format as string and should be in past.`,
            });
        }

        if (sDate > eDate) {
            throw new AssertionError({
                errorCode: 'INVALID_ATTRIBUTE',
                errorMessage: `data.startDate should always be older than data.endDate.`,
            });
        }

        if (sDate < reportStartRangeDate) {
            throw new AssertionError({
                errorCode: 'INVALID_ATTRIBUTE',
                errorMessage: `data.startDate should not be older than 90 days from today.`,
            });
        }
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
            this.validateReportIdParam(reportId);

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

            this.validateReportDates(
                createReport.startDate,
                createReport.endDate
            );

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
            validate.schemaInline(Schemas.CREATE_MESSAGES_REPORT);

            this.validateReportDates(
                createReport.startDate,
                createReport.endDate
            );

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
