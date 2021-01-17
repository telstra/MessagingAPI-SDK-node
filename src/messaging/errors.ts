export interface IConst {
    message: string;
}

export abstract class TError extends Error {
    errorName: string;
    constructor(info: IConst) {
        super();
        this.message = info.message;
        this.errorName = this.constructor.name;
    }
}

export class StorageError extends TError {}

export class APIRequestError extends TError {}
