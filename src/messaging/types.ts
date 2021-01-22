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
    status?: string;
    code?: string;
    message?: string;
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
