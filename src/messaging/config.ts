import { getStorage } from './storage';
import { TAuthConfig, TAuthResponse } from './types';
import { StorageError } from './Errors';
import { Constants } from './Constants';

export const setConfig = async (authConfig: TAuthConfig): Promise<void> => {
    await getStorage()
        .set({
            bucket: 'authStore',
            key: 'clientCredentials',
            data: JSON.stringify(authConfig),
        })
        .catch(() => {
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
        });
};

export const getConfig = async (): Promise<string> => {
    return await getStorage()
        .get({
            bucket: 'authStore',
            key: 'clientCredentials',
        })
        .catch(() => {
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_GET);
        });
};

export const clearConfig = async (): Promise<void> => {
    await getStorage().clear({ bucket: 'authStore' });
};

export const setAuthToken = async (authToken: TAuthResponse): Promise<void> => {
    await getStorage().set({
        bucket: 'authStore',
        key: 'authToken',
        data: JSON.stringify(authToken),
    });
};

export const getAuthToken = async (): Promise<string> => {
    return await getStorage().get({
        bucket: 'authStore',
        key: 'authToken',
    });
};
