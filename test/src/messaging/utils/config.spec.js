/* eslint-disable */
const {
    setAuthConfig,
    getAuthConfig,
    setAuthToken,
    getAuthToken,
    checkTokenValidity,
} = require('../../../../src/messaging/utils');

const AUTH_CONFIG = require('../credentials.json');
describe('config', () => {

    describe('when checkTokenValidity is called', () => {
        describe('when the storage is initialized', () => {
            it('should return false with the initial data value of key BUCKET_KEY_ACCESS_TOKEN and BUCKET_KEY_AUTH_TIME_EXP', async () => {
                const authToken = await getAuthToken();
                expect(authToken.accessToken).toBeFalsy();
                expect(authToken.timeExp).toBeFalsy();
            });
        });

        
        it('should return true if the token is valid', async () => {
            const token = 'valid_token';
            const timeExp = new Date().getTime() + 40 * 60 * 1000; // 40 minutes later            
            expect(await setAuthToken(token, String(timeExp))).toBeTruthy();
            const isValid = await checkTokenValidity();            
            expect(isValid).toBeTruthy();
        });

        it('should return false if the token is expired', async () => {
            const token = 'expired_token';
            const timeExp = new Date().getTime() - 60 * 60 * 1000; // 60 minutes ago
            setAuthToken(token, String(timeExp));
            const isValid = await checkTokenValidity();
            expect(isValid).toBeFalsy();
        });

        it('should return false if the token is null', async () => {            
            expect(await setAuthToken(null, null)).toBeFalsy();
            const isValid = await checkTokenValidity();
            expect(isValid).toBeFalsy();
        });

    });

    describe('when setAuthToken is called', () => {
        it('should return true', async () => {
            const timeExp = new Date().getTime() + 40 * 60 * 1000; // 40 minutes later
            expect(await setAuthToken('XXXXX', String(timeExp))).toBeTruthy();
        });
        it('should return false given no payload', async () => {
            expect(await setAuthToken()).toBeFalsy();
        });
    });

    describe('when getAuthToken is called', () => {
        it('should return two string', async () => {
            const AuthTimeExp = new Date().getTime() + 40 * 60 * 1000; // 40 minutes later
            expect(await setAuthToken('XXXXX', String(AuthTimeExp))).toBeTruthy();
            const authToken = await getAuthToken(); 
            expect(authToken.accessToken).toEqual('XXXXX');
            expect(authToken.timeExp).toEqual(String(AuthTimeExp));          
        });
    });

    describe('when setAuthConfig is called', () => {
        it('should return true given a payload', async () => {
            expect(await setAuthConfig(AUTH_CONFIG)).toBeTruthy();
        });
    });

    describe('when setAuthConfig is called', () => {
        it('should return false given no payload', async () => {
            expect(await setAuthConfig()).toBeFalsy();
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
    

});
