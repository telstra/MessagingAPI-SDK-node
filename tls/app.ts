
import { CONFIG, SMS, BNUM, Subscription } from './';

const authConfig = {
  tls_client_key: 'XXXXX',
  tls_client_secret: 'XXXXX'
}

CONFIG.setConfig(authConfig);

const sms = SMS.getInstance();
// const subscription = Subscription.getInstance();
// const bnum = BNUM.getInstance();

sms.send({
  to: "+61XXXXXXXXX",
  body: "Hello from Typescript"
});

// sms.send({
//   to: "+61XXXXXXXXX",
//   validity: "60",
//   priority: false,
//   body: "Hello from Typescript",
//   notifyURL: "https://XXXXX.m.pipedream.net/",  
//   receiptOff: false,
//   replyRequest: true
// });

// sms.status("XXXXX");

// subscription.create({
//   "activeDays": 1,
//   "notifyURL": "https://XXXXX.m.pipedream.net"
// });

// subscription.get();

// subscription.delete();

// bnum.get();

// bnum.register({
//   "bnum":[
//     "+61XXXXXXXXX"
//   ]
// });