export interface ErrorResponse {
    errorCode: string;
    errorMessage: string;
}

export type ResultSuccess<T> = { type: 'success'; value: T };
export type ResultError = { type: 'error'; error: Error };
export type Result<T> = ResultSuccess<T> | ResultError;

export type TAuthConfig = {
    telstra_messaging_client_id: string;
    telstra_messaging_client_secret: string;
};
export interface AuthConfigProps {
    TELSTRA_MESSAGING_CLIENT_ID: string;
    TELSTRA_MESSAGING_CLIENT_SECRET: string;
}

export interface AuthCredentials {
    client_id: string;
    client_secret: string;
}

export interface AuthAccessToken {
    access_token: string;
    token_type: string;
    expires_in: string;
}

export type TAuthResponse = {
    access_token: string;
    token_type: string;
    expires_in: string;
};

export enum TMessageType {
    SMS = 'sms',
    MMS = 'mms',
}

export type TMessage = {
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
    type?: TMessageType;
    multimedia?: TMessageType;
};

export type TMessageSend = {
    to: string;
    deliveryStatus: string;
    messageId: string;
    messageStatusURL?: string;
};

export type TCountrySend = {
    AUS: number;
};

export type TMessageSendResponse = {
    messages: Array<TMessageSend>;
    Country?: Array<TCountrySend>;
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

export type THealthCheck = {
    status?: string;
};

export type TMessageHealthCheck = {
    sms: THealthCheck;
    mms: THealthCheck;
};
