import { TPaging } from './CommonTypes';

export type TAssignVirtualNumberRequest = {
    replyCallbackUrl?: string;
    tags?: Array<string>;
}

export type TUpdateVirtualNumberRequest = {
    virtualNumber: string;
    updateData?: TAssignVirtualNumberRequest;
}

export type TVirtualNumber = {
    virtualNumber: string;
    replyCallbackUrl?: string;
    tags?: Array<string>;
    lastUse?: string;
};

export type TVirtualNumbers = {
    virtualNumbers: Array<TVirtualNumber>;
    paging: TPaging;
};

export type TRecipientOptout = {
    messageId: string;
    virtualNumber: string;
    optoutNumber: string;
    createTimestamp: string;
}

export type TRecipientOptouts = {
    recipientOptotuts: Array<TRecipientOptout>;
    paging: TPaging;
}
