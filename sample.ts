
import { CONFIG, SMS, BNUM, Subscription } from './tls';

const authConfig = {
  tls_client_key: 'XXXXX',
  tls_client_secret: 'XXXXX'
}

CONFIG.setConfig(authConfig);

const sms = SMS.getInstance();
// const subscription = Subscription.getInstance();
// const bnum = BNUM.getInstance();

sms.send({
  to: "<mobile number>",
  body: "Hello from Typescript"
}).then((results) => {
  console.log(results);
});

// sms.send({
//   to: "+61XXXXXXXXX",
//   validity: "60",
//   priority: false,
//   body: "Hello from Typescript",
//   notifyURL: "https://XXXXX.m.pipedream.net/",  
//   receiptOff: false,
//   replyRequest: true
// }).then((results) => {
//   console.log(results);
// });

// sms.status("XXXXX")
// .then((results) => {
//   console.log(results);
// });

// subscription.create({
//   "activeDays": 1,
//   "notifyURL": "https://XXXXX.m.pipedream.net"
// }).then((results) => {
//   console.log(results);
// });

// subscription.get()
// .then((results) => {
//   console.log(results);
// });

// subscription.delete().then((results) => {
//   console.log(results);
// });

// bnum.get().then((results) => {
//   console.log(results);
// });

// bnum.register({
//   "bnum":[
//     "+61XXXXXXXXX"
//   ]
// }).then((results) => {
//   console.log(results);
// });