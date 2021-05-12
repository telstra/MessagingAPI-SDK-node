import { ErrorResponse } from './types';

export abstract class TError extends Error {
    name: string;
    errorCode: string;
    errorMessage: string;
    constructor(error: ErrorResponse) {
        super(error.errorMessage);
        this.errorCode = error.errorCode;
        this.errorMessage = error.errorMessage;
        this.name = this.constructor.name;
    }
}

export class StorageError extends TError {}

export class RequestError extends TError {}

export class AuthError extends TError {}

export class ClientError extends TError {}

export class UnknownError extends TError {}

export class AssertionError extends TError {}

export function remap(errorResponse: any): ErrorResponse {
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

    if (errorResponse instanceof AssertionError) {
        return errorResponse;
    }

    const { response } = errorResponse;
    if (!response) {
        return new ClientError({
            errorCode: `ERROR`,
            errorMessage: `${errorResponse.name}: ${errorResponse.message}`,
        });
    }

    const { data } = response;
    if (!data) {
        return new RequestError({
            errorCode: `ERROR`,
            errorMessage: `Response from Messaging API service does not contain any data.`,
        });
    }

    const { error, error_description, code, message } = data;
    if (response.status === 401 && error) {
        return new AuthError({
            errorCode: `AUTH_ERROR`,
            errorMessage: `${error}`,
        });
    } else if (response.status === 401) {
        return new AuthError({
            errorCode: code,
            errorMessage: message,
        });
    } else if (response.status === 400 && error && error_description) {
        return new RequestError({
            errorCode: `BAD_REQUEST`,
            errorMessage: `${error} - ${error_description}`,
        });
    } else if (response.status === 400 && error) {
        return new RequestError({
            errorCode: `BAD_REQUEST`,
            errorMessage: `${error}`,
        });
    } else if (response.status === 400 && code && message) {
        return new RequestError({
            errorCode: code,
            errorMessage: message,
        });
    } else {
        return new UnknownError({
            errorCode: `ERROR`,
            errorMessage: `An unknown error has occurred, the Messaging API service throw returned a ${response.status} error.`,
        });
    }
}
