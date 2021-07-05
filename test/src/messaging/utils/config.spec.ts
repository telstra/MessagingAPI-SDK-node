import {
    setAuthConfig,
    getAuthConfig,
    setAuthToken,
    getAuthToken,
    setAuthTokenRetryCount,
    getAuthTokenRetryCount,
} from '../../../../src/messaging/utils';

const AUTH_CONFIG = require('../credentials.json');

describe('config', () => {
    test('should set auth config', async () => {
        expect(await setAuthConfig(AUTH_CONFIG)).toBeTruthy();
    });
    test('should get auth config', async () => {
        expect(await getAuthConfig()).toEqual(AUTH_CONFIG);
    });
    test('should set auth token', async () => {
        expect(await setAuthToken('XXXXX')).toBeTruthy();
    });
    test('should get auth token', async () => {
        expect(await getAuthToken()).toEqual('XXXXX');
    });
    test('should set auth token retry count', async () => {
        expect(await setAuthTokenRetryCount('1')).toBeTruthy();
    });
    test('should get auth token retry count', async () => {
        expect(await getAuthTokenRetryCount()).toEqual(1);
    });
});
