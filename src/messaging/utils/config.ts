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

