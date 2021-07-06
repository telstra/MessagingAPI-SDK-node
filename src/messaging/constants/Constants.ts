import os from 'os';

interface ErrorProps {
    errorCode: string;
    errorMessage: string;
}

export abstract class Constants {
    static readonly SHARED_CREDENTIALS: string = `${os.homedir()}/.telstra/credentials`;
    static readonly API_URL: string = 'https://tapi.telstra.com/';
    static readonly BUCKET_AUTH_STORE: string = 'authStore';
    static readonly BUCKET_KEY_AUTH_RETRY_COUNT: string = 'tokenRetryAttempt';
    static readonly BUCKET_KEY_ACCESS_TOKEN: string = 'accessToken';
    static readonly BUCKET_KEY_CLIENT_CREDENTIALS: string = 'clientCredentials';
    static readonly USER_AGENT: string = 'Telstra Messaging SDK/0.3.18';
    static readonly X_TELSTRA_AGENT_MEDIA_TYPE: string =
        'telstra.messaging.v2; param=full; format=json; lang=javascript';
    static readonly authToken: string = 'SMyAEhIFsqXFQxlC9hyljz7m8kL4';

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
