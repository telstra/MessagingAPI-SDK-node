/* eslint-disable */
const { server, rest } = require('./testServer');
const { Message, AssertionError } = require('../../../src/messaging/classes');
const AUTH_CONFIG = require('./credentials.json');

const message = new Message(AUTH_CONFIG);

describe("Message", () => {

  describe("healthCheck", () => {
    describe('when the client makes a healthcheck call', () => {
      it("should pass", async () => {
        await expect(message.healthCheck()).resolves.toEqual({ sms: { status: 'up' }, mms: { status: 'up' } });
      });
    });
  });

  describe("getNextUnreadReply", () => {
    describe('when the client sends a valid request', () => {
      it("should pass", async () => {
        await expect(message.getNextUnreadReply()).resolves.toEqual({ "status": "EMPTY" });
      });
    });
  });

  describe("status", () => {
    describe('when the client sends a valid [messageId] attribute', () => {
      it("should pass", async () => {
        await expect(message.status('XXXXX')).resolves.toEqual({ "messageId": "XXXXX"});
      });
    });
  });

  describe("send", () => {

    describe('when the client sends valid required attributes', () => {

      it("should pass when [to] is a string having 10 chars", async () => {
        const data = { to: "1234567890", body: "Hello from Messaging SDK!" };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should pass when [to] is a string having 12 chars", async () => {
        const data = { to: "+61234567890", body: "Hello from Messaging SDK!" };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should pass when [to] is an array of strings having 10 chars", async () => {
        const data = { to: ['1234567890'], body: "Hello from Messaging SDK!" };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should pass when [to] is an array of strings having 12 chars", async () => {
        const data = { to: ['+61234567890'], body: "Hello from Messaging SDK!" };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should pass when [type] is string having value [sms]", async () => {
        const data = { to: ['+61234567890'], body: "Hello from Messaging SDK!", type: 'sms' };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should pass when [type] is string having value [mms]", async () => {
        const data = { to: ['+61234567890'], body: "Hello from Messaging SDK!", type: 'mms' };
        await expect(message.send(data)).resolves.toEqual(data);
      });

    });

    describe('when the client sends invalid required attributes', () => {

      it("should fail and throw an assertion error when no object", async () => {
        const callback = async () => message.send()
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should be object`,
          })
        );
      });

      it("should fail and throw an assertion error when object has no key:values", async () => {
        const callback = async () => message.send({})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'to', data should have required property 'body'`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is missing", async () => {
        const callback = async () => message.send({body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'to'`,
          })
        );
      });

      it("should fail and throw an assertion error when [body] is missing", async () => {
        const callback = async () => message.send({to: '+61234567890'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'body'`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is a number and [body] is missing", async () => {
        const callback = async () => message.send({to: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to should be array, data.to should match some schema in anyOf, data should have required property 'body'`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is a number", async () => {
        const callback = async () => message.send({to: 123456, body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to should be array, data.to should match some schema in anyOf`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is an empty array", async () => {
        const callback = async () => message.send({to: [], body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to should NOT have fewer than 1 items, data.to should match some schema in anyOf`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is an array of numbers", async () => {
        const callback = async () => message.send({to: [123456], body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to[0] should be string, data.to should match some schema in anyOf`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is an array of strings of length less than 10", async () => {
        const callback = async () => message.send({to: ['123456'], body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to[0] should NOT be shorter than 10 characters, data.to should match some schema in anyOf`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is an array of strings of length greater than 12", async () => {
        const callback = async () => message.send({to: ['+612345678900'], body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to[0] should NOT be longer than 12 characters, data.to should match some schema in anyOf`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is an array of strings having duplicates", async () => {
        const callback = async () => message.send({to: ['+61234567890', '+61234567890'], body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to should NOT have duplicate items (items ## 0 and 1 are identical), data.to should match some schema in anyOf`,
          })
        );
      });

      it("should fail and throw an assertion error when [to] is an array of strings having more than 10 members", async () => {
        const callback = async () => message.send({to: ['+61234567890','+61234567891','+61234567892','+61234567893','+61234567894','+61234567895','+61234567896','+61234567897','+61234567898','+61234567899','+62234567890'], body: '123456'})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to should NOT have more than 10 items, data.to should match some schema in anyOf`,
          })
        );
      });

      it("should fail and throw an assertion error when [to, body] are numbers", async () => {
        const callback = async () => message.send({to: 123456, body: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.to should be string, data.to should be array, data.to should match some schema in anyOf, data.body should be string`,
          })
        );
      });

      it("should fail and throw an assertion error when [body] is a number", async () => {
        const callback = async () => message.send({to: '+61234567890', body: 123456})
        await expect(callback).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.body should be string`,
          })
        );
      });

    });

    describe('when the client sends invalid optional attributes', () => {

      it("should pass with attr [type] as a string", async () => {
        const data = { to: "1234567890", body:"Hello from Messaging SDK!", type: 'sms' };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should fail and throw an assertion error when [type] requires a string", async () => {
        const data = { to: "1234567890", body: "Hello from Messaging SDK!", type: 123456 };
        await expect(message.send(data)).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.type should be string, data.type should be equal to one of the allowed values`,
          })
        );
      });

      it("should fail and throw an assertion error when [type] is a string", async () => {
        const data = { to: "1234567890", body: "Hello from Messaging SDK!", type: '123456' };
        await expect(message.send(data)).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.type should be equal to one of the allowed values`,
          })
        );
      });

      it("should fail and throw an assertion error when [from] is a number", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          from: 123456
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.from should be string`,
          })
        );
      });

      it("should pass when [from] is a string", async () => {
        const data = {
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          from: '123456',
        };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should fail and throw an assertion error when [validity] is a string", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          validity: '54325',
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.validity should be number`,
          })
        );
      });

      it("should fail and throw an assertion error when [validity] is greater than 10080", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          validity: 123456,
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.validity should be < 10080`,
          })
        );
      });

      it("should fail and throw an assertion error when [validity] is less than 1", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          validity: -1,
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.validity should be >= 1`,
          })
        );
      });

      it("should pass when [validity] is greater than 0", async () => {
        const data = {
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          validity: 1,
        };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should fail and throw an assertion error when [scheduledDelivery] is less than 1", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          scheduledDelivery: -1,
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.scheduledDelivery should be >= 1`,
          })
        );
      });

      it("should pass when [scheduledDelivery] is greater than 0", async () => {
        const data = {
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          scheduledDelivery: 1,
        };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should fail and throw an assertion error when [notifyURL] is a number", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          notifyURL: 123456,
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.notifyURL should be string`,
          })
        );
      });

      it("should pass when [notifyURL] is a string", async () => {
        const data = {
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          notifyURL: 'https://webhook-endpoint/',
        };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should fail and throw an assertion error when [replyRequest] is a number", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          replyRequest: 123456,
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.replyRequest should be boolean`,
          })
        );
      });

      it("should pass when [replyRequest] is a boolean", async () => {
        const data = {
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          replyRequest: false,
        };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should fail and throw an assertion error when [priority] is a number", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          priority: 123456,
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.priority should be boolean`,
          })
        );
      });

      it("should pass when [priority] is a boolean", async () => {
        const data = {
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          priority: false,
        };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should fail and throw an assertion error when [receiptOff] is a number", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          receiptOff: 123456,
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.receiptOff should be boolean`,
          })
        );
      });

      it("should pass when [receiptOff] is a boolean", async () => {
        const data = {
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          receiptOff: false,
        };
        await expect(message.send(data)).resolves.toEqual(data);
      });

      it("should fail and throw an assertion error when [userMsgRef] is a number", async () => {
        await expect(message.send({
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          userMsgRef: 123456,
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.userMsgRef should be string`,
          })
        );
      });

      it("should pass when [userMsgRef] is a string", async () => {
        const data = {
          to: '+61234567890',
          body: 'Hello from Messaging SDK',
          userMsgRef: '123456',
        };
        await expect(message.send(data)).resolves.toEqual(data);
      });

    });

  });

  describe("sendBulk", () => {

    describe('when the client sends an object', () => {

      it("should pass with valid schema", async () => {
        const data = {
          smsMulti: [{
              to: '+61234567890',
              body: 'First Message to same recipient',
          },
          {
            to: '+61234567890',
            body: 'Second Message to same recipient',
          }],
          notifyURL: 'https://requestbin.com/r/enwrsgnd84je/1u1G7xO3hK4SRUDprV1QtVXZzuY/'
        };
        await expect(message.sendBulk(data)).resolves.toEqual(data);
      });

      it("should throw an assertion error when attr smsMulti is an array having attr(s) [to, body] as valid and business constraint [notifyURL] required where [receiptOff] is undefined or false ", async () => {
        await expect(message.sendBulk({
          smsMulti: [{
              to: '+61402000823',
              body: 'Hello from Messaging SDK',
          },{
              to: '+61402000823',
              body: 'Yes it works',
          }]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'notifyURL'`,
          })
        );
      });

      it("should throw an assertion error when payload is missing", async () => {
        await expect(message.sendBulk()).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should be object`,
          })
        );
      });

      it("should throw an assertion error when payload is object without attributes", async () => {
        await expect(message.sendBulk({})).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data should have required property 'smsMulti'`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is a number", async () => {
        await expect(message.sendBulk({
          smsMulti: 123456
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti should be array`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an empty array", async () => {
        await expect(message.sendBulk({
          smsMulti: []
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti should NOT have fewer than 1 items`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an array of numbers", async () => {
        await expect(message.sendBulk({
          smsMulti: [123456]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti[0] should be object`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an array having an empty object member", async () => {
        await expect(message.sendBulk({
          smsMulti: [{}]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti[0] should have required property 'to', data.smsMulti[0] should have required property 'body'`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an array having attr [to] as a number and attr [body] as a number", async () => {
        await expect(message.sendBulk({
          smsMulti: [{
              to: 123456,
              body: 123456,
          }]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti[0].to should be string, data.smsMulti[0].body should be string`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an array having attr [to] as a number and attr [body] as a string", async () => {
        await expect(message.sendBulk({
          smsMulti: [{
              to: 123456,
              body: '123456',
          }]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti[0].to should be string`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an array having attr [to] as a string and attr [body] as a number", async () => {
        await expect(message.sendBulk({
          smsMulti: [{
              to: '+61234567890',
              body: 123456,
          }]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti[0].body should be string`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an array having attr [to] as a string and attr [body] as a number", async () => {
        await expect(message.sendBulk({
          smsMulti: [{
              to: '+612345678901234567890',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt. Ultrices in iaculis nunc sed augue lacus. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Porttitor eget dolor morbi non arcu. Sit amet est placerat in egestas erat imperdiet sed euismod. Porttitor leo a diam sollicitudin tempor id eu. Malesuada fames ac turpis egestas sed. In cursus turpis massa tincidunt dui ut ornare. Quis hendrerit dolor magna eget est. Faucibus in ornare quam viverra orci sagittis eu volutpat. Nunc vel risus commodo viverra maecenas accumsan. Diam volutpat commodo sed egestas egestas. Erat imperdiet sed euismod nisi porta lorem mollis aliquam. Lobortis feugiat vivamus at augue eget arcu dictum varius. Donec adipiscing tristique risus nec feugiat. Orci ac auctor augue mauris augue neque gravida in. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Tellus elementum sagittis vitae et leo. Tellus id interdum velit laoreet id donec ultrices tincidunt. Habitant morbi tristique senectus et netus et malesuada fames ac. Commodo nulla facilisi nullam vehicula ipsum a. Sit amet tellus cras adipiscing. Volutpat sed cras ornare arcu dui vivamus arcu. Sem fringilla ut morbi tincidunt augue interdum. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Tellus at urna condimentum mattis pellentesque id nibh tortor. Viverra accumsan in nisl nisi. Scelerisque eu ultrices vitae auctor. Ut porttitor leo a diam sollicitudin tempor id. Aenean vel elit scelerisque mauris. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Pretium quam vulputate dignissim suspendisse in. Risus nec feugiat in fermentum posuere urna. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Ut faucibus pulvinar elementum integer enim neque. Augue interdum velit euismod in. Lectus quam id leo in vitae. Lorem donec massa sapien faucibus. Eget nulla facilisi etiam dignissim diam quis. Habitant morbi tristique senectus et netus. Cursus sit amet dictum sit amet justo donec enim. Morbi tristique senectus et netus et malesuada fames. Est pellentesque elit ullamcorper dignissim cras tincidunt. Cum sociis natoque penatibus et magnis dis. Nullam vehicula ipsum a arcu cursus.',
          }]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti[0].to should NOT be longer than 12 characters, data.smsMulti[0].body should NOT be longer than 1900 characters`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an array having attr [to] is less than 10", async () => {
        await expect(message.sendBulk({
          smsMulti: [{
              to: '123456789',
              body: 'Hello from Messaging SDK',
          }]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti[0].to should NOT be shorter than 10 characters`,
          })
        );
      });

      it("should throw an assertion error when attr smsMulti is an array having attr [to] is greater than 12", async () => {
        await expect(message.sendBulk({
          smsMulti: [{
              to: '+612345678901',
              body: 'Hello from Messaging SDK',
          }]
        })).rejects
        .toThrow(
          new AssertionError({
            errorCode: `MISSING_ATTRIBUTE`,
            errorMessage: `data.smsMulti[0].to should NOT be longer than 12 characters`,
          })
        );
      });

    });
  });

});
