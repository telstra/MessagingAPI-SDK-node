export enum TMessageType {
    SMS = 'sms',
    MMS = 'mms',
}

export type TMessage = {
    to: string | Array<string>;
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

export type THealthCheck = {
    status?: string;
};

export type TMessageHealthCheck = {
    sms: THealthCheck;
    mms: THealthCheck;
};

export type TMessagingMultiItem = {
    to: string;
    body: string;
    receiptOff: boolean;
};

export type TMessagingMulti = {
    smsMulti: Array<TMessagingMultiItem>;
    notifyURL: string;
};
