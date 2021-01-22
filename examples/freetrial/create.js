import { BNUM } from '../../dist/messaging.esm.js';
import '../config.js'

const bnum = BNUM.getInstance();

bnum
.register({
  bnum: [
    process.env.TLS_MOBILE_NUMBER ? process.env.TLS_MOBILE_NUMBER : '<mobile number>'
  ]
})
.then(results => {
  console.log(results);
});
