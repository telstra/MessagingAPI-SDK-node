/* eslint-disable */
const { server, rest } = require('./testServer');
const { Numbers, AssertionError } = require('../../../src/messaging/classes');
const AUTH_CONFIG = require('./credentials.json');

const number = new Numbers(AUTH_CONFIG);

describe("Numbers", () => {

  describe("delete", () => {
    describe('when the client sends a valid object', () => {
      it("should pass", async () => {
        await expect(number.delete({ "emptyArr": 0 })).resolves.toEqual({ "emptyArr": 0 });
      });
    });
    describe('when the client sends an empty object', () => {
      it("should throw an assertion error", async () => {
        const callback = async () => number.delete()
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should be object`,
          })
        );
      });
    });
    describe('when the client sends an invalid object', () => {
      it("should throw an assertion error", async () => {
        const callback = async () => number.delete({})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'emptyArr'`,
          })
        );
      });
    });
    describe('when the client sends an invalid object', () => {
      it("should throw an assertion error", async () => {
        const callback = async () => number.delete({emptyArr: '0'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.emptyArr should be integer`,
          })
        );
      });
    });
  });

  describe("create", () => {
    describe('when the client sends a valid object', () => {
      it("should pass", async () => {
        await expect(number.create({ activeDays: 1 })).resolves.toEqual({ activeDays: 1 });
      });
    });

    describe('when the client sends an empty object', () => {
      it("should throw an assertion error for required property [activeDays].", async () => {
        const callback = async () => number.create({})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'activeDays'`,
          })
        );
      });
    });

    describe('when the client sends the [activeDays] property as a string', () => {
      it("should throw an assertion error for invalid type [activeDays].", async () => {
        const callback = async () => number.create({activeDays: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.activeDays should be integer`,
          })
        );
      });
    });

    describe('when the client sends the [activeDays] property as a number on value [1] and an additional property', () => {
      it("should throw an assertion error for invalid type [activeDays].", async () => {
        const callback = async () => number.create({activeDays: 1, extraProperty: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should NOT have additional properties`,
          })
        );
      });
    });

    describe('when the client sends the [activeDays] property as a number on value [123456] and an additional property', () => {
      it("should throw an assertion error for out of range [activeDays] and no additional properties.", async () => {
        const callback = async () => number.create({activeDays: 123456, extraProperty: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should NOT have additional properties, data.activeDays should be < 1825`,
          })
        );
      });
    });

  });

});
