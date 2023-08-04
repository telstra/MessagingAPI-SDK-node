"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("../dist");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const number = new Numbers(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var virtualNumbers = new dist_1.VirtualNumbers();
/**
 * VirtualNumbers - Fetch all
 */
virtualNumbers.getAll()
    .then(function (result) { return console.log('SUCCESS:virtualNumbers:getAll:', result); })
    .catch(function (error) { return console.error('ERROR:virtualNumbers:getAll:', error); });
