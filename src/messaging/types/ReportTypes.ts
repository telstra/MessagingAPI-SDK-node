export type TReport = {
    reportId: string;
    reportStatus?: string;
    reportType?: string;
    reportExpiry?: string;
    reportUrl?: string;
    reportCallbackUrl?: string;
};

export type TCreateReport = {
    startDate: string;
    endDate: string;
    reportCallbackUrl?: string;
    filter?: string;
};
