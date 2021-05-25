/** Using CJS */
var { Message, Numbers, TrialNumbers } = require('../dist/index.js');

// const trialNumbers = new TrialNumbers();

// trialNumbers.register({
//     bnum: ['+61234567890']
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });

// const numbers = new Numbers();

// numbers.create({
//     activeDays: 1
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });

// numbers.delete({
//     emptyArr: 1
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });

const message = new Message();

message.send({
    // to: '+61123456789',
    // body: 'Hello from Messaging SDK'
})
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error(error);
});

// message.status('<MESSAGE ID>')
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });
