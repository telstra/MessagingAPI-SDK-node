import { getStorage } from './storage';
import { TAuthConfig, TAuthResponse } from './types';

export const setConfig = async (authConfig: TAuthConfig) => {
    await getStorage().set({
        bucket: 'authStore',
        key: 'clientCredentials',
        data: JSON.stringify(authConfig),
    });
};

export const getConfig = async () => {
    return await getStorage().get({
        bucket: 'authStore',
        key: 'clientCredentials',
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
