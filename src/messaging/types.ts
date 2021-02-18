/**
 * https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/
 */

// export class Result<T> {
//     public isSuccess: boolean;
//     public isFailure: boolean
//     public error?: string;
//     private _value?: T;

//     private constructor (isSuccess: boolean, error?: string, value?: T) {
//       if (isSuccess && error) {
//         throw new Error(`InvalidOperation: A result cannot be successful and contain an error`);
//       }
//       if (!isSuccess && !error) {
//         throw new Error(`InvalidOperation: A failing result needs to contain an error message`);
//       }

//       this.isSuccess = isSuccess;
//       this.isFailure = !isSuccess;
//       this.error = error;
//       this._value = value;

//       Object.freeze(this);
//     }

//     public getValue () : T | undefined {
//       if (!this.isSuccess) {
//         throw new Error(`Cant retrieve the value from a failed result.`)
//       }
//       return this._value;
//     }

//     public static ok<U> (value?: U) : Result<U> {
//       return new Result<U>(true, '', value);
//     }

//     public static fail<U> (error: string): Result<U> {
//       return new Result<U>(false, error);
//     }

//     public static combine (results: Result<any>[]) : Result<any> {
//       for (let result of results) {
//         if (result.isFailure) return result;
//       }
//       return Result.ok<any>();
//     }
//   }

/**
 * https://dev.to/_gdelgado/type-safe-error-handling-in-typescript-1p4n
 */

export type ResultSuccess<T> = { type: 'success'; value: T };
export type ResultError = { type: 'error'; error: Error };
export type Result<T> = ResultSuccess<T> | ResultError;

export type TAuthConfig = {
    tls_client_key: string;
    tls_client_secret: string;
};

export type TAuthResponse = {
    access_token: string;
    token_type: string;
    expires_in: string;
};

export type TErrorResponse = {
    errorStatus?: number;
    errorCode?: string;
    errorMessage?: string;
};

export type TMessage = {
    to: string;
    deliveryStatus: string;
    messageId: string;
    messageStatusURL?: string;
};

export type TCountry = {
    AUS: number;
};

export type TMessageSendRequest = {
    to: string;
    body: string;
    from?: string;
    validity?: string;
    scheduledDelivery?: string;
    notifyURL?: string;
    priority?: boolean;
    replyRequest?: boolean;
    receiptOff?: boolean;
    userMsgRef?: string;
};

export type TMessageSendResponse = {
    messages: Array<TMessage>;
    Country?: Array<TCountry>;
    ReplyAddress?: string;
    messageType: string;
    numberSegments: number;
};

export type TMessageRepliesResponse = {
    status: string;
    destinationAddress: string;
    senderAddress: string;
    message: string;
    messageId: string;
    sentTimestamp: string;
};

export type TMessageStatusRequest = {
    messageId: string;
};

export type TMessageStatusResponse = {
    to: string;
    sentTimestamp: string;
    receivedTimestamp: string;
    deliveryStatus: string;
};

export type TSubscriptionCreateRequest = {
    activeDays: number;
    notifyURL?: string;
};

export type TSubscriptionCreateResponse = {
    destinationAddress?: string;
    expiryDate?: number;
    activeDays?: string;
};

export type TSubscriptionRetrieveResponse = {
    activeDays?: string;
    notifyURL?: string;
    destinationAddress?: string;
};

export type TSubscriptionDeleteRequest = {
    emptyArr?: number;
};

export type TBnumRetrieveResponse = {
    bnum: Array<string>;
};

export type TBnumRegisterRequest = {
    bnum: Array<string>;
};

export type TBnumRegisterResponse = {
    bnum: Array<string>;
};
