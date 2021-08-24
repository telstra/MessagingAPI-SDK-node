import { Message } from '../dist/index.js'

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const message = new Message();

message.send({
    to: '+61123456789',
    body: 'Hello from Messaging SDK!'
})
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });
