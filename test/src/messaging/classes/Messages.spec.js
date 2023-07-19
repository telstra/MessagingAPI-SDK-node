/* eslint-disable */
const { server, rest } = require('../testServer');
const { Messages, AssertionError } = require('../../../../src/messaging/classes');
const AUTH_CONFIG = require('../credentials.json');
const { Constants } = require('../Constants');

const messages = new Messages(AUTH_CONFIG);

describe('Message', () => {
    describe('getAllMessages', () => {
        describe('when the client sends a valid request', () => {
            it('should pass', async () => {                
                await expect(messages.getAll()).resolves.toEqual(
                    Constants.GET_ALL_MESSAGES_RESPONSE
                );
            });
        });
    });

    describe('getMessage', () => {
        describe('when the client sends a valid request', () => {
            it('should pass', async () => {                
                await expect(messages.get('8369468e-20c9-11ee-be56-0242ac120002')).resolves.toEqual(
                    Constants.GET_MESSAGE_RESPONSE
                );
            });
        });
    });
    
    describe('send', () => {
        describe('when the client sends valid required attributes', () => {
            
            it('should pass when [to] is a string having 5 - 16 chars', async () => {
                const data = {
                    to: '+61234567890',
                    from: 'private',
                    messageContent: 'Hello from Messaging SDK!',
                };
                await expect(messages.send(data)).resolves.toEqual(Constants.SEND_MESSAGE_RESPONSE);
            });

            it('should pass when [to] is an array of strings having 5 - 16 chars', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    messageContent: 'Hello from Messaging SDK!',
                };
                await expect(messages.send(data)).resolves.toEqual(Constants.SEND_MESSAGE_RESPONSE);
            });

            it('should pass when [from] is a string "private"', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    messageContent: 'Hello from Messaging SDK!',
                };
                await expect(messages.send(data)).resolves.toEqual({ ...data, ...Constants.SEND_MESSAGE_RESPONSE});
            });

            it('should pass when [from] is a string having 10 chars', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: '0423456789',
                    messageContent: 'Hello from Messaging SDK!',
                };
                await expect(messages.send(data)).resolves.toEqual(Constants.SEND_MESSAGE_RESPONSE);
            });

            it('should pass when [multimedia] is an object with properties [type], [fileName] and [payload] of type string', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                };
                await expect(messages.send(data)).resolves.toEqual(Constants.SEND_MESSAGE_RESPONSE);
            });

            it('should pass when [to] [from] and [multimedia] are valid', async () => {
                const data = {
                    to: [
                        '+61234567891',
                        '+61234567892',
                        '+61234567893',
                        '+61234567894',
                        '+61234567895',
                        '+61234567896',
                        '+61234567897',
                        '+61234567898',
                        '+61234567899',
                        '+62234567890',
                    ],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                };
                await expect(messages.send(data)).resolves.toEqual(Constants.SEND_MESSAGE_RESPONSE);
            });
        });

        describe('when the client sends invalid required attributes', () => {
            it('should fail and throw an assertion error when no object', async () => {
                const callback = async () => messages.send();
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should match exactly one schema in oneOf`,
                    })
                );
            });

            it('should fail and throw an assertion error when object has no key:values', async () => {
                const callback = async () => messages.send({});
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'to', data should have required property 'from', data should have required property 'messageContent', data should have required property 'multimedia', data should have required property 'messageContent', data should have required property 'multimedia', data should match exactly one schema in oneOf`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is missing', async () => {
                const callback = async () => messages.send({ from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'to'`,
                    })
                );
            });

            it('should fail and throw an assertion error when [from] is missing', async () => {
                const callback = async () =>
                    messages.send({ to: '+61234567890' , messageContent: '123456'});
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'from'`,
                    })
                );
            });

            it('should fail and throw an assertion error when [messageContent] is missing', async () => {
                const callback = async () =>
                    messages.send({ to: '+61234567890', from: 'private' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'messageContent', data should have required property 'multimedia', data should have required property 'messageContent', data should have required property 'multimedia', data should match exactly one schema in oneOf`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is a number', async () => {
                const callback = async () =>
                    messages.send({ to: 123456, from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string, data.to should be array, data.to should match exactly one schema in oneOf`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is an empty array', async () => {
                const callback = async () =>
                    messages.send({ to: [], from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string, data.to should NOT have fewer than 1 items, data.to should match exactly one schema in oneOf`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is an array of numbers', async () => {
                const callback = async () =>
                    messages.send({ to: [123456], from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string, data.to[0] should be string, data.to should match exactly one schema in oneOf`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is an array of strings of length less than 5', async () => {
                const callback = async () =>
                    messages.send({ to: ['1234'], from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string, data.to[0] should NOT be shorter than 5 characters, data.to should match exactly one schema in oneOf`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is an array of strings of length greater than 16', async () => {
                const callback = async () =>
                    messages.send({ to: ['+6123456789012345'], from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string, data.to[0] should NOT be longer than 16 characters, data.to should match exactly one schema in oneOf`,
                    })
                );
            });

            // it('should fail and throw an assertion error when [to] is an array of strings having duplicates', async () => {
            //     const callback = async () =>
            //         messages.send({
            //             to: ['+61234567890', '+61234567890'],
            //             from: 'private', 
            //             messageContent: '123456'
            //         });
            //     await expect(callback).rejects.toThrow(
            //         new AssertionError({
            //             errorCode: `MISSING_ATTRIBUTE`,
            //             errorMessage: `data.to should be string, data.to should NOT have duplicate items (items ## 0 and 1 are identical), data.to should match exactly one schema in oneOf`,
            //         })
            //     );
            // });

            it('should fail and throw an assertion error when [to, from] are numbers', async () => {
                const callback = async () =>
                    messages.send({ to: 123456, from: 7891011, messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string, data.to should be array, data.to should match exactly one schema in oneOf, data.from should be string`,
                    })
                );
            });

            it('should fail and throw an assertion error when [from] is a number', async () => {
                await expect(
                    messages.send({
                        to: '+61234567890',
                        messageContent: 'Hello from Messaging SDK',
                        from: 123456,
                    })
                ).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.from should be string`,
                    })
                );
            });

            it('should pass when [from] is a string', async () => {
                const data = {
                    to: '+61234567890',
                    messageContent: 'Hello from Messaging SDK',
                    from: '123456',
                };
                await expect(messages.send(data)).resolves.toEqual(Constants.SEND_MESSAGE_RESPONSE);
            });

            it('should fail and throw an assertion error when [messageContent] is a number', async () => {
                const callback = async () =>
                    messages.send({ to: '+61234567890', from: 'private', messageContent: 123456 });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.messageContent should be string`,
                    })
                );
            });

            it('should fail and throw an assertion error when [multimedia] is not an array', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: 'string value',
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia should be array`,
                    })
                );
            });

            it('should fail and throw an assertion error as the [type] property of [multimedia] object is required field ', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            fileName: 'demo.jpeg',
                            payload:
                                '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',
                        },
                    ],
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0] should have required property 'type'`,
                    })
                );
            });

            it('should fail and throw an assertion error when the [type] property of [multimedia] object is not a string ', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 123,
                            fileName: 'demo.jpeg',
                            payload:
                                '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',
                        },
                    ],
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0].type should be string, data.multimedia[0].type should be equal to one of the allowed values`,
                    })
                );
            });

            it('should fail and throw an assertion error as the [type] property of [multimedia] object is required a be a valid string ', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'invalid string',
                            fileName: 'demo.jpeg',
                            payload:
                                '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',
                        },
                    ],
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0].type should be equal to one of the allowed values`,
                    })
                );
            });

            it('should fail and throw an assertion error as the [payload] property of [multimedia] object is required field ', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/gif',
                            fileName: 'demo.jpeg'
                        },
                    ],
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0] should have required property 'payload'`,
                    })
                );
            });

            it('should fail and throw an assertion error when the [payload] property of [multimedia] object is not a string ', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'demo.jpeg',
                            payload: 123,
                        },
                    ],
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0].payload should be string`,
                    })
                );
            });
        });

        describe('when the client sends invalid optional attributes', () => {
            it('should pass with valid attributes', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    retryTimeout: 10,
                    scheduleSend: '2023-07-13T05:25:14.591Z',
                    deliveryNotification: true,
                    statusCallbackUrl: 'https://example.com',
                    queuePriority: 2,
                    tags: ['Msg-Api', 'V3']
                };
                await expect(messages.send(data)).resolves.toEqual(Constants.SEND_MESSAGE_RESPONSE);
            });

            it('should fail and throw an assertion error when [retryTimeout] is a string', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    retryTimeout: '10',
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.retryTimeout should be integer`,
                    })
                );
            });

            it('should fail and throw an assertion error when [scheduleSend] is a string length < 10', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    scheduleSend: '10:15:39',
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.scheduleSend should match a ISO format date-time string, e.g. '2022-07-13T05:25:14.591Z'`,
                    })
                );
            });

            it('should fail and throw an assertion error when [scheduleSend] is not a valid date-time', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    scheduleSend: 'some invalid string',
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.scheduleSend should match a ISO format date-time string, e.g. '2022-07-13T05:25:14.591Z'`,
                    })
                );
            });
            
            it('should fail and throw an assertion error when [deliveryNotification] is a string', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    deliveryNotification: 'false',
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.deliveryNotification should be boolean`,
                    })
                );
            });

            it('should fail and throw an assertion error when [statusCallbackUrl] is not a url', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    statusCallbackUrl: 'not a url',
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.statusCallbackUrl should match a URL format string, e.g. 'https://example.com'`,
                    })
                );
            });
            
            it('should fail and throw an assertion error when [queuePriority] is a string', async () => {
                const data = {
                    to: ['+61234567890'],
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    queuePriority: '2',
                };
                await expect(messages.send(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.queuePriority should be integer`,
                    })
                );
            });

        });
    });

    describe('update', () => {
        describe('when the client sends valid required attributes', () => {
            it('should pass when [messageId] is a UUID v1 string', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    messageContent: 'Hello from Messaging SDK!',
                    tags: ['Msg', 'V3'],
                };
                await expect(messages.update(data)).resolves.toEqual(Constants.UPDATE_MESSAGE_RESPONSE);
            });                       
        });

        describe('when the client sends invalid required attributes', () => {
            it('should fail and throw an assertion error when [to] is missing', async () => {
                const callback = async () => messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'to'`,
                    })
                );
            });

            it('should fail and throw an assertion error when [from] is missing', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: '+61234567890' , messageContent: '123456'});
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'from'`,
                    })
                );
            });

            it('should fail and throw an assertion error when [messageContent] is missing', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: '+61234567890', from: 'private' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'messageContent', data should have required property 'multimedia', data should have required property 'messageContent', data should have required property 'multimedia', data should match exactly one schema in oneOf`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is a number', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: 123456, from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is an empty array', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: [], from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is an array of numbers', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: [123456], from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is an array of strings of length less than 5', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: ['1234'], from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string`,
                    })
                );
            });

            it('should fail and throw an assertion error when [to] is an array of strings of length greater than 16', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: ['+6123456789012345'], from: 'private', messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string`,
                    })
                );
            });
            
            it('should fail and throw an assertion error when [to, from] are numbers', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: 123456, from: 7891011, messageContent: '123456' });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.to should be string, data.from should be string`,
                    })
                );
            });

            it('should fail and throw an assertion error when [from] is a number', async () => {
                await expect(
                    messages.update({
                        messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                        to: '+61234567890',
                        messageContent: 'Hello from Messaging SDK',
                        from: 123456,
                    })
                ).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.from should be string`,
                    })
                );
            });

            it('should pass when [from] is a string', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    messageContent: 'Hello from Messaging SDK',
                    from: '123456',
                };
                await expect(messages.update(data)).resolves.toEqual(Constants.UPDATE_MESSAGE_RESPONSE);
            });

            it('should fail and throw an assertion error when [messageContent] is a number', async () => {
                const callback = async () =>
                    messages.update({ messageId: '8369468e-20c9-11ee-be56-0242ac120002', to: '+61234567890', from: 'private', messageContent: 123456 });
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.messageContent should be string`,
                    })
                );
            });

            it('should fail and throw an assertion error when [multimedia] is not an array', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: 'string value',
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia should be array`,
                    })
                );
            });

            it('should fail and throw an assertion error as the [type] property of [multimedia] object is required field ', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            fileName: 'demo.jpeg',
                            payload:
                                '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',
                        },
                    ],
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0] should have required property 'type'`,
                    })
                );
            });

            it('should fail and throw an assertion error when the [type] property of [multimedia] object is not a string ', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 123,
                            fileName: 'demo.jpeg',
                            payload:
                                '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',
                        },
                    ],
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0].type should be string, data.multimedia[0].type should be equal to one of the allowed values`,
                    })
                );
            });

            it('should fail and throw an assertion error as the [type] property of [multimedia] object is required a be a valid string ', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'invalid string',
                            fileName: 'demo.jpeg',
                            payload:
                                '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',
                        },
                    ],
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0].type should be equal to one of the allowed values`,
                    })
                );
            });

            it('should fail and throw an assertion error as the [payload] property of [multimedia] object is required field ', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/gif',
                            fileName: 'demo.jpeg'
                        },
                    ],
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0] should have required property 'payload'`,
                    })
                );
            });

            it('should fail and throw an assertion error when the [payload] property of [multimedia] object is not a string ', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'demo.jpeg',
                            payload: 123,
                        },
                    ],
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.multimedia[0].payload should be string`,
                    })
                );
            });
        });

        describe('when the client sends invalid optional attributes', () => {
            it('should pass with valid attributes', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    retryTimeout: 10,
                    scheduleSend: '2023-07-13T05:25:14.591Z',
                    deliveryNotification: true,
                    statusCallbackUrl: 'https://example.com',
                    queuePriority: 2,
                    tags: ['Msg-Api', 'V3']
                };
                await expect(messages.update(data)).resolves.toEqual(Constants.UPDATE_MESSAGE_RESPONSE);
            });

            it('should fail and throw an assertion error when [retryTimeout] is a string', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    retryTimeout: '10',
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.retryTimeout should be integer`,
                    })
                );
            });

            it('should fail and throw an assertion error when [scheduleSend] is a string length < 10', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    scheduleSend: '10:15:39',
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.scheduleSend should match a ISO format date-time string, e.g. '2022-07-13T05:25:14.591Z'`,
                    })
                );
            });

            it('should fail and throw an assertion error when [scheduleSend] is not a valid date-time', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    scheduleSend: 'some invalid string',
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.scheduleSend should match a ISO format date-time string, e.g. '2022-07-13T05:25:14.591Z'`,
                    })
                );
            });
            
            it('should fail and throw an assertion error when [deliveryNotification] is a string', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    deliveryNotification: 'false',
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.deliveryNotification should be boolean`,
                    })
                );
            });

            it('should fail and throw an assertion error when [statusCallbackUrl] is not a url', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    statusCallbackUrl: 'not a url',
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.statusCallbackUrl should match a URL format string, e.g. 'https://example.com'`,
                    })
                );
            });
            
            it('should fail and throw an assertion error when [queuePriority] is a string', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    to: '+61234567890',
                    from: 'private',
                    multimedia: [
                        {
                            type: 'image/jpeg',
                            fileName: 'hello.jpeg',
                            payload: 'R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj==',
                        },
                    ],
                    queuePriority: '2',
                };
                await expect(messages.update(data)).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.queuePriority should be integer`,
                    })
                );
            });

        });
    });

    describe('updateTags', () => {
        describe('when the client sends valid required attributes', () => {
            it('should pass when [messageId] is a UUID v1 string and [tags] is array of strings', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    tags: ['Msg', 'V3'],
                };
                await expect(messages.updateTags(data)).resolves.toEqual('');
            });
        });

        describe('when the client sends invalid required attributes', () => {
            it('should fail and throw an assertion error when [messageId] is not passed', async () => {
                const data = {
                    tags: ['Msg', 'V3'],
                };
                const callback = async () => messages.updateTags(data);
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'messageId'`,
                    })
                );
            });

            it('should fail and throw an assertion error when [messageId] is invalid UUID v1', async () => {
                const data = {
                    messageId: '8540d774-4555-4d2b-b788-4ecb19412e85',
                    tags: ['Msg', 'V3'],
                };
                const callback = async () => messages.updateTags(data);
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.messageId should match UUID v1 format string.`,
                    })
                );
            });

            it('should fail and throw an assertion error when [tags] is not passed', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                };
                const callback = async () => messages.updateTags(data);
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data should have required property 'tags'`,
                    })
                );
            });

            it('should fail and throw an assertion error when [tags] is a string', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    tags: 'Msg',
                };
                const callback = async () => messages.updateTags(data);
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.tags should be array`,
                    })
                );
            });

            it('should fail and throw an assertion error when [tags] is an array of numbers', async () => {
                const data = {
                    messageId: '8369468e-20c9-11ee-be56-0242ac120002',
                    tags: [123, 786, 'Msg'],
                };
                const callback = async () => messages.updateTags(data);
                await expect(callback).rejects.toThrow(
                    new AssertionError({
                        errorCode: `MISSING_ATTRIBUTE`,
                        errorMessage: `data.tags[0] should be string, data.tags[1] should be string`,
                    })
                );
            });            
        });

    });
});
