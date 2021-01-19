import { SMS } from '../../dist/messaging.esm.js';
import '../config.js'

const sms = SMS.getInstance();

sms.send({
  to: "<mobile number>",
  body: "Hello from Typescript",
}).then((result) => {
  console.log(result);
});

sms.get_next_unread_reply().then(results => {
  console.log(results);
});