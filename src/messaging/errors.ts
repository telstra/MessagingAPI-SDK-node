export interface IConst {
    status: number;
    code: string;
    message: string;
}

export abstract class TError extends Error {
    name: string;
    message: string;
    code: string;
    status: number;
    constructor(info: IConst) {
        super();
        this.status = info.status;
        this.code = info.code;
        this.message = info.message;
        this.name = this.constructor.name;
    }
}

export class StorageError extends TError {}

export class RequestError extends TError {}

export class AuthError extends TError {}

export class SubscriptionError extends TError {}

export class MessageError extends TError {}

export class FreetrialError extends TError {}
