import { storage } from './storage';
import { TAuthConfig } from './types';
import { StorageError } from './Errors';
import { Constants } from './Constants';

export const setConfig = async (authConfig: TAuthConfig): Promise<void> => {
    await storage()
        .set({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.CLIENT_CREDENTIALS_BUCKET_KEY,
            data: JSON.stringify(authConfig),
        })
        .catch(() => {
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
        });
};

export const getConfig = async (): Promise<string> => {
    return await storage()
        .get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.CLIENT_CREDENTIALS_BUCKET_KEY,
        })
        .catch(() => {
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_GET);
        });
};

export const setAuthToken = async (authToken: string): Promise<void> => {
    await storage().set({
        bucket: Constants.BUCKET_AUTH_STORE,
        key: Constants.ACCESS_TOKEN_BUCKET_KEY,
        data: JSON.stringify(authToken),
    });
};

export const getAuthToken = async (): Promise<string | boolean> => {
    try {
        const data = await storage().get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.ACCESS_TOKEN_BUCKET_KEY,
        });
        return JSON.parse(data);
    } catch (error) {
        return false;
    }
};
