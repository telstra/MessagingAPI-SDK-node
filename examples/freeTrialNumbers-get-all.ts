import { FreeTrialNumbers } from '../dist/index.js';

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const trialNumber = new TrialNumbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const freeTrialNumbers = new FreeTrialNumbers();

/**
 * FreeTrial Numbers - Fetch all numbers associated to the account
 */
freeTrialNumbers.getAll()
    .then(result => console.log('SUCCESS:freeTrialNumbers:getAll:', result))
    .catch(error => console.error('ERROR:freeTrialNumber:getAll:', error));
