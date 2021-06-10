/* eslint-disable */
// const axios = require('axios');
const { TrialNumbers } = require('../../../src/messaging/TrialNumbers');
const { AssertionError } = require('../../../src/messaging/Errors');
const AUTH_CONFIG = require('./credentials.json');

const trialNumber = new TrialNumbers(AUTH_CONFIG);

describe("TrialNumbers", () => {

  // describe("get", () => {

  //   describe('when the client makes a http request', () => {
  //     it("should return a list of bums.", async () => {
  //       const data = {"bnum": ["+61234567890"]};
  //       await expect(trialNumber.get()).resolves.toEqual(data);
  //     });
  //   });
  // });

  describe("register", () => {

    describe('when the client sends an empty object', () => {
      it("should throw an assertion error for required property [bnum].", async () => {
        const callback = async () => trialNumber.register({})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'bnum'`,
          })
        );
      });
    });

    describe('when the client sends the [bnum] property as a number', () => {
      it("should throw an assertion error for invalid type [bnum].", async () => {
        const callback = async () => trialNumber.register({bnum: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.bnum should be array`,
          })
        );
      });
    });

    describe('when the client sends the [bnum] property as an empty array', () => {
      it("should throw an assertion error for not fewer than 1 item.", async () => {
        const callback = async () => trialNumber.register({bnum: []})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.bnum should NOT have fewer than 1 items`,
          })
        );
      });
    });

    describe('when the client sends the [bnum] property as an array of numbers having one member', () => {
      it("should throw an assertion error for not fewer than 1 item.", async () => {
        const callback = async () => trialNumber.register({bnum: [123456]})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.bnum[0] should be string`,
          })
        );
      });
    });

    describe('when the client sends the [bnum] property as an array of numbers having one member of string length 6', () => {
      it("should throw an assertion error for not shorter than 10 chars.", async () => {
        const callback = async () => trialNumber.register({bnum: ['123456']})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.bnum[0] should NOT be shorter than 10 characters`,
          })
        );
      });
    });

    describe('when the client sends the [bnum] property as an array of numbers having one member of string length 13', () => {
      it("should throw an assertion error for not longer than 12 chars.", async () => {
        const callback = async () => trialNumber.register({bnum: ['1234567891234']})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.bnum[0] should NOT be longer than 12 characters`,
          })
        );
      });
    });

    describe('when the client sends the [bnum] property as an array of strings having two duplicate members', () => {
      it("should throw an assertion error for duplicate items.", async () => {
        const callback = async () => trialNumber.register({bnum: ['+61234567890', '+61234567890']})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.bnum should NOT have duplicate items (items ## 1 and 0 are identical)`,
          })
        );
      });
    });

    describe('when the client sends the [bnum] property as an array of strings having more than 5 members', () => {
      it("should throw an assertion error for more than 5 items.", async () => {
        const callback = async () => trialNumber.register({bnum: ['+61234567890', '+61234567891', '+61234567892', '+61234567893', '+61234567894', '+61234567895']})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.bnum should NOT have more than 5 items`,
          })
        );
      });
    });

  });

});
