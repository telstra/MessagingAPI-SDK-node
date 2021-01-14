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

export class StorageError extends TError {
    constructor(info: IConst) {
        super(info);
    }
}

export class APIRequestError extends TError {
    constructor(info: IConst) {
        super(info);
    }
}
