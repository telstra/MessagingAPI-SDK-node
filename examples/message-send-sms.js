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

message.send({
    to: mobileNumber,
    // to: ['<RECIPIENT_1>', '<RECIPIENT_2>', '<RECIPIENT_3>'],
    body: 'Hello from Messaging SDK!',
    notifyURL: 'https://enmt3j9tvwrh4v0.m.pipedream.net/'
    // type: 'sms',
})
    .then(result => console.log('SUCCESS:message:send:', result))
    .catch(error => console.error('ERROR:message:send:', error))

// message.sendBulk({
//     smsMulti: [
//         {
//             to: '<RECIPIENT_1>',
//             body: 'Hello from Messaging SDK',
//         },
//         {
//             to: '<RECIPIENT_1>',
//             body: 'Yes it works',
//         },
//         {
//             to: '<RECIPIENT_2>',
//             body: 'Hello from Messaging SDK',
//         },
//         {
//             to: '<RECIPIENT_3>',
//             body: 'Hello from Messaging SDK',
//         }
//     ],
//     notifyURL: 'https://<WEBHOOK_ENDPOINT>/'
// })
// .then(result => console.log('SUCCESS:message:sendBulk:', result))
// .catch(error => console.error('ERROR:message:sendBulk:', error))
