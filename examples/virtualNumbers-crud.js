"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../dist/index.js");
// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const number = new Numbers(AUTH_CONFIG);
// Auth via ENV VARS or SHARED CREDENTIALS
var virtualNumbers = new index_js_1.VirtualNumbers();
/**
 * VirtualNumbers
 *  - Assign
 *  - Fetch VirtualNumber
 *  - Update VirtualNumber
 *  - Delete VirtualNumber
 */
virtualNumbers.assign()
    .then(function (result) {
    console.log('SUCCESS:number:create:', result);
    var virtualNumber = result.virtualNumber;
    /** Fetch VirtualNumber */
    virtualNumbers.get(virtualNumber)
        .then(function (getVNResponse) { return console.log('SUCCESS:virtualNumber:get:', getVNResponse); })
        .catch(function (getVNError) { return console.error('ERROR:virtualNumbers:get:', getVNError); });
    /** Fetch all opt-out numbers */
    virtualNumbers.getOptouts(virtualNumber)
        .then(function (getVNOptoutsResponse) { return console.log('SUCCESS:virtualNumber:get:optouts', getVNOptoutsResponse); })
        .catch(function (getVNOptoutsError) { return console.error('ERROR:virtualNumbers:get:optouts', getVNOptoutsError); });
    /** Update VirtualNumber */
    var updateParams = {
        virtualNumber: virtualNumber,
        updateData: { tags: ['V3'] },
    };
    virtualNumbers.update(updateParams)
        .then(function (updateVNResponse) { return console.log('SUCCESS:virtualNumber:update:', updateVNResponse); })
        .catch(function (updateVNError) { return console.error('ERROR:virtualNumbers:update:', updateVNError); });
    /** Delete VirtualNumber */
    virtualNumbers.delete(virtualNumber)
        .then(function (deleteVNResponse) { return console.log('SUCCESS:virtualNumber:delete:', deleteVNResponse); })
        .catch(function (deleteVNError) { return console.error('ERROR:virtualNumbers:delete:', deleteVNError); });
})
    .catch(function (error) { return console.error('ERROR:number:create:', error); });
