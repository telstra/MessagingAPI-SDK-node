export abstract class Schemas {
    static readonly SEND_MESSAGE = {
        properties: {
            to: {
                oneOf: [
                    {
                        type: 'string',
                        minLength: 5,
                        maxLength: 16,
                    },
                    {
                        type: 'array',
                        minItems: 1,
                        maxItems: 500,
                        uniqueItems: true,
                        items: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 16,
                        },
                    },
                ],
            },
            from: {
                type: 'string',
                minLength: 1,
                maxLength: 13,
            },
            messageContent: {
                type: 'string',
                minLength: 1,
                maxLength: 1600,
            },
            multimedia: {
                type: 'array',
                minItems: 1,
                maxItems: 5,
                items: {
                    type: 'object',
                    required: ['type', 'fileName', 'payload'],
                    properties: {
                        type: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100,
                            enum: [
                                'audio/amr',
                                'audio/mp3',
                                'audio/mpeg3',
                                'audio/midi',
                                'audio/wav',
                                'audio/basic',
                                'image/gif',
                                'image/jpeg',
                                'image/png',
                                'image/bmp',
                                'video/mpeg4',
                                'video/mp4',
                                'video/mpg',
                                'video/mpeg',
                                'video/3gpp',
                                'video/3gp',
                            ],
                        },
                        fileName: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100,
                        },
                        payload: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 999999,
                        },
                    },
                },
            },
            retryTimeout: {
                type: 'integer',
                minimum: 1,
                maximum: 1440,
            },
            scheduleSend: {
                type: 'string',
            },
            deliveryNotification: {
                type: 'boolean',
            },
            statusCallbackUrl: {
                type: 'string',
            },
            queuePriority: {
                type: 'integer',
                minimum: 1,
                maximum: 2,
            },
            tags: {
                type: 'array',
                minItems: 0,
                maxItems: 10,
                items: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
            },
        },
        required: ['to', 'from'],
        oneOf: [
            {
                required: ['messageContent'],
            },
            {
                required: ['multimedia'],
            },
            {
                required: ['messageContent', 'multimedia'],
            },
        ],
    };

    static readonly UPDATE_MESSAGE = {
        properties: {
            messageId: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                format: 'uuid',
            },
            to: {
                type: 'string',
                minLength: 5,
                maxLength: 16,
            },
            from: {
                type: 'string',
                minLength: 1,
                maxLength: 13,
            },
            messageContent: {
                type: 'string',
                minLength: 1,
                maxLength: 1600,
            },
            multimedia: {
                type: 'array',
                minItems: 1,
                maxItems: 5,
                items: {
                    type: 'object',
                    required: ['type', 'fileName', 'payload'],
                    properties: {
                        type: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100,
                            enum: [
                                'audio/amr',
                                'audio/mp3',
                                'audio/mpeg3',
                                'audio/midi',
                                'audio/wav',
                                'audio/basic',
                                'image/gif',
                                'image/jpeg',
                                'image/png',
                                'image/bmp',
                                'video/mpeg4',
                                'video/mp4',
                                'video/mpg',
                                'video/mpeg',
                                'video/3gpp',
                                'video/3gp',
                            ],
                        },
                        fileName: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100,
                        },
                        payload: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 999999,
                        },
                    },
                },
            },
            retryTimeout: {
                type: 'integer',
                minimum: 1,
                maximum: 1440,
            },
            scheduleSend: {
                type: 'string',
            },
            deliveryNotification: {
                type: 'boolean',
            },
            statusCallbackUrl: {
                type: 'string',
            },
            queuePriority: {
                type: 'integer',
                minimum: 1,
                maximum: 2,
            },
            tags: {
                type: 'array',
                minItems: 0,
                maxItems: 10,
                items: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
            },
        },
        required: ['messageId', 'to', 'from'],
        oneOf: [
            {
                required: ['messageContent'],
            },
            {
                required: ['multimedia'],
            },
            {
                required: ['messageContent', 'multimedia'],
            },
        ],
        nullable: false,
    };

    static readonly UPDATE_MESSAGE_TAGS = {
        properties: {
            messageId: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                format: 'uuid',
            },
            tags: {
                type: 'array',
                minItems: 0,
                maxItems: 10,
                items: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
            },
        },
        required: ['messageId', 'tags'],
    };

    static readonly GET_ALL = {
        properties: {
            limit: {
                type: 'integer',
                minimum: 1,
                maximum: 50,
            },
            offset: {
                type: 'integer',
                minimum: 0,
                maximum: 999999,
            },
            filter: {
                type: 'string',
            },
        },
    };

    static readonly CREATE_FREETRIAL_NUMBER = {
        properties: {
            freeTrialNumbers: {
                type: 'array',
                items: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 10,
                },
                minItems: 0,
                maxItems: 10,
                uniqueItems: true,
            },
        },
        additionalProperties: false,
    };

    static readonly CREATE_MESSAGES_REPORT = {
        properties: {
            startDate: {
                type: 'string',
                format: 'date-time',
                minLength: 10,
                maxLength: 24,
            },
            endDate: {
                type: 'string',
                format: 'date-time',
                minLength: 10,
                maxLength: 24,
            },
            reportCallbackUrl: {
                type: 'string',
            },
            filter: {
                type: 'string',
            },
        },
        required: ['startDate', 'endDate'],
    };
}
