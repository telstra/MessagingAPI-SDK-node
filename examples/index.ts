import { Message } from '../dist/index.js'

const message = Message.getInstance();
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
