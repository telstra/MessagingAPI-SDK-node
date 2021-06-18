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
