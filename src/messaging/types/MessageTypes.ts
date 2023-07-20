import { TPaging } from './CommonTypes';

export enum TMultimediaContentType {
    AUDIO_AMR = 'audio/amr',
    AUDIO_MP3 = 'audio/mp3',
    AUDIO_MPEG3 = 'audio/mpeg3',
    AUDIO_MIDI = 'audio/midi',
    AUDIO_WAV = 'audio/wav',
    AUDIO_BASIC = 'audio/basic',
    IMAGE_GIF = 'image/gif',
    IMAGE_JPEG = 'image/jpeg',
    IMAGE_PNG = 'image/png',
    IMAGE_BMP = 'image/bmp',
    VIDEO_MPEG4 = 'video/mpeg4',
    VIDEO_MP4 = 'video/mp4',
    VIDEO_MPG = 'video/mpg',
    VIDEO_MPEG = 'video/mpeg',
    VIDEO_3GPP = 'video/3gpp',
    VIDEO_3GP = 'video/3gp',
}

export enum TMessageStatus {
    QUEUED = 'queued',
    SENT = 'sent',
    DELIVERED = 'delivered',
    EXPIRED = 'expired',
    UNDELIVERABLE = 'undeliverable',
}

export enum TMessageDirection {
    OUTGOING = 'outgoing',
    INCOMING = 'incoming',
}

export type TMultimedia = {
    type: TMultimediaContentType;
    fileName: string;
    payload: string;
};

export type TMultimediaResponse = {
    type: TMultimediaContentType;
    fileName: string;
};

export type TMessageSend = {
    to: string | Array<string>;
    from: string;
    messageContent?: string;
    multimedia?: TMultimedia;
    retryTimeout?: number;
    scheduleSend?: string;
    deliveryNotification?: boolean;
    statusCallbackUrl?: string;
    queuePriority?: string;
    tags?: Array<string>;
};

export type TMessageSendResponse = {
    messageId: string | Array<string>;
    status: TMessageStatus;
    to: string | Array<string>;
    from: string;
    messageContent?: string;
    multimedia?: Array<TMultimediaResponse>;
    retryTimeout?: number;
    scheduleSend?: string;
    deliveryNotification?: boolean;
    statusCallbackUrl?: string;
    tags?: Array<string>;
};

export type TMessageUpdateTags = {
    messageId: string;
    tags: Array<string>;
};

export type TMessageUpdate = {
    messageId: string;
    to: string | Array<string>;
    from: string;
    messageContent?: string;
    multimedia?: TMultimedia;
    retryTimeout?: number;
    scheduleSend?: string;
    deliveryNotification?: boolean;
    statusCallbackUrl?: string;
    queuePriority?: string;
    tags?: Array<string>;
};

// export type TMessageUpdateResponse = {
//     messageId: string;
//     status: TMessageStatus;
//     to: string;
//     from: string;
//     messageContent?: string;
//     multimedia?: Array<TMultimediaResponse>;
//     retryTimeout?: number;
//     scheduleSend?: string;
//     deliveryNotification?: boolean;
//     statusCallbackUrl?: string;
//     tags?: Array<string>;
// };

export type TMessageGetResponse = {
    messageId: string;
    status: TMessageStatus;
    createTimestamp: string;
    sentTimestamp: string;
    receivedTimestamp?: string;
    to: string;
    from: string;
    messageContent?: string;
    multimedia?: Array<TMultimediaResponse>;
    direction: TMessageDirection;
    retryTimeout: number;
    scheduleSend?: string;
    deliveryNotification: boolean;
    statusCallbackUrl?: string;
    queuePriority: number;
    tags?: Array<string>;
};

export type TMessages = {
    messages: Array<TMessageGetResponse>;
    paging: TPaging;
};
