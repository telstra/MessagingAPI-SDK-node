import { VirtualNumbers } from '../dist';

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const number = new Numbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const virtualNumbers = new VirtualNumbers();

/**
 * VirtualNumbers - Fetch all
 */

virtualNumbers.getAll()
    .then(result => console.log('SUCCESS:virtualNumbers:getAll:', result))
    .catch(error => console.error('ERROR:virtualNumbers:getAll:', error))
