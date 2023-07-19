/* eslint-disable */
const { server, rest } = require('../testServer');
const { Reports, AssertionError } = require('../../../../src/messaging/classes');
const AUTH_CONFIG = require('../credentials.json');
const { Constants } = require('../Constants');

const reports = new Reports(AUTH_CONFIG);

describe("Reports", () => {

    describe("request a messages report", () => {
        describe('when the client sends a valid request', () => {
            it("should pass", async () => {
              const data = { startDate: "2023-06-01", endDate: "2023-06-30", reportCallbackUrl: "https://www.example.com", filter:"test"}
                await expect(reports.create(data)).resolves.toEqual(Constants.CREATE_MESSAGES_REPORT_RESPONSE);
            });
        });

    });

    describe("fetch all reports", () => {
        describe('when the client sends a valid request', () => {
            it("should pass", async () => {
                await expect(reports.getAll()).resolves.toEqual(Constants.GET_ALL_MESSAGES_REPORT_RESPONSE);
            });
        });
    });

    describe("fetch a report", () => {
        describe('when the client sends a valid request', () => {
            it("should pass", async () => {
                await expect(reports.get('6940c774-4335-4d2b-b758-4ecb19412e85')).resolves.toEqual(Constants.GET_MESSAGES_REPORT_RESPONSE);
            });
        });

        // describe('when the client sends [virtualNumber] as integer', () => {
        //     it("should throw an assertion error", async () => {                
        //       const callback = async () => virtualNumber.get(412345678);
        //       await expect(callback).rejects
        //         .toThrow(
        //           new AssertionError({
        //             errorCode: `MISSING_ATTRIBUTE`,
        //             errorMessage: `data.virtualNumber should be string`,
        //           })
        //         );
        //     });
        // });

    });

});
