import { Subscription } from '../../dist/messaging.esm.js';
import '../config.js'

const subscription = Subscription.getInstance();

subscription.get()
.then(results => {
    console.log(results);
});
