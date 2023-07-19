export abstract class Constants {

    static readonly GET_ALL_MESSAGES_RESPONSE = {
        messages:[
            {
                messageId:'8540d774-4863-4d2b-b788-4ecb194285',
                status:'queued',
                createTimestamp:'2022-08-24 15:39',
                sentTimestamp:'2022-08-24 15:39',
                to:'0412345678',
                from:'0423456789',
                messageContent:'Example text message.',
                multimedia:[
                    {
                        type:'image/jpeg',
                        fileName:'image.jpeg'
                    }
                ],
                direction:'outgoing',
                retryTimeout:'10',
                scheduleSend:'2022-08-24 15:39',
                deliveryNotification:'false',
                statusCallbackUrl:'https://www.example.com',
                tags:['string']
            }
        ],
        paging:{
            nextPage:'string',
            previousPage:'string',
            lastPage:'string',
            totalCount:'0'
        }
    };

    static readonly BASE_MESSAGE_RESPONSE = {
        messageId:'8540d774-4863-4d2b-b788-4ecb194285',
        status:'queued',
        createTimestamp:'2022-08-24 15:39',
        sentTimestamp:'2022-08-24 15:39',
        direction:'outgoing'
    };

    static readonly GET_MESSAGE_RESPONSE = {
        messageId:'8540d774-4863-4d2b-b788-4ecb194285',
        status:'queued',
        createTimestamp:'2022-08-24 15:39',
        sentTimestamp:'2022-08-24 15:39',
        to:'0412345678',
        from:'0423456789',
        messageContent:'Example text message.',
        multimedia:[
            {
                type:'image/jpeg',
                fileName:'image.jpeg'
            }
        ],
        direction:'outgoing',
        retryTimeout:'10',
        scheduleSend:'2022-08-24 15:39',
        deliveryNotification:'false',
        statusCallbackUrl:'https://www.example.com',
        tags:['string']
    };

    static readonly SEND_MESSAGE_RESPONSE = {
        messageId:'8540d774-4863-4d2b-b788-4ecb194285',
        status:'queued',
        to:'0412345678',
        from:'0423456789',
        messageContent:'Example text message.',
        multimedia:[
            {
                type:'image/jpeg',
                fileName:'image.jpeg'
            }
        ],
        retryTimeout:'10',
        scheduleSend:'2022-08-24 15:39',
        deliveryNotification:'false',
        statusCallbackUrl:'https://www.example.com',
        tags:['string']
    };

    static readonly UPDATE_MESSAGE_RESPONSE = {
        messageId:'8540d774-4863-4d2b-b788-4ecb194285',
        status:'queued',
        to:'0412345678',
        from:'0423456789',
        messageContent:'Updated text message.',
        multimedia:[
            {
                type:'image/jpeg',
                fileName:'image.jpeg'
            }
        ],
        retryTimeout:'10',
        scheduleSend:'2022-08-24 15:39',
        deliveryNotification:'false',
        statusCallbackUrl:'https://www.example.com',
        tags:['string']
    };

    static readonly CREATE_FREETRIAL_NUMBERS_RESPONSE = {
        freeTrialNumbers:["0400000001","0400000002","0400000003"]
    };

    static readonly ASSIGN_VIRTUAL_NUMBER_RESPONSE = {
        virtualNumber:'0412345678',
        replyCallbackUrl:'http://www.example.com',
        tags:['example tags'],
        lastUse:'2019-08-24T14:15:22Z'
    };

    static readonly UPDATE_VIRTUAL_NUMBER_RESPONSE = {
        replyCallbackUrl:'http://www.example.com',
        tags:['example tags']
    };

    static readonly GET_ALL_VIRTUAL_NUMBERS_RESPONSE = {
        virtualNumbers:[
            {
                virtualNumber:'0412345678',
                replyCallbackUrl:'http://www.example.com',
                tags:['example tags'],
                lastUse:'2019-08-24T14:15:22Z'
            }
        ],
        paging:{
            nextPage:'string',
            previousPage:'string',
            lastPage:'string',
            totalCount:'0'
        }
    };

    static readonly GET_OPTOUTS_RESPONSE = {
        recipientOptouts:[
            {
                messageId:'8540d774-4863-4d2b-b788-4ecb194285',
                createTimestamp:'2022-08-24 15:39',
                optoutNumber:'0412345678',
                virtualNumber:'0412345678'
            }
        ],
        paging:{
            nextPage:'string',
            previousPage:'string',
            lastPage:'string',
            totalCount:'0'
        }
    };

    static readonly CREATE_MESSAGES_REPORT_RESPONSE = {
        reportId:'6940c774-4335-4d2b-b758-4ecb19412e85',
        reportCallbackUrl:'https://www.example.com',
        reportStatus:'queued'
    };

    static readonly GET_MESSAGES_REPORT_RESPONSE = {
        reportId:'6940c774-4335-4d2b-b758-4ecb19412e85',
        reportUrl:'https://www.example.com',
        reportStatus:'completed'
    };

    static readonly GET_ALL_MESSAGES_REPORT_RESPONSE = {
        reports: [ 
            { 
                reportId:'6940c774-4335-4d2b-b758-4ecb19412e85',
                reportType:'messages',
                reportExpiry:'2023-01-01',
                reportStatus:'completed'
            }
        ]
    };
}