import { CONFIG, Message } from '../dist/index.js'

const config = {
    tls_client_key: process.env.TLS_CLIENT_KEY ? process.env.TLS_CLIENT_KEY : '<client id>',
    tls_client_secret: process.env.TLS_CLIENT_SECRET ? process.env.TLS_CLIENT_SECRET : '<client secret>',
}
CONFIG.setConfig(config);

/**
 * SMS
 */
 const message = Message.getInstance();

/** send message */
message.send({
    // to: '+61000000000',
    body: 'Hello from Messaging SDK'
})
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error(error);
});
