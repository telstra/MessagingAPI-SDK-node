import { FreeTrialNumbers } from '../dist/index.js';
import { TGetAll } from '../dist/messaging/types/CommonTypes.js';

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const trialNumber = new TrialNumbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const freeTrialNumbers = new FreeTrialNumbers();

/**
 * FreeTrial Numbers - Fetch all numbers associated to the account
 */
const params : TGetAll = {
    limit: 10,
    offset: 0,    
}
freeTrialNumbers.getAll(params)
    .then(result => console.log('SUCCESS:freeTrialNumbers:getAll:', result))
    .catch(error => console.error('ERROR:freeTrialNumber:getAll:', error))
