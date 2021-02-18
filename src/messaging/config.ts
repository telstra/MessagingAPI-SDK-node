import { getStorage } from './storage';
import { TAuthConfig, TAuthResponse } from './types';
import { StorageError } from './errors';

export const setConfig = async (authConfig: TAuthConfig) => {
    await getStorage()
        .set({
            bucket: 'authStore',
            key: 'clientCredentials',
            data: JSON.stringify(authConfig),
        })
        .catch(() => {
            throw new StorageError({
                errorStatus: 500,
                errorCode: `ERROR_STORAGE`,
                errorMessage: `Unable to set auth config.`,
            });
        });
};

export const getConfig = async () => {
    return await getStorage()
        .get({
            bucket: 'authStore',
            key: 'clientCredentials',
        })
        .catch(() => {
            throw new StorageError({
                errorStatus: 500,
                errorCode: `ERROR_STORAGE`,
                errorMessage: `Unable to get auth config.`,
            });
        });
};

export const clearConfig = async () => {
    await getStorage().clear({ bucket: 'authStore' });
};

export const setAuthToken = async (authToken: TAuthResponse) => {
    await getStorage().set({
        bucket: 'authStore',
        key: 'authToken',
        data: JSON.stringify(authToken),
    });
};

export const getAuthToken = async () => {
    return await getStorage().get({
        bucket: 'authStore',
        key: 'authToken',
    });
};
