import { HealthCheck } from '../dist/index.js'

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const healthCheck = new HealthCheck(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const healthCheck = new HealthCheck();

healthCheck.get()
.then(result => {
    console.log('SUCCESS:healthCheck:', result);
})
.catch(error => {
    console.error('ERROR:healthCheck:', error);
});
