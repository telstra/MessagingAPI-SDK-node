var { TrialNumbers } = require('../dist/index.js');

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const trialNumber = new TrialNumbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const trialNumber = new TrialNumbers();

/**
 * Trial Numbers
 */

trialNumber.get()
    .then(result => console.log('SUCCESS:trialNumber:get:', result))
    .catch(error => console.error('ERROR:trialNumber:get:', error))
