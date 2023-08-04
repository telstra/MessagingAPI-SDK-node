"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../dist/index.js");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const trialNumber = new TrialNumbers(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var freeTrialNumbers = new index_js_1.FreeTrialNumbers();
/**
 * FreeTrial Numbers - Create
 */
var params = {
    freeTrialNumbers: [
        "0412345678"
    ]
};
freeTrialNumbers.create(params)
    .then(function (result) {
    console.log('SUCCESS:freeTrialNumbers:create:', result);
})
    .catch(function (error) {
    console.error('ERROR:freeTrialNumber:create:', error);
});
