import { SMS } from '../../dist/messaging.esm.js';
import '../config.js'

const sms = SMS.getInstance();

sms.send({
  to: process.env.TLS_MOBILE_NUMBER ? process.env.TLS_MOBILE_NUMBER : '<mobile number>',
  body: "Hello from Messaging SDK",
}).then((result) => {
  console.log(result);
});

sms.get_next_unread_reply().then(results => {
  console.log(results);
});