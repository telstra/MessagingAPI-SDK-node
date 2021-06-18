var {
    Message,
    Numbers,
    TrialNumbers
} = require('../dist/index.js');
var AUTH_CONFIG = require('./credentials.json');

const message = new Message(AUTH_CONFIG);
const number = new Numbers(AUTH_CONFIG);
const trialNumber = new TrialNumbers(AUTH_CONFIG);

/**
 * Numbers (Subscription)
 */

// number.get()
// .then(result => console.log('SUCCESS:number:get:', result))
// .catch(error => console.error('ERROR:number:get:', error))

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

// trialNumber.get()
// .then(result => console.log('SUCCESS:trialNumber:get:', result))
// .catch(error => console.error('ERROR:trialNumber:get:', error))

// trialNumber.register()
// .then(result => console.log('SUCCESS:trialNumber:register:', result))
// .catch(error => console.error('ERROR:trialNumber:register:', error))

/**
 * Message
 */

message.healthCheck()
.then(result => console.log('SUCCESS:message:healthCheck:', result))
.catch(error => console.error('ERROR:message:healthCheck:', error))

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
