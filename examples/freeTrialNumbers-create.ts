import { FreeTrialNumbers } from '../dist/index.js';
import { TFreeTrialNumbers } from '../dist/messaging/types/FreeTrialNumberTypes.js';

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const trialNumber = new TrialNumbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const freeTrialNumbers = new FreeTrialNumbers();

/**
 * FreeTrial Numbers - Create
 */

const params: TFreeTrialNumbers = {
    freeTrialNumbers: [
        "0412345678"
    ]
};

freeTrialNumbers.create(params)
.then(result => {
    console.log('SUCCESS:freeTrialNumbers:create:', result);
})
.catch(error => {
    console.error('ERROR:freeTrialNumber:create:', error);
});
