import { Subscription } from '../../dist/messaging.esm.js';
import '../config.js'

const subscription = Subscription.getInstance();

subscription
.create({
  activeDays: 1,
  notifyURL: '<callback url>',
})
.then(results => {
  console.log(results);
});
