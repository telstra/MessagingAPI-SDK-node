import { storage } from './storage';
import { TAuthConfig } from '../types';
import { StorageError } from '../classes';
import { Constants } from '../constants';

export const setAuthConfig = async (
    authConfig: TAuthConfig
): Promise<boolean> => {
    try {
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

export const getAuthConfig = async (): Promise<TAuthConfig> => {
    try {
        const data = await storage().get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_CLIENT_CREDENTIALS,
        });
        return JSON.parse(data);
    } catch (error) {
        throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
    }
};

export const setAuthToken = async (authToken: string): Promise<boolean> => {
    try {
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

export const setAuthTokenRetryCount = async (
    retryCount: string
): Promise<boolean> => {
    try {
        await storage().set({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_AUTH_RETRY_COUNT,
            data: JSON.stringify(retryCount),
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getAuthTokenRetryCount = async (): Promise<number> => {
    try {
        const data = await storage().get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_AUTH_RETRY_COUNT,
        });
        return parseInt(JSON.parse(data));
    } catch (error) {
        await storage().set({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.BUCKET_KEY_AUTH_RETRY_COUNT,
            data: JSON.stringify(0),
        });
        return 0;
    }
};
