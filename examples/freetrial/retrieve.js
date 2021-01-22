import { BNUM } from '../../dist/messaging.esm.js';
import '../config.js'

const bnum = BNUM.getInstance();

bnum.get()
.then(results => {
    console.log(results);
});
