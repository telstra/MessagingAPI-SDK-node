import { Messages } from '../dist';

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const messages = new Messages();

/**
 * Messages - Fetch all
 */

messages.getAll()
    .then(result => console.log('SUCCESS:messages:getAll:', result))
    .catch(error => console.error('ERROR:messages:getAll:', error))
