# Telstra Messaging

The Official SDK for the Telstra messaging API.

> :warning: **This SDK is experimental, everything is subject to change**

## Installing

```bash
npm i -s @tls/messaging
```

## Getting Started

You can find the `Client key` and `Client secret` here: <https://dev.telstra.com/user/me/apps>.

### Getting started using CJS (CommonJS)

```javascript
/** Using CommonJS */
var { SMS } = require('@tls/messaging');

const sms = SMS.getInstance();
sms.send({
    to: '<mobile number>',
    body: 'Hello from Messaging SDK',
}).then(results => {
    console.log(results);
});
```

### Getting started using ESM (ES Modules)

> :warning: To load an ES module, set **"type": "module"** in your **package.json** or use the **.mjs** extension.

```javascript
/** Using ES Modules (ECMAScript) */
import { SMS } from '@tls/messaging';

const sms = SMS.getInstance();
sms.send({
    to: '<mobile number>',
    body: 'Hello from Messaging SDK',
}).then(results => {
    console.log(results);
});
```

## Authentication

Authentication through environment variables is supported.

For example:

```shell
export TELSTRA_MESSAGING_CLIENT_ID="<CLIENT_ID>"
export TELSTRA_MESSAGING_CLIENT_SECRET="<CLIENT_SECRET>"
```

This should be done before any interactions requiring authentication, such as
sending a SMS.

## Free Trial

Telstra offers a free trial for the messaging API to help you evaluate whether
it meets your needs. There are some restrictions that apply compared to the
full API, including a maximum number of SMS that can be sent and requiring the
registration of a limited number of destinations before SMS can be sent to that
destination. For more information, please see here:
<https://dev.telstra.com/content/messaging-api#tag/Free-Trial>.

### Registering Destinations

> :information_source: **Only required for the free trial**

Register destinations for the free trial. For more information, please see
here:
<https://dev.telstra.com/content/messaging-api#operation/freeTrialBnumRegister>.

The function `bnum.register` can be used to register destinations.
It takes the following arguments:

-   `bnum`: A list of destinations, expected to be phone numbers of the
    form `+614XXXXXXXX` or `04XXXXXXXX`.

It returns the list of phone numbers that have been registered.

For example:

```javascript
import { BNUM } from '@tls/messaging';

const bnum = BNUM.getInstance();
bnum.register({
    bnum: ['<mobile number>'],
}).then(results => {
    console.log(results);
});
```

### Retrieve Destinations

> :information_source: **Only required for the free trial**

Retrieve destinations for the free trial. For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/freeTrialBnumList>.

The function `bnum.get` can be used to retrieve registered destinations.
It takes no arguments. It returns the list of phone numbers that have been registered.

For example:

```javascript
import { BNUM } from '@tls/messaging';

const bnum = BNUM.getInstance();
bnum.get().then(results => {
    console.log(results);
});
```

## Subscription

A subscription gives you a dedicated mobile number tied to an application. For
more information, please see here:
<https://dev.telstra.com/content/messaging-api#tag/Provisioning>.

### Create Subscription

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/createSubscription>.

The function `subscription.create` can be used to create a subscription.

It takes the following arguments:

-   `activeDays`: The number of days the subscription will be active,
    defaults to 30.
