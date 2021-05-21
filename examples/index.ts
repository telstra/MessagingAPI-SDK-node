import { Message } from '../dist/index.js'

import AUTH_CONFIG from './credentials.json';
const message = new Message(AUTH_CONFIG);

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
