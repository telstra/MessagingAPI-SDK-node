/* eslint-disable */
const {
    setAuthConfig,
    getAuthConfig,
    setAuthToken,
    getAuthToken,
    setAuthTokenRetryCount,
    getAuthTokenRetryCount,
} = require('../../../../src/messaging/utils');

const AUTH_CONFIG = require('../credentials.json');
describe('config', () => {
    describe('when setAuthConfig is called', () => {
        it('should return true given a payload', async () => {
            expect(await setAuthConfig(AUTH_CONFIG)).toBeTruthy();
        });
    });

    describe('when setAuthConfig is called', () => {
        it('should return false given no payload', async () => {
            await expect(await setAuthConfig()).toBeFalsy();
        });
    });

    describe('when getAuthConfig is called', () => {
        it('should be true', async () => {
            expect(await getAuthConfig()).toBeTruthy();
        });
        it('should return expected payload', async () => {
            expect(await getAuthConfig()).toEqual(AUTH_CONFIG);
        });
    });

    describe('when setAuthToken is called', () => {
        it('should return true', async () => {
            expect(await setAuthToken('XXXXX')).toBeTruthy();
        });
        it('should return false given no payload', async () => {
            expect(await setAuthToken()).toBeFalsy();
        });
    });

    describe('when getAuthToken is called', () => {
        it('should return a string', async () => {
            expect(await getAuthToken()).toEqual('XXXXX');
        });
    });

    describe('when getAuthTokenRetryCount is called', () => {
        it('should return 0 as a number', async () => {
            expect(await getAuthTokenRetryCount()).toEqual(0);
        });
    });

    describe('when setAuthTokenRetryCount is called', () => {
        it('should get auth token retry count of 0 when storage not yet initialised', async () => {
            expect(await getAuthTokenRetryCount()).toEqual(0);
        });
    });

    describe('when setAuthTokenRetryCount is called', () => {
        it('should return true given a number', async () => {
            expect(await setAuthTokenRetryCount(1)).toBeTruthy();
        });
        it('should return false given no payload', async () => {
            expect(await setAuthTokenRetryCount()).toBeFalsy();
        });
    });

    describe('when getAuthTokenRetryCount is called', () => {
        it('should return 1 as a number', async () => {
            expect(await getAuthTokenRetryCount()).toEqual(1);
        });
    });

});
