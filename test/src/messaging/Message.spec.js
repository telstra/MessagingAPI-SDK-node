/* eslint-disable */
const { server, rest } = require('./testServer');
const { Message } = require('../../../src/messaging/Message');
const { AssertionError } = require('../../../src/messaging/Errors');
const AUTH_CONFIG = require('./credentials.json');

const message = new Message(AUTH_CONFIG);

describe("Message", () => {

  describe("getNextUnreadReply", () => {
    describe('when the client sends a valid request', () => {
      it("should pass", async () => {
        await expect(message.getNextUnreadReply()).resolves.toEqual({ "status": "EMPTY" });
      });
    });
  });

  describe("status", () => {
    describe('when the client sends a valid [messageId] attribute', () => {
      it("should pass", async () => {
        await expect(message.status('XXXXX')).resolves.toEqual({ "messageId": "XXXXX"});
      });
    });
  });

  describe("send", () => {

    describe('when the client sends a valid object with [to] & [body]', () => {
      it("should pass with attr [to] having 10 chars", async () => {
        const data = { "to":"1234567890", "body":"Hello from Messaging SDK!" };
        await expect(message.send(data)).resolves.toEqual(data);
      });
      it("should pass with attr [to] having 12 chars", async () => {
        const data = { "to":"+61234567890", "body":"Hello from Messaging SDK!" };
        await expect(message.send(data)).resolves.toEqual(data);
      });
    });

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
