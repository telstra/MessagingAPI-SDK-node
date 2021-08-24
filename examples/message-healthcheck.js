var { Message } = require('../dist/index.js');

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const message = new Message();

const mobileNumber = process.env.MOBILE_NUMBER ? process.env.MOBILE_NUMBER : '+61123456789';

/**
 * Message
 */

message
    .healthCheck()
    .then(result => console.log('SUCCESS:message:healthCheck:', result))
    .catch(error => console.error('ERROR:message:healthCheck:', error));
