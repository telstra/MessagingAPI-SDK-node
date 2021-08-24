var { Message } = require('../dist/index.js');

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const message = new Message();

const messageId = process.env.MESSAGE_ID ? process.env.MESSAGE_ID : 'XXXXX';

message.status(messageId)
    .then(result => console.log('SUCCESS:message:status:', result))
    .catch(error => console.error('ERROR:message:status:', error))
