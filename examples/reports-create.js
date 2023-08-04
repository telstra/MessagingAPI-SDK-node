"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../dist/index.js");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const reports = new Reports(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var reports = new index_js_1.Reports();
var startDate = new Date();
var endDate = new Date(startDate);
endDate.setDate(startDate.getDate() - 10);
var startDateStr = "".concat(startDate.toLocaleDateString('fr-CA'));
var endDateStr = "".concat(endDate.toLocaleDateString('fr-CA'));
/**
 * Reports - Create - Messages Report
 */
var params = {
    startDate: startDateStr,
    endDate: endDateStr
};
reports.create(params)
    .then(function (result) { return console.log('SUCCESS:reports:create:', result); })
    .catch(function (error) { return console.error('ERROR:reports:create:', error); });
