var { Numbers } = require('../dist/index.js');

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const number = new Numbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const number = new Numbers();

/**
 * Numbers (Subscription)
 */

number.create({
    // activeDays: 1,
    // notifyURL: 'https://enmt3j9tvwrh4v0.m.pipedream.net/',
})
    .then(result => console.log('SUCCESS:number:create:', result))
    .catch(error => console.error('ERROR:number:create:', error))
