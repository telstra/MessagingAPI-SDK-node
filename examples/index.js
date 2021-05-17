/** Using CJS */
var {
    Message,
} = require('../dist/index.js');

/** SMS */
 const message = Message.getInstance();

/** send message */
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