-   `notifyURL` (optional): A notification URL that will be POSTed to whenever a
    new message (i.e. a reply to a message sent) arrives at this destination
    address. **If you are using a domain URL (e.g. http://www.example.com) for the `notifyURL` attribute, you must include a forward slash at the end to receive notifications, for example, `notifyURL: "http://www.example.com/"`.**

> :warning: If you are using a domain URL (e.g. http://www.example.com) for the `notifyURL` attribute, you must include a forward slash at the end to receive notifications, for example, `notifyURL: "http://www.example.com/"`.

It returns an object with the following properties:

-   `destinationAddress`: The phone number that a message can be sent to.
-   `activeDays`: The number of days left on the subscription.

For example:

```javascript
import { Subscription } from '@tls/messaging';

const subscription = Subscription.getInstance();
subscription
    .create({
        activeDays: 1,
    })
    .then(results => {
        console.log(results);
    });
```

### Get Subscription

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/getSubscription>.

The function `subscription.get` can be used to get the current
subscription. It takes no arguments. It returns an object with the following
properties:

-   `destinationAddress`: The phone number that a message can be sent to.
-   `activeDays`: The number of days left on the subscription.

For example:

```javascript
import { Subscription } from '@tls/messaging';

const subscription = Subscription.getInstance();
subscription.get().then(results => {
    console.log(results);
});
```

### Delete Subscription

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/deleteSubscription>.

The function `subscription.delete` can be used to delete the current
subscription.

```javascript
import { Subscription } from '@tls/messaging';

const subscription = Subscription.getInstance();
subscription
    .delete({
        emptyArr: 0,
    })
    .then(results => {
        console.log(results);
    });
```

## SMS

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#tag/Messaging>.

### Send SMS

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/sendSms>.

The function `sms.send` can be used to send SMS. It takes the
following arguments:

-   `to`: The destination address, expected to be a phone number of the form `+614XXXXXXXX` or `04XXXXXXXX`.
-   `body`: The SMS to send.
-   `from` (optional): An alphanumeric value which will appear as the sender.
    Note that phone numbers are not supported amd the maximum length is 11
    characters. Certain well know senders will be blocked.
-   `validity` (optional): How long the platform should attempt to deliver the
    message for (in minutes).
-   `scheduledDelivery` (optional): How long the platform should wait before
    attempting to send the message (in minutes).
-   `notifyURL` (optional): Contains a URL that will be called once your message
    has been processed. **If you are using a domain URL (e.g. http://www.example.com) for the `notifyURL` attribute, you must include a forward slash at the end to receive notifications, for example, `notifyURL: "http://www.example.com/"`.**
-   `priority` (optional): Message will be placed ahead of all messages with a
    normal priority.
-   `replyRequest` (optional): If set to true, the reply message functionality
    will be implemented.
-   `receiptOff` (optional): Whether Delivery Receipt will be sent back or not.
-   `userMsgRef` (optional): Optional field used by some clients for custom
    reporting.

> :warning: If you are using a domain URL (e.g. http://www.example.com) for the `notifyURL` attribute, you must include a forward slash at the end to receive notifications, for example, `notifyURL: "http://www.example.com/"`.

It returns an object with the following properties:

-   `to`: The destination mobile number.
-   `deliveryStatus`: Whether the delivery has been completed.
-   `messageId`: Unique identifier for the message.
-   `messageStatusUrl`: URL to retrieve the current delivery status.

For example:

```javascript
import { SMS } from '@tls/messaging';

const sms = SMS.getInstance();
sms.send({
    to: '<mobile number>',
    body: 'Hello from Messaging SDK',
}).then(results => {
    console.log(results);
});
```

### Get SMS Status

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/getSmsStatus>.

The function `sms.status` can be used to retrieve
the status of a SMS. It takes the following arguments:

-   `messageId`: Unique identifier for the message.

It returns an object with the following properties:

-   `to`: Where the message is delivered to.
-   `deliveryStatus`: Whether the delivery has been completed.
-   `receivedTimestamp`: When the message was received.
-   `sentTimestamp`: When the message was sent.

For example:

```javascript
import { SMS } from '@tls/messaging';

const { messageId } = '<messageID from sms.send() response>';
const sms = SMS.getInstance();
sms.status(messageId);
```

### Retrieve Replies

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/retrieveSmsReplies>.

The function `sms.get_next_unread_reply` can be used to retrieve
the next unread reply for your phone number subscription. It takes no
arguments. It returns an object with the following properties:

-   `destinationAddress`: Where the message is delivered to.
-   `senderAddress`: Who the message is from.
-   `status`: Whether the delivery has been completed.
-   `message`: The body of the message.
-   `messageId`: Unique identifier for the message.
-   `sentTimestamp`: When the message was sent.

For example:

```javascript
import { SMS } from '@tls/messaging';

const sms = SMS.getInstance();
sms.get_next_unread_reply().then(results => {
    console.log(results);
});
```
