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
// .catch(error => console.error('ERROR:message:healthCheck:', error))

// number.create({
//     activeDays: 1,
// })
// .then(result => console.log('SUCCESS:number:create:', result))
// .catch(error => console.error('ERROR:message:healthCheck:', error))

// number.delete({
//     emptyArr: '0'
// })
// .then(result => console.log('SUCCESS:number:delete:', result))
// .catch(error => console.error('ERROR:message:healthCheck:', error))

/**
 * Trial Numbers
 */

// trialNumber.get()
// .then(result => console.log('SUCCESS:trialNumber:get:', result))
// .catch(error => console.error('ERROR:message:healthCheck:', error))

// trialNumber.register()
// .then(result => console.log('SUCCESS:trialNumber:register:', result))
// .catch(error => console.error('ERROR:message:healthCheck:', error))

/**
 * Message
 */

// message.healthCheck()
// .then(result => console.log('SUCCESS:message:healthCheck:', result))
// .catch(error => console.error('ERROR:message:healthCheck:', error))

// message.send({
//     to: '+61402000823',
//     body: 'Hello from Messaging SDK',
//     type: 'sms'
// })
// .then(result => console.log('SUCCESS:message:send:', result))
// .catch(error => console.error('ERROR:message:healthCheck:', error))

// message.status('C2B2AE589BCDEB61830000000700E729')
// .then(result => console.log('SUCCESS:message:status:', result))
// .catch(error => console.error('ERROR:message:healthCheck:', error))

// message.sendBulk({
//     smsMulti: [{
//         to: '<MOBILE_NUMBER>',
//         body: 'Hello from Messaging SDK',
//     },{
//         to: '<MOBILE_NUMBER>',
//         body: 'Yes it works',
//     }],
//     notifyURL: 'https://<WEBHOOK_ENDPOINT>/'
// })
// .then(result => console.log('SUCCESS:message:sendBulk:', result))
// .catch(error => console.error('ERROR:message:sendBulk:', error))

// message.getNextUnreadReply()
// .then(result => console.log('SUCCESS:message:getNextUnreadReply:', result))
// .catch(error => console.error('ERROR:message:healthCheck:', error))
