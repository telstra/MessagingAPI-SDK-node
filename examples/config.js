import { CONFIG } from '../dist/messaging.esm.js';

const authConfig = {
    tls_client_key: process.env.TLS_CLIENT_KEY ? process.env.TLS_CLIENT_KEY : 'XXXXX',
    tls_client_secret: process.env.TLS_CLIENT_SECRET ? process.env.TLS_CLIENT_SECRET : 'XXXXX',
}

CONFIG.setConfig(authConfig);
