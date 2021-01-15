
export type TAuthConfig = {
    tls_client_key: string,
    tls_client_secret: string,
}

export type TAuthResponse = {
    access_token: string,
    token_type: string,
    expires_in: string,
};

export type TErrorResponse = {
    status?: string,
    code?: string,
    message?: string,
};

export type TMessage = {
    to: string,
    deliveryStatus: string,
    messageId: string,
    messageStatusURL: string,
};

export type TCountry = {
    AUS: number
};

export type TMessageSendRequest = {
    to: string,
    validity?: string,
    priority?: boolean,
    body: string,
    notifyURL?: string,
    receiptOff?: boolean,
    replyRequest?: boolean,
};

export type TMessageSendResponse = {
    messages: Array<TMessage>,
    Country: Array<TCountry>,
    ReplyAddress: string,
    messageType: string,
    numberSegments: number,
};

export type TSubscriptionCreateRequest = {
    activeDays: number,
    notifyURL: string,
};

export type TSubscriptionCreateResponse = {
    destinationAddress: string,
    expiryDate: number,
    activeDays: string,
};

export type TSubscriptionRetrieveResponse = {
    destinationAddress: string,
    activeDays: string,
    notifyURL: string,
};

export type TSubscriptionDeleteRequest = {
    emptyArr: number,
};

export type TBnumRetrieveResponse = {
    bnum: Array<string>,
};

export type TBnumRegisterRequest = {
    bnum: Array<string>,
};

export type TBnumRegisterResponse = {
    bnum: Array<string>,
};
