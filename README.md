# Telstra Messaging

The Official SDK for the Telstra messaging API.

> :warning: **This SDK is experimental, everything is subject to change**

## Installing

```bash
npm i -s @telstra/messaging
```

## Getting Started

You can find the `Client key` and `Client secret` here: <https://dev.telstra.com/user/me/apps>.

Before `sending` and `receiving` messages you will need to get your dedicated `Australian number`, see `Subscription` section below.

For `free trial` accounts, you will need to setup a list of `registered destinations` first, see `Free Trial` section below.

### Getting started using CJS (CommonJS)

```javascript
/** Using CommonJS */
var { Message } = require('@telstra/messaging');

const message = new Message();
message
    .send({
        to: '<MOBILE_NUMBER>',
        body: 'Hello from Messaging SDK',
    })
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

### Getting started using ESM (ES Modules)

> :warning: To load an ES module, set **"type": "module"** in your **package.json** or use the **.mjs** extension.

```javascript
/** Using ES Modules (ECMAScript) */
import { Message } from '@telstra/messaging';

const message = new Message();
message
    .send({
        to: '<MOBILE_NUMBER>',
        body: 'Hello from Messaging SDK',
    })
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

## Authentication

Authentication through environment variables, a shared configuration file and json file import are supported.

### Environment variables

Export the following two environment variables, replacing the values with your own credentials.

```shell
export TELSTRA_MESSAGING_CLIENT_ID="<CLIENT_ID>"
export TELSTRA_MESSAGING_CLIENT_SECRET="<CLIENT_SECRET>"
```

### Shared credentials

Create a `~/.telstra/credentials` file in your home path with the following contents, replacing the values with your own credentials.

```markdown
[default]
TELSTRA_MESSAGING_CLIENT_ID = <CLIENT_ID>
TELSTRA_MESSAGING_CLIENT_SECRET = <CLIENT_SECRET>
```

### JSON file import

Create a `json` file in your project path with the following contents, replacing the values with your own credentials.

```json
{
    "TELSTRA_MESSAGING_CLIENT_ID": "<CLIENT_ID>",
    "TELSTRA_MESSAGING_CLIENT_SECRET": "<CLIENT_SECRET>"
}
```

Then `import` the `json` file into your project source.

```typescript
import { Message } from '../dist/index.js';
import AUTH_CONFIG from './credentials.json';

const message = new Message(AUTH_CONFIG);
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

Register destinations for the free trial. For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/freeTrialBnumRegister>.

The function `trialNumber.register` can be used to register destinations.

It takes the following arguments.

-   `bnum`: A list of destinations, expected to be phone numbers of the
    form `+614XXXXXXXX` or `04XXXXXXXX`.

For example:

```javascript
import { TrialNumbers } from '@telstra/messaging';

const trialNumber = new TrialNumbers();
trialNumber
    .register({
        bnum: ['<MOBILE_NUMBER>'],
    })
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

### Retrieve Destinations

> :information_source: **Only required for the free trial**

Retrieve destinations for the free trial. For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/freeTrialBnumList>.

The function `trialNumber.get` can be used to retrieve registered destinations.

It takes no arguments.

For example:

```javascript
import { TrialNumbers } from '@telstra/messaging';

const trialNumber = new TrialNumbers();
trialNumber
    .get()
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

## Subscription

A subscription gives you a dedicated mobile number tied to an application.
For more information, please see here:
<https://dev.telstra.com/content/messaging-api#tag/Provisioning>.

### Create Subscription

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/createSubscription>.

The function `numbers.create` can be used to create a subscription.

It takes the following arguments.

-   `activeDays`: The number of days the subscription will be active,
    defaults to 30.
-   `notifyURL` (optional): A notification URL that will be POSTed to whenever a
    new message (i.e. a reply to a message sent) arrives at this destination
    address. **If you are using a domain URL (e.g. http://www.example.com) for the `notifyURL` attribute, you must include a forward slash at the end to receive notifications, for example, `notifyURL: "http://www.example.com/"`.**

> :warning: If you are using a domain URL (e.g. http://www.example.com) for the `notifyURL` attribute, you must include a forward slash at the end to receive notifications, for example, `notifyURL: "http://www.example.com/"`.

For example:

```javascript
import { Numbers } from '@telstra/messaging';

const numbers = new Numbers();
numbers
    .create({
        activeDays: 1,
    })
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

