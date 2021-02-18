import { TErrorResponse } from './types';
import {
    AuthError,
    StorageError,
    RequestError,
    ClientError,
    UnknownError,
} from './errors';

export function validateError(errorResponse: any): TErrorResponse {
    if (errorResponse instanceof AuthError) {
        return errorResponse;
    }

    if (errorResponse instanceof StorageError) {
        return errorResponse;
    }

    if (errorResponse instanceof RequestError) {
        return errorResponse;
    }

    if (errorResponse instanceof ClientError) {
        return errorResponse;
    }

    if (errorResponse instanceof UnknownError) {
        return errorResponse;
    }

    const { response } = errorResponse;
    if (!response) {
        return new ClientError({
            errorStatus: 500,
            errorCode: `ERROR`,
            errorMessage: `${errorResponse.name}: ${errorResponse.message}`,
        });
    }

    const { data } = response;
    if (!data) {
        return new RequestError({
            errorStatus: response.status,
            errorCode: `ERROR`,
            errorMessage: `Response from Messaging API service does not contain any data.`,
        });
    }

    const { error, error_description, code, message } = data;
    if (response.status === 401 && error) {
        return new AuthError({
            errorStatus: response.status,
            errorCode: `AUTH_ERROR`,
            errorMessage: `${error}`,
        });
    } else if (response.status === 401) {
        return new AuthError({
            errorStatus: response.status,
            errorCode: code,
            errorMessage: message,
        });
    } else if (response.status === 400 && error && error_description) {
        return new RequestError({
            errorStatus: response.status,
            errorCode: `BAD_REQUEST`,
            errorMessage: `${error} - ${error_description}`,
        });
    } else if (response.status === 400 && error) {
        return new RequestError({
            errorStatus: response.status,
            errorCode: `BAD_REQUEST`,
            errorMessage: `${error}`,
        });
    } else if (response.status === 400 && code && message) {
        return new RequestError({
            errorStatus: response.status,
            errorCode: code,
            errorMessage: message,
        });
    } else {
        return new UnknownError({
            errorStatus: response.status,
            errorCode: `ERROR`,
            errorMessage: `An unknown error has occurred, the Messaging API service throw returned a ${response.status} error.`,
        });
    }
}
