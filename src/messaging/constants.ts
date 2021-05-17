const os = require('os');

export const API_URL: string = 'https://tapi.telstra.com/';

interface ErrorProps {
    errorCode: string;
    errorMessage: string;
}

export abstract class Constants {
    static readonly SHARED_CREDENTIALS: string = `${os.homedir()}/.telstra/credentials`;

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
    };
}
