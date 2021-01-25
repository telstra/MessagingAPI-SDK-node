/** Using CJS */
var {
    CONFIG,
    Subscription,
    SMS,
    // BNUM
} = require('../dist/messaging.cjs.development.js');

const config = {
    tls_client_key: process.env.TLS_CLIENT_KEY ? process.env.TLS_CLIENT_KEY : '<client id>',
    tls_client_secret: process.env.TLS_CLIENT_SECRET ? process.env.TLS_CLIENT_SECRET : '<client secret>',
}
CONFIG.setConfig(config);

/**
 * Subscription
 */
const subscription = Subscription.getInstance();

/** create subscription */
// subscription
// .create({
//   activeDays: 0
// })
// .then(results => {
//   console.log(results);
// });

/** retrieve subscription */
subscription.get()
.then(results => {
    console.log(results);
});

/** delete subscription */
// subscription.delete({
//     emptyArr: 0
// })
// .then(results => {
//     console.log(results);
// });

/**
 * SMS
 */
const sms = SMS.getInstance();

/** send message */
// sms.send({
//     to: process.env.TLS_MOBILE_NUMBER ? process.env.TLS_MOBILE_NUMBER : '<mobile number>',
//     body: "Hello from Messaging SDK",
// }).then((result) => {
//     console.log(result);
// });

/** retrieve replies */
sms.replies().then(results => {
    console.log(results);
});

/**
 * Free Trial
 */
// const bnum = BNUM.getInstance();

/** retrieve bnums */
// bnum.get()
// .then(results => {
//     console.log(results);
// });

/** register bnums */
// bnum
// .register({
//   bnum: [
//     process.env.TLS_MOBILE_NUMBER ? process.env.TLS_MOBILE_NUMBER : '<mobile number>'
//   ]
// })
// .then(results => {
//   console.log(results);
// });