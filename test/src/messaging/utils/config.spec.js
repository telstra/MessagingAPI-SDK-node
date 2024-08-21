/* eslint-disable */
const {
    setAuthConfig,
    getAuthConfig,
    setAuthToken,
    getAuthToken,
    getAuthTimeStamp,
    setAuthTimeStamp,
    getAuthTokenExp,
    setAuthTokenExp,
    checkTokenValidity,
} = require('../../../../src/messaging/utils');

const AUTH_CONFIG = require('../credentials.json');
describe('config', () => {

    describe('when checkTokenValidity is called', () => {
        describe('when the storage is initialized', () => {
            it('should return false with the initial data value of key BUCKET_KEY_ACCESS_TOKEN, BUCKET_KEY_TOKEN_EXP, and BUCKET_KEY_AUTH_TIME_STAMP', async () => {
                const accessToken = await getAuthToken();
                const tokenExp = await getAuthTokenExp();
                const timeStamp = await getAuthTimeStamp();

                expect(accessToken).toBeFalsy();
                expect(tokenExp).toBeFalsy();
                expect(timeStamp).toBeFalsy();
            });
        });

        
        it('should return true if the token is valid', async () => {
            const token = 'valid_token';
            setAuthToken(token);
            setAuthTokenExp(3599);
            setAuthTimeStamp(new Date().getTime() - 1000); // 1 second ago
            const isValid = await checkTokenValidity();
            expect(isValid).toBeTruthy();
        });

        it('should return false if the token is expired', async () => {
            const token = 'expired_token';
            setAuthToken(token);
            setAuthTokenExp(3599);
            setAuthTimeStamp(new Date().getTime() - 3600*1000); // 1 hour ago
            const isValid = await checkTokenValidity();
            expect(isValid).toBeFalsy();
        });

        it('should return false if the token is null', async () => {
            setAuthToken(null);
            setAuthTokenExp(null);
            setAuthTimeStamp(null); 
            const isValid = await checkTokenValidity();
            expect(isValid).toBeFalsy();
        });

        it('should return false if the token is undefined', async () => {
            setAuthToken(undefined);
            setAuthTokenExp(undefined);
            setAuthTimeStamp(undefined); 
            const isValid = await checkTokenValidity();
            expect(isValid).toBeFalsy();
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

    describe('when setAuthTokenExp is called', () => {
        it('should return true given a valid expiration time', async () => {
            const expirationTime = new Date().getTime() + 3600000; // 1 hour from now
            expect(await setAuthTokenExp(expirationTime)).toBeTruthy();
        });
        it('should return false given an invalid expiration time', async () => {
            const expirationTime = null; // invalid expiration time            
            expect(await setAuthTokenExp(expirationTime)).toBeFalsy();
        });
    });

    describe('when getAuthTokenExp is called', () => {
        it('should return the expiration time as a number', async () => {
            const expirationTime = new Date().getTime() + 3600000; // 1 hour from now
            await setAuthTokenExp(expirationTime);
            const result = await getAuthTokenExp();
            expect(typeof result).toBe('number');
            expect(result).toBe(expirationTime);
        });
        it('should return original value if the expiration time is not set as null', async () => {
            const expirationTime = await getAuthTokenExp();
            await setAuthTokenExp(null);
            const result = await getAuthTokenExp();            
            expect(result).toBe(expirationTime);
        }); });
        
    describe('when setAuthTimeStamp is called', () => {
        it('should return true given a valid timestamp', async () => {
            const timeStamp = new Date().getTime(); // current timestamp
            expect(await setAuthTimeStamp(timeStamp)).toBeTruthy();
        });
        it('should return false given an invalid timestamp', async () => {
            const timeStamp = null; // invalid timestamp
            expect(await setAuthTimeStamp(timeStamp)).toBeFalsy();
        });
    });

    describe('when getAuthTimeStamp is called', () => {
        it('should return the timestamp as a number', async () => {
            const timeStamp = new Date().getTime(); // current timestamp
            await setAuthTimeStamp(timeStamp);
            const result = await getAuthTimeStamp();
            expect(typeof result).toBe('number');
            expect(result).toBe(timeStamp);
        });
    });
    describe('when getAuthTimeStamp is called', () => {
        it('should return the timestamp as a number', async () => {
            const timestamp = new Date().getTime(); // current timestamp
            await setAuthTimeStamp(timestamp);
            const result = await getAuthTimeStamp();
            expect(typeof result).toBe('number');
            expect(result).toBe(timestamp);
        });
        it('should return original value if the timestamp is set as null', async () => {
            const timeStamp = await getAuthTimeStamp();
            await setAuthTimeStamp(null);
            const result = await getAuthTimeStamp();
            expect(result).toBe(timeStamp);
        });
    });
    

});