### Retrieve Subscription

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/getSubscription>.

The function `numbers.get` can be used to get the current
subscription.

It takes no arguments.

For example:

```javascript
import { Numbers } from '@telstra/messaging';

const numbers = new Numbers();
numbers
    .get()
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

### Delete Subscription

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/deleteSubscription>.

The function `numbers.delete` can be used to delete the current
subscription.

```javascript
import { Numbers } from '@telstra/messaging';

const numbers = new Numbers();
numbers
    .delete({
        emptyArr: 0,
    })
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

## Message

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#tag/Messaging>.

### Send Message

For more information, please see here:

-   <https://dev.telstra.com/content/messaging-api#operation/sendSms>.
-   <https://dev.telstra.com/content/messaging-api#operation/sendMms>.

The function `message.send` can be used to send SMS or MMS.

It takes the following arguments.

-   `to`: The destination address, expected to be a phone number of the form `+614XXXXXXXX` or `04XXXXXXXX`. Accepts an array of strings to send the message to multiple recipients.
-   `body`: (conditionally mandatory) The SMS to send.
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
-   `MMSContent` (conditionally mandatory): An array of content that will be sent in an MMS message.
    If this array is present it will cause the `body` element to be ignored, and the message will be sent as an MMS. The mms content will be an object with below listed properties
    -   `type`: The supported types of the multi media messages.
    -   `filename` (optional): The file name to be associated with the content. Some devices will display this file name with a placeholder for the content.
    -   `payload`: Base64 encoded message content.
-   `subject` (optional): The subject that will be used in an MMS message. Subject is limited to maximum of
    64 characters.

> :warning: If you are using a domain URL (e.g. http://www.example.com) for the `notifyURL` attribute, you must include a forward slash at the end to receive notifications, for example, `notifyURL: "http://www.example.com/"`.

For example:

```javascript
import { Message } from '@telstra/messaging';

const message = new Message();
message
    .send({
        to: '<MOBILE_NUMBER>',
        body: 'Hello from Messaging SDK',
    })
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

### Reteieve Message Status

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/getSmsStatus>.

The function `message.status` can be used to retrieve
the status of a SMS.

It takes the following arguments.

-   `messageId`: Unique identifier for the message.

For example:

```javascript
import { Message } from '@telstra/messaging';

const message = new Message();
message
    .status(messageId)
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

### Retrieve Message Replies

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/retrieveSmsReplies>.

The function `message.getNextUnreadReply` can be used to retrieve
the next unread reply for your phone number subscription.

It takes no arguments.

For example:

```javascript
import { Message } from '@telstra/messaging';

const message = new Message();
message
    .getNextUnreadReply()
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```

### Send Bulk Messages

For more information, please see here:
<https://dev.telstra.com/content/messaging-api#operation/sendMultipleSms>.

The function `message.sendBulk` can be used to send multiple messages.

It takes the following arguments.

-   `smsMulti`: (Required) Array of objects.

-   `smsMulti.to`: (Required) Phone number (in E.164 format). This number can be in international format `to: '+61412345678` or in national format.
-   `smsMulti.body`: (Required) The text body of the message. Messages longer than 160 characters will be counted as multiple messages.
-   `smsMulti.receiptOff`: (Optional) Boolean. Whether Delivery Receipt will be sent back or not.

-   `notifyURL`: Required when `receiptOff` is missing or `receiptOff: false`.

For example:

```javascript
import { Message } from '@telstra/messaging';

const message = new Message();
message.sendBulk({
    smsMulti: [
        {
            to: '<MOBILE_NUMBER>',
            body: 'Hello from Messaging SDK',
        },
        {
            to: '<MOBILE_NUMBER>',
            body: 'Yes it works',
        },
    ],
    notifyURL: 'https://<WEBHOOK_ENDPOINT>/',
});
```

### Retrieve Message Service Healthcheck

For more information, please see here:
SMS: <https://dev.telstra.com/content/messaging-api#operation/smsHealthCheck>.
MMS: <https://dev.telstra.com/content/messaging-api#operation/mmsHealthCheck>.

The function `message.healthCheck` can be used to retrieve the sms & mms service health status.

For example:

```javascript
import { Message } from '@telstra/messaging';

const message = new Message();
message
    .healthCheck()
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.error(error);
    });
```
