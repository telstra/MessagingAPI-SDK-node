"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../dist/index.js");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const healthCheck = new HealthCheck(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var healthCheck = new index_js_1.HealthCheck();
healthCheck.get()
    .then(function (result) {
    console.log('SUCCESS:healthCheck:', result);
})
    .catch(function (error) {
    console.error('ERROR:healthCheck:', error);
});
