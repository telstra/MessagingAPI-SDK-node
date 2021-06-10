import { getStorage } from './storage';
import { TAuthConfig } from './types';
import { StorageError } from './Errors';
import { Constants } from './Constants';

export const setConfig = async (authConfig: TAuthConfig): Promise<void> => {
    await getStorage()
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
    return await getStorage()
        .get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.CLIENT_CREDENTIALS_BUCKET_KEY,
        })
        .catch(() => {
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_GET);
        });
};

export const clearConfig = async (): Promise<void> => {
    await getStorage().clear({ bucket: Constants.BUCKET_AUTH_STORE });
};

export const setAuthToken = async (authToken: string): Promise<void> => {
    await getStorage().set({
        bucket: Constants.BUCKET_AUTH_STORE,
        key: Constants.ACCESS_TOKEN_BUCKET_KEY,
        data: JSON.stringify(authToken),
    });
};

export const getAuthToken = async (): Promise<string | boolean> => {
    try {
        const data = await getStorage().get({
            bucket: Constants.BUCKET_AUTH_STORE,
            key: Constants.ACCESS_TOKEN_BUCKET_KEY,
        });
        return JSON.parse(data);
    } catch (error) {
        return false;
    }
};
