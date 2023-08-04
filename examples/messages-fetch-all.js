"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("../dist");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const message = new Message(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var messages = new dist_1.Messages();
/**
 * Messages - Fetch all
 */
messages.getAll()
    .then(function (result) { return console.log('SUCCESS:messages:getAll:', result); })
    .catch(function (error) { return console.error('ERROR:messages:getAll:', error); });
