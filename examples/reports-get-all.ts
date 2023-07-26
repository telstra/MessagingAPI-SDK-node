import { Reports } from '../dist';

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const reports = new Reports(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const reports = new Reports();

/**
 * Reports - Fetch all reports
 */

reports.getAll()
    .then(result => console.log('SUCCESS:reports:getAll:', result))
    .catch(error => console.error('ERROR:reports:getAll:', error))
