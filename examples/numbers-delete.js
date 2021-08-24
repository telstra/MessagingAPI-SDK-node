var { Numbers } = require('../dist/index.js');

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const number = new Numbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const number = new Numbers();

/**
 * Numbers (Subscription)
 */

number.delete({
    emptyArr: 0
})
    .then(result => console.log('SUCCESS:number:delete:', result))
    .catch(error => console.error('ERROR:number:delete:', error))
