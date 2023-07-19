/* eslint-disable */
const { server, rest } = require('../testServer');
const { VirtualNumbers, AssertionError } = require('../../../../src/messaging/classes');
const AUTH_CONFIG = require('../credentials.json');
const { Constants } = require('../Constants');

const virtualNumbers = new VirtualNumbers(AUTH_CONFIG);

describe("VirtualNumber", () => {

    describe("assign a virtualNumber", () => {
        describe('when the client sends a valid request', () => {
            it("should pass", async () => {
                await expect(virtualNumbers.assign()).resolves.toEqual(Constants.ASSIGN_VIRTUAL_NUMBER_RESPONSE);
            });
        });

    });

    describe("get all virtualNumbers", () => {
        describe('when the client sends a valid request', () => {
            it("should pass", async () => {
                await expect(virtualNumbers.getAll()).resolves.toEqual(Constants.GET_ALL_VIRTUAL_NUMBERS_RESPONSE);
            });
        });

        describe('when the client sends a valid request - with params', () => {
            it("should pass", async () => {
                const data = { limit: 5, offset: 0};
                await expect(virtualNumbers.getAll(data)).resolves.toEqual(Constants.GET_ALL_VIRTUAL_NUMBERS_RESPONSE);
            });
        });

        describe('when the client sends [limit] as string', () => {
            it("should throw an assertion error", async () => {
                const data = { limit: "5", offset: 0};
              const callback = async () => virtualNumbers.getAll(data);
              await expect(callback).rejects
                .toThrow(
                  new AssertionError({
                    errorCode: `MISSING_ATTRIBUTE`,
                    errorMessage: `data.limit should be integer`,
                  })
                );
            });
        });

        describe('when the client sends [offset] as string', () => {
            it("should throw an assertion error", async () => {
                const data = { limit: 5, offset: "0"};
              const callback = async () => virtualNumbers.getAll(data);
              await expect(callback).rejects
                .toThrow(
                  new AssertionError({
                    errorCode: `MISSING_ATTRIBUTE`,
                    errorMessage: `data.offset should be integer`,
                  })
                );
            });
        });

        describe('when the client sends [filter] as integer', () => {
            it("should throw an assertion error", async () => {
                const data = { limit: 5, offset: 0, filter: 412345678};
              const callback = async () => virtualNumbers.getAll(data);
              await expect(callback).rejects
                .toThrow(
                  new AssertionError({
                    errorCode: `MISSING_ATTRIBUTE`,
                    errorMessage: `data.filter should be string`,
                  })
                );
            });
        });

    });

    describe("get a virtualNumber", () => {
        describe('when the client sends a valid request', () => {
            it("should pass", async () => {
                await expect(virtualNumbers.get('0412345678')).resolves.toEqual(Constants.GET_ALL_VIRTUAL_NUMBERS_RESPONSE.virtualNumbers[0]);
            });
        });

        describe('when the client sends [virtualNumber] as integer', () => {
            it("should throw an assertion error", async () => {                
              const callback = async () => virtualNumbers.get(412345678);
              await expect(callback).rejects
                .toThrow(
                  new AssertionError({
                    errorCode: `MISSING_ATTRIBUTE`,
                    errorMessage: `data.virtualNumber should be string`,
                  })
                );
            });
        });

    });

});
