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
// const subscription = new Subscription;

/** create subscription */
// subscription
// .create({
//   activeDays: 1,
//   notifyURL: "https://enh9mjeq0jhmc.x.pipedream.net/"
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });

/** retrieve subscription */
// subscription.get()
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });

/** delete subscription */
// subscription.delete({
//     emptyArr: 0
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });

/**
 * SMS
 */
const sms = new SMS();

/** send message */
// sms.send({
//     // to: process.env.TLS_MOBILE_NUMBER ? process.env.TLS_MOBILE_NUMBER : '<mobile number>',
//     body: "Hello from Messaging SDK",
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
//     const { errorStatus, errorCode, errorMessage } = error;
//     console.error(errorStatus, errorCode, errorMessage);
// });

try {
    sms.send({
        // to: process.env.TLS_MOBILE_NUMBER ? process.env.TLS_MOBILE_NUMBER : '<mobile number>',
        body: "Hello from Messaging SDK",
    })
    .then(result => {
        // console.log(result);
    });
} catch (error) {
    // console.error(error);
    // const { errorStatus, errorCode, errorMessage } = error;
    // console.error(errorStatus, errorCode, errorMessage);
}

/** retrieve replies */
// sms.get_next_unread_reply()
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });

/**
 * Free Trial
 */
// const bnum = new BNUM();

/** retrieve bnums */
// bnum.get()
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });

/** register bnums */
// bnum
// .register({
//   bnum: [
//     process.env.TLS_MOBILE_NUMBER ? process.env.TLS_MOBILE_NUMBER : '<mobile number>'
//   ]
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.error(error);
// });