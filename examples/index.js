var { Message, Numbers, TrialNumbers } = require('../dist/index.js');

var AUTH_CONFIG = require('./credentials.json');

const message = new Message(AUTH_CONFIG);
const number = new Numbers(AUTH_CONFIG);
const trialNumber = new TrialNumbers(AUTH_CONFIG);

/**
 * Numbers (Subscription)
 */

number.get()
.then(result => console.log('SUCCESS:number:get:', result))
.catch(error => console.error('ERROR:number:get:', error))

// number.create({
//     activeDays: 1,
// })
// .then(result => console.log('SUCCESS:number:create:', result))
// .catch(error => console.error('ERROR:number:create:', error))

// number.delete({
//     emptyArr: '0'
// })
// .then(result => console.log('SUCCESS:number:delete:', result))
// .catch(error => console.error('ERROR:number:delete:', error))

/**
 * Trial Numbers
 */

trialNumber.get()
.then(result => console.log('SUCCESS:trialNumber:get:', result))
.catch(error => console.error('ERROR:trialNumber:get:', error))

// trialNumber.register()
// .then(result => console.log('SUCCESS:trialNumber:register:', result))
// .catch(error => console.error('ERROR:trialNumber:register:', error))

/**
 * Message
 */

message
    .healthCheck()
    .then(result => console.log('SUCCESS:message:healthCheck:', result))
    .catch(error => console.error('ERROR:message:healthCheck:', error));

// message.send({
//     to: '<RECIPIENT_1>',
//     to: ['<RECIPIENT_1>', '<RECIPIENT_2>', '<RECIPIENT_3>'],
//     body: 'Hello from Messaging SDK',
//     // type: 'sms',
// })
// .then(result => console.log('SUCCESS:message:send:', result))
// .catch(error => console.error('ERROR:message:send:', error))

// message.status('<MESSAGE_ID>')
// .then(result => console.log('SUCCESS:message:status:', result))
// .catch(error => console.error('ERROR:message:status:', error))

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

// message.getNextUnreadReply()
// .then(result => console.log('SUCCESS:message:getNextUnreadReply:', result))
// .catch(error => console.error('ERROR:message:getNextUnreadReply:', error))

// message
//     .send({
//         to: '<RECIPIENT_3>',
//         subject: 'Hello from Messaging SDK',
//         replyRequest: false,
//         MMSContent: [
//             {
//                 type: 'image/gif',
//                 filename: 'bus.gif',
//                 payload:
//                     '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',
//             },
//         ],
//     })
//     .then(result => console.log('SUCCESS:message:send:mms', result))
//     .catch(error => console.error('ERROR:message:send:mms', error));
