/** Using CJS */
var {
    Message,
    // Numbers,
} = require('../dist/index.js');

// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);

// const numbers = new Numbers();

// numbers.create({
//   activeDays: 1
// })
// .then(results => {
//   console.log(results);
// })
// .catch(error => {
//     console.error(error);
// });

const message = new Message();

message.send({
    to: '+61123456789',
    body: 'Hello from Messaging SDK'
})
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error(error);
});
