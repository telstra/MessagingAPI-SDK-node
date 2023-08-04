"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("../dist");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const reports = new Reports(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var reports = new dist_1.Reports();
/**
 * Reports - Fetch all reports
 */
reports.getAll()
    .then(function (result) { return console.log('SUCCESS:reports:getAll:', result); })
    .catch(function (error) { return console.error('ERROR:reports:getAll:', error); });
