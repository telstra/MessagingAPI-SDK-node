/* eslint-disable */
const { server, rest } = require('../testServer');
const { FreeTrialNumbers, AssertionError } = require('../../../../src/messaging/classes');
const AUTH_CONFIG = require('../credentials.json');
const { Constants } = require('../Constants');

const freeTrialNumbers = new FreeTrialNumbers(AUTH_CONFIG);

describe("FreeTrialNumbers", () => {

  describe("fetch free-trial numbers", () => {
    describe('when the client retrieves list of free-trial numbers', () => {
      it("should return a result", async () => {        
        await expect(freeTrialNumbers.getAll()).resolves.toEqual(Constants.CREATE_FREETRIAL_NUMBERS_RESPONSE);
      });
    });
  });

  describe("create free-trial numbers list", () => {

    describe('when the client sends a valid object', () => {
      it("should pass having 10 chars", async () => {
        const data = { freeTrialNumbers: ["0412345678"] };
        await expect(freeTrialNumbers.create(data)).resolves.toEqual(data);
      });
    });
    
    describe('when the client sends the [freeTrialNumbers] property as array of numbers', () => {
      it("should throw an assertion error for invalid type [freeTrialNumbers].", async () => {
        const callback = async () => freeTrialNumbers.create({ freeTrialNumbers: [123456] })
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.freeTrialNumbers[0] should be string`,
          })
        );
      });
    });

    describe('when the client sends the [freeTrialNumbers] property as a string with >10 characters', () => {
      it("should throw an assertion error for not fewer than 1 item.", async () => {
        const callback = async () => freeTrialNumbers.create({ freeTrialNumbers: "+61234567890" })
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.freeTrialNumbers should be array`,
          })
        );
      });
    });

    describe('when the client sends the [freeTrialNumbers] property as array of strings with >10 characters', () => {
        it("should throw an assertion error for invalid type [freeTrialNumbers].", async () => {
          const callback = async () => freeTrialNumbers.create({ freeTrialNumbers: ["+61234567890"] })
          await expect(callback).rejects
          .toThrow(
            new AssertionError({
              errorCode: `MISSING_ATTRIBUTE`,
              errorMessage: `data.freeTrialNumbers[0] should NOT be longer than 10 characters`,
            })
          );
        });
      });

    describe('when the client sends the [freeTrialNumbers] property as an array of strings having more than 10 members', () => {
      it("should throw an assertion error for more than 10 items.", async () => {
        const callback = async () => freeTrialNumbers.create({freeTrialNumbers: ['0234567890', '0234567891', '0234567892', '0234567893', '0234567894', '0234567895', '0234567896', '0234567897', '0234567898', '0234567899', '0234567910', '0234567911']})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.freeTrialNumbers should NOT have more than 10 items`,
          })
        );
      });
    });

  });

});
