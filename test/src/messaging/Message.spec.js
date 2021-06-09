/* eslint-disable */
const { Message } = require('../../../src/messaging/Message');
const { AssertionError } = require('../../../src/messaging/Errors');

const message = new Message();

describe("Message", () => {

  describe("send", () => {

    describe('when the client sends an empty object', () => {
      it("should throw an assertion error for required properties [to] & [body].", async () => {
        const callback = async () => message.send({})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'to', data should have required property 'body'`,
          })
        );
      });
    });

    describe('when the client sends the [body] property as a string and missing [to] property', () => {
      it("should throw an assertion error for missing property [to].", async () => {
        const callback = async () => message.send({body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'to'`,
          })
        );
      });
    });

    describe('when the client sends the [to] property as a string and missing [body] property', () => {
      it("should throw an assertion error for missing property [body].", async () => {
        const callback = async () => message.send({to: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'body'`,
          })
        );
      });
    });

    describe('when the client sends the [to] property as a number and missing [body] property', () => {
      it("should throw an assertion error for invalid type [to] and missing property [body].", async () => {
        const callback = async () => message.send({to: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data should have required property 'body'`,
          })
        );
      });
    });

    describe('when the client sends the [to] property as a number and the [body] property as a string', () => {
      it("should throw an assertion error for invalid type [to] and missing property [body].", async () => {
        const callback = async () => message.send({to: 123456, body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string`,
          })
        );
      });
    });

    describe('when the client sends the [to] property as a number and the [body] property as a number', () => {
      it("should throw an assertion error for invalid type [to] and [body].", async () => {
        const callback = async () => message.send({to: 123456, body: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.body should be string`,
          })
        );
      });
    });

    describe('when the client sends the [to] property as a string and the [body] property as a number', () => {
      it("should throw an assertion error for invalid type [body].", async () => {
        const callback = async () => message.send({to: '123456', body: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.body should be string`,
          })
        );
      });
    });

  });

});
