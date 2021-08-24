var { Message } = require('../dist/index.js');

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const message = new Message();

/**
 * Message
 */

message.getNextUnreadReply()
    .then(result => console.log('SUCCESS:message:getNextUnreadReply:', result))
    .catch(error => console.error('ERROR:message:getNextUnreadReply:', error))
