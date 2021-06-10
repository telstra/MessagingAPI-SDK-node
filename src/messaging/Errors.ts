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

export class AssertionError extends TError {}
