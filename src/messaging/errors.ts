export interface IConst {
    errorStatus: number;
    errorCode: string;
    errorMessage: string;
}

export abstract class TError extends Error {
    name: string;
    errorMessage: string;
    errorCode: string;
    errorStatus: number;
    constructor(info: IConst) {
        super();
        this.errorStatus = info.errorStatus;
        this.errorCode = info.errorCode;
        this.errorMessage = info.errorMessage;
        this.message = info.errorMessage;
        this.name = this.constructor.name;
    }
}

export class StorageError extends TError {}

export class RequestError extends TError {}

export class AuthError extends TError {}
