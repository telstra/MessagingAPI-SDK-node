export enum TMessageType {
    SMS = 'sms',
    MMS = 'mms',
}

export enum TMultimediaMessageType {
    AUDIO_AMR = 'audio/amr',
    AUDIO_AAC = 'audio/aac',
    AUDIO_MP3 = 'audio/mp3',
    AUDIO_MPEG3 = 'audio/mpeg3',
    AUDIO_MPEG = 'audio/mpeg',
    AUDIO_MPG = 'audio/mpg',
    AUDIO_WAV = 'audio/wav',
    AUDIO_3GPP = 'audio/3gpp',
    AUDIO_MP4 = 'audio/mp4',
    IMAGE_GIF = 'image/gif',
    IMAGE_JPEG = 'image/jpeg',
    IMAGE_JPG = 'image/jpg',
    IMAGE_PNG = 'image/png',
    IMAGE_BMP = 'image/bmp',
    VIDEO_MPEG4 = 'video/mpeg4',
    VIDEO_MP4 = 'video/mp4',
    VIDEO_MPEG = 'video/mpeg',
    VIDEO_3GPP = 'video/3gpp',
    VIDEO_3GP = 'video/3gp',
    VIDEO_H263 = 'video/h263',
    TEXT_PLAIN = 'text/plain',
    TEXT_X_VCARD = 'text/x-vCard',
    TEXT_X_VCALENDAR = 'text/x-vCalendar',
}

export type TMultimediaObject = {
    type: TMultimediaMessageType;
    fileName?: string;
    payload: string;
};

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
    subject: string;
    multimedia?: TMultimediaObject;
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
