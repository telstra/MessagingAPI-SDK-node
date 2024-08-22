import { storage } from './storage';
import { TAuthConfig } from '../types';
import { StorageError } from '../common/Errors';
import { Constants } from '../constants';
import { getTime } from 'date-fns';

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

export const setAuthToken = async (
    authToken: string,
    timeExp: string
): Promise<boolean> => {
    try {
        if (!authToken)
            throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);

        await storage()
            .set({
                bucket: Constants.BUCKET_AUTH_STORE,
                key: Constants.BUCKET_KEY_ACCESS_TOKEN,
                data: JSON.stringify(authToken),
            })
            .catch(() => {
                throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
            });

        await storage()
            .set({
                bucket: Constants.BUCKET_AUTH_STORE,
                key: Constants.BUCKET_KEY_AUTH_TIME_EXP,
                data: JSON.stringify(timeExp),
            })
            .catch(() => {
                throw new StorageError(Constants.ERRORS.STORAGE_ERROR_SET);
            });

        return true;
    } catch (error) {
        return false;
    }
};

export const getAuthToken = async (): Promise<
    { accessToken: string; timeExp: string } | boolean
> => {
    try {
        const accessTokenData = await storage()
            .get({
                bucket: Constants.BUCKET_AUTH_STORE,
                key: Constants.BUCKET_KEY_ACCESS_TOKEN,
            })
            .catch(() => {
                throw new StorageError(Constants.ERRORS.STORAGE_ERROR_GET);
            });

        const timeExpData = await storage()
            .get({
                bucket: Constants.BUCKET_AUTH_STORE,
                key: Constants.BUCKET_KEY_AUTH_TIME_EXP,
            })
            .catch(() => {
                throw new StorageError(Constants.ERRORS.STORAGE_ERROR_GET);
            });

        return {
            accessToken: JSON.parse(accessTokenData),
            timeExp: JSON.parse(timeExpData),
        };
    } catch (error) {
        return false;
    }
};

export const checkTokenValidity = async (): Promise<string | null> => {
    try {
        const authData = await getAuthToken();
        const { accessToken, timeExp } = authData as { accessToken: string; timeExp: string };

        const timeExpTimestamp = Number(timeExp);
        const currentTimeStamp = getTime(new Date());

        if (accessToken && timeExp) {
            if (currentTimeStamp < timeExpTimestamp) {
                // Token is still valid
                return accessToken;
            } else {
                // Token has expired
                return null;
            }
        } else {
            // Token or timeExp not found
            return null;
        }
    } catch (error) {
        return null;
    }
};
