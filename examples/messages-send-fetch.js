"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../dist/index.js");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var message = new index_js_1.Messages();
message.send({
    to: '+61123456789',
    from: 'private',
    messageContent: 'Hello from Messaging SDK!'
})
    .then(function (result) {
    console.log('SUCCESS:messages:send:sms:', result);
    var messageId = Array.isArray(result.messageId) ? result.messageId[0] : result.messageId;
    /** Get a Message */
    message.get(messageId)
        .then(function (getMsgResult) { return console.log('SUCCESS:messages:get:', getMsgResult); })
        .catch(function (getMsgError) { return console.error('ERROR:messages:get:', getMsgError); });
})
    .catch(function (error) {
    console.error('ERROR:messages:send:sms:', error);
});
