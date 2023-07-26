import { Reports } from '../dist/index.js';
import { TCreateReport } from '../dist/messaging/types/ReportTypes.js';

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const reports = new Reports(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const reports = new Reports();

const startDate = new Date();
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() - 10);

const startDateStr = `${startDate.toLocaleDateString('fr-CA')}`;
const endDateStr = `${endDate.toLocaleDateString('fr-CA')}`;

/**
 * Reports - Create - Daily Summary Report
 */
const params : TCreateReport = {
    startDate: startDateStr,
    endDate: endDateStr
}
reports.createDailySummary(params)
    .then(result => console.log('SUCCESS:reports:create-daily:', result))
    .catch(error => console.error('ERROR:reports:create-daily:', error))