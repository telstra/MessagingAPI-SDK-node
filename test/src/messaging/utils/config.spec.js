/* eslint-disable */
const {
    setAuthConfig,
    getAuthConfig,
    setAuthToken,
    getAuthToken
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


});
