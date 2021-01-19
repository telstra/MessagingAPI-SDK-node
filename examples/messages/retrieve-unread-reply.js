import { SMS } from '../../dist/messaging.esm.js';
import '../config.js'

const sms = SMS.getInstance();

sms.get_next_unread_reply().then(results => {
  console.log(results);
});