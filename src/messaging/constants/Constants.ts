import os from 'os';

interface ErrorProps {
    errorCode: string;
    errorMessage: string;
}

export abstract class Constants {
    static readonly SHARED_CREDENTIALS: string = `${os.homedir()}/.telstra/credentials`;
    static readonly API_URL: string = 'https://tapi.telstra.com/';
    static readonly BUCKET_AUTH_STORE: string = 'authStore';
    static readonly ACCESS_TOKEN_BUCKET_KEY: string = 'accessToken';
    static readonly TOKEN_ATTEMPT_BUCKET_KEY: string = 'tokenAttempt';
    static readonly CLIENT_CREDENTIALS_BUCKET_KEY: string = 'clientCredentials';

    static readonly ERRORS = {
        STORAGE_ERROR_GET: {
            errorCode: `STORAGE_ERROR`,
            errorMessage: `Unable to persist authorisation credentials in storage.`,
        } as ErrorProps,
        STORAGE_ERROR_SET: {
            errorCode: `STORAGE_ERROR`,
            errorMessage: `Unable to retrieve authorization credentials from storage.`,
        } as ErrorProps,
        AUTH_ERROR: {
            errorCode: `AUTH_ERROR`,
            errorMessage: `Unable to detect suitable authorization credentials, please ensure both [TELSTRA_MESSAGING_CLIENT_ID] & [TELSTRA_MESSAGING_CLIENT_SECRET] have been defined.`,
        } as ErrorProps,
        AUTH_ERROR_INVALID_CLIENT_CREDENTIALS: {
            errorCode: `INVALID_CLIENT_CREDENTIALS`,
            errorMessage: `Invalid client credentials, please ensure both [TELSTRA_MESSAGING_CLIENT_ID] & [TELSTRA_MESSAGING_CLIENT_SECRET] are correct.`,
        } as ErrorProps,
        UNKNOWN_ERROR: {
            errorCode: `UNKNOWN_ERROR`,
            errorMessage: `An error has occurred`,
        } as ErrorProps,
    };
}
