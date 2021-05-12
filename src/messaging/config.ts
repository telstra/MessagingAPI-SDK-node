import { getStorage } from './storage';
import { TAuthConfig, TAuthResponse } from './types';
import { StorageError } from './errors';

export const setConfig = async (authConfig: TAuthConfig): Promise<void> => {
    await getStorage()
        .set({
            bucket: 'authStore',
            key: 'clientCredentials',
            data: JSON.stringify(authConfig),
        })
        .catch(() => {
            throw new StorageError({
                errorCode: `STORAGE_ERROR`,
                errorMessage: `Unable to set auth config in storage.`,
            });
        });
};

export const getConfig = async (): Promise<string> => {
    return await getStorage()
        .get({
            bucket: 'authStore',
            key: 'clientCredentials',
        })
        .catch(() => {
            throw new StorageError({
                errorCode: `STORAGE_ERROR`,
                errorMessage: `Unable to get auth config from storage.`,
            });
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
