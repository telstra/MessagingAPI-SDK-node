var { Numbers } = require('../dist/index.js');

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const number = new Numbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const number = new Numbers();

/**
 * Numbers (Subscription)
 */

number.get()
    .then(result => console.log('SUCCESS:number:get:', result))
    .catch(error => console.error('ERROR:number:get:', error))
