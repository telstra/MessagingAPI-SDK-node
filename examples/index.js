/** Using CJS */
var { Message, Numbers, TrialNumbers } = require('../dist/index.js');
var AUTH_CONFIG = require('./credentials.json');

const message = new Message(AUTH_CONFIG);
const number = new Numbers(AUTH_CONFIG);
const trialNumber = new TrialNumbers(AUTH_CONFIG);

trialNumber.get()
.then(result => console.log('DEBUG:trialNumber:get:', result))
.catch(error => console.error(error));

number.get()
.then(result => console.log('DEBUG:number:get:', result))
.catch(error => console.error(error));

message.getNextUnreadReply()
.then(result => console.log('DEBUG:message:getNextUnreadReply:', result))
.catch(error => console.error(error));

// trialNumber.register()
// .then(result => console.log('DEBUG:trialNumber:register:', result))
// .catch(error => console.error(error));

// number.create({
//     activeDays: 123456,
//     extraProperty: 123456
// })
// .then(result => console.log('DEBUG:number:create:', result))
// .catch(error => console.error(error));

// message.send({
//     to: '123456',
//     body: 123456
// })
// .then(result => console.log('DEBUG:message:send:', result))
// .catch(error => console.error(error));
