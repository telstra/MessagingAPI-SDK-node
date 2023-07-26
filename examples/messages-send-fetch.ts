import { Messages } from '../dist/index.js'

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const message = new Messages();

message.send({
    to: '+61123456789',
    from: 'private',
    messageContent: 'Hello from Messaging SDK!'
})
    .then(result => {
        console.log('SUCCESS:messages:send:sms:', result);
        const messageId = Array.isArray(result.messageId) ? result.messageId[0] : result.messageId;

        /** Get a Message */
        message.get(messageId)
        .then(getMsgResult => console.log('SUCCESS:messages:get:', getMsgResult))
        .catch(getMsgError => console.error('ERROR:messages:get:', getMsgError));

    })
    .catch(error => {
        console.error('ERROR:messages:send:sms:', error);
    });
