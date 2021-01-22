import { Subscription } from '../../dist/messaging.esm.js';
import '../config.js'

const subscription = Subscription.getInstance();

subscription
.create({
  activeDays: 0
})
.then(results => {
  console.log(results);
});
