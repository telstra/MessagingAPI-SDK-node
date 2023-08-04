"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../dist/index.js");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const trialNumber = new TrialNumbers(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var freeTrialNumbers = new index_js_1.FreeTrialNumbers();
/**
 * FreeTrial Numbers - Fetch all numbers associated to the account
 */
freeTrialNumbers.getAll()
    .then(function (result) { return console.log('SUCCESS:freeTrialNumbers:getAll:', result); })
    .catch(function (error) { return console.error('ERROR:freeTrialNumber:getAll:', error); });
