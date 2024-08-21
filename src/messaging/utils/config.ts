import { storage } from './storage';
import { TAuthConfig } from '../types';
import { StorageError } from '../classes';
import { Constants } from '../constants';

export const setAuthConfig = async (
    authConfig: TAuthConfig
): Promise<boolean> => {
    try {
        if (!authConfig)
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
        await storage()
            .set({
                bucket: Constants.BUCKET_AUTH_STORE,
                key: Constants.BUCKET_KEY_CLIENT_CREDENTIALS,
                data: JSON.stringify(authConfig),
            })
            .catch(() => {
                throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
            });
        return true;
    } catch (error) {
        return false;
    }
};

export const getAuthConfig = async (): Promise<TAuthConfig | boolean> => {
    try {
        const data = await storage()
            .get({
                bucket: Constants.BUCKET_AUTH_STORE,
                key: Constants.BUCKET_KEY_CLIENT_CREDENTIALS,
            })
            .catch(() => {
                throw new StorageError(Constants.ERRORS.STORAGE_ERROR_GET);
            });
        return JSON.parse(data);
    } catch (error) {
        return false;
    }
};

export const setAuthToken = async (authToken: string): Promise<boolean> => {
    try {
        if (!authToken)
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
        await storage().set({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_ACCESS_TOKEN,
            data: JSON.stringify(authToken),
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getAuthToken = async (): Promise<string | boolean> => {


    try {
        const data = await storage().get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_ACCESS_TOKEN,
        });
        return JSON.parse(data);
    } catch (error) {
        return false;
    }
};


export const setAuthTokenExp = async (
    tokenExp: number
): Promise<boolean> => {
    try {
        if (!tokenExp)
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
        await storage().set({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_TOKEN_EXP,
            data: JSON.stringify(tokenExp),
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getAuthTokenExp = async (): Promise<number | boolean> => {
    try {
        const data = await storage().get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_TOKEN_EXP,
        });
        return parseInt(JSON.parse(data));
    } catch (error) {
        return false;
    }
};


export const setAuthTimeStamp = async (
    timeStamp: number
): Promise<boolean> => {
    try {
        if (!timeStamp)
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
        await storage().set({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_AUTH_TIME_STAMP,
            data: JSON.stringify(timeStamp),
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getAuthTimeStamp = async (): Promise<number | boolean> => {
    try {
        const data = await storage().get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_AUTH_TIME_STAMP,
        });
        return parseInt(JSON.parse(data));
    } catch (error) {
        return false;
    }
};


export const checkTokenValidity = async (): Promise<boolean> => {
    try {
        const token = await getAuthToken();
        const tokenExp = await getAuthTokenExp();
        const authTimeStamp = await getAuthTimeStamp();
        const currentTimestamp = Date.now();

        if (token && tokenExp && authTimeStamp) {
            const timeDifference = currentTimestamp - Number(authTimeStamp);
            const tokenValidityPeriod = Number(tokenExp) * 1000; // Convert tokenExp to milliseconds

            if (timeDifference < tokenValidityPeriod) {
                // Token is still valid
                return true;
            } else {
                // Token has expired, renew token
                return false;
            }
        } else {
            // Token, expire_in or timestamp not found, renew token
            return false;
        }
    } catch (error) {
        return false;
    }
};