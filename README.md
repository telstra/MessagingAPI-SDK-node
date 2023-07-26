# Telstra Messaging

The SDK for the Telstra Messaging API enables you to send and receive messages
to Australian mobile numbers. For more information about this product, please
see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverview?version=3.x>

> :warning: **This SDK is experimental, everything is subject to change**

## Installing

```bash
npm i -s @telstra/messaging
```

## Getting Started

Set the `TELSTRA_CLIENT_ID` and `TELSTRA_CLIENT_SECRET` environment variables.

You can find the `Client id` and `Client secret` here: <https://dev.telstra.com/user/me/apps>.

### Getting started using CJS (CommonJS)

```javascript
/** Using CommonJS */
var { Messages } = require('@telstra/messaging');

const messages = new Messages();
messages
    .send({
        to: '<MOBILE_NUMBER>',
        from: 'private',
        messageContent: 'Hello from Messaging SDK!',
    })
    .then(result => {
        console.log(result);
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

const messages = new Messages();
messages
    .send({
        to: '<MOBILE_NUMBER>',
        from: 'private',
        messageContent: 'Hello from Messaging SDK!',
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });
```

## Authentication

Authentication through environment variables, a shared credentials file and json file import are supported.

### Environment variables

Export the following two environment variables, replacing the values with your own credentials.

```shell
export TELSTRA_CLIENT_ID="<CLIENT_ID>"
export TELSTRA_CLIENT_SECRET="<CLIENT_SECRET>"
```

### Shared credentials

Create a `~/.telstra/credentials` file in your home path with the following contents, replacing the values with your own credentials.

```markdown
[default]
TELSTRA_CLIENT_ID = <CLIENT_ID>
TELSTRA_CLIENT_SECRET = <CLIENT_SECRET>
```

### JSON file import

Create a `json` file in your project path with the following contents, replacing the values with your own credentials.

```json
{
    "TELSTRA_CLIENT_ID": "<CLIENT_ID>",
    "TELSTRA_CLIENT_SECRET": "<CLIENT_SECRET>"
}
```

Then `import` the `json` file into your project source.

```typescript
import { Message } from '@telstra/messaging';
import AUTH_CONFIG from './credentials.json';

const messages = new Messages(AUTH_CONFIG);
```

This should be done before any interactions requiring authentication, such as
sending a SMS.

## Free Trial

Telstra offers a free trial for the messaging API to help you evaluate whether
it meets your needs. There are some restrictions that apply compared to the
full API, including a maximum number of messages that can be sent and requiring the
registration of a limited number of destinations before a message can be sent to that
destination. For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FreeTrial>.

### Registering Free Trial Numbers

> :information_source: **Only required for the free trial accounts**

Register destinations for the free trial. For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#RegisteraFreeTrialNumber>.

The function `freeTrialNumbers.create` can be used to register destinations.

It takes an object with following properties as argument:

-   `freeTrialNumbers`: A list of destinations, expected to be phone numbers of the form `04XXXXXXXX`.

It returns the list of phone numbers that have been registered.

For example:

```javascript
import { FreeTrialNumbers } from '@telstra/messaging';

const freeTrialNumbers = new FreeTrialNumbers();
const params: TFreeTrialNumbers = {
    freeTrialNumbers: ['0412345678', '0412345679'],
};

freeTrialNumbers
    .create(params)
    .then(result => {
        console.log('SUCCESS:freeTrialNumbers:create:', result);
    })
    .catch(error => {
        console.error('ERROR:freeTrialNumber:create:', error);
    });
```

### Fetch all Free Trial Numbers

> :information_source: **Only required for the free trial**

Fetch the Free Trial Number(s) currently assigned to your account. For more information,
please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FetchyourFreeTrialNumbers>.

The function `freeTrialNumbers.getAll` can be used to retrieve registered destinations.

It takes no arguments.

It returns the list of phone numbers that have been registered.

For example:

```javascript
import { FreeTrialNumbers } from '@telstra/messaging';

const freeTrialNumbers = new FreeTrialNumbers();

freeTrialNumbers
    .getAll()
    .then(result => console.log('SUCCESS:freeTrialNumbers:getAll:', result))
    .catch(error => console.error('ERROR:freeTrialNumber:getAll:', error));
```

## Virtual Number

Gives you a dedicated mobile number tied to an application which
enables you to receive replies from your customers. For more information,
please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#VirtualNumbers>.

### Assign Virtual Number

When a recipient receives your message, you can choose whether they'll see a privateNumber,
Virtual Number or senderName (paid plans only) in the from field.
If you want to use a Virtual Number, use this function to assign one.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#AssignaVirtualNumber>.

The function `virtualNumbers.assign` can be used to create a subscription.

It takes a object with following properties as argument:

-   `replyCallbackUrl` (optional): The URL that replies to the Virtual Number will be posted to.
-   `tags` (optional): Create your own tags and use them to fetch, sort and report on your Virtual Numbers through our other endpoints.
    You can assign up to 10 tags per number.

It returns an object with the following properties:

-   `virtualNumber`: The Virtual Number assigned to your account.
-   `lastUse`: The last time the Virtual Number was used to send a message.
-   `replyCallbackUrl`: The URL that replies to the Virtual Number will be posted to.
-   `tags`: Any customisable tags assigned to the Virtual Number.

For example:

```javascript
import { VirtualNumbers } from '@telstra/messaging';

const virtualNumbers = new VirtualNumbers();

virtualNumbers
    .assign()
    .then(result => console.log('SUCCESS:number:create:', result))
    .catch(error => console.error('ERROR:number:create:', error));
```

### Fetch a Virtual Number

Fetch the tags, replyCallbackUrl and lastUse date for a Virtual Number.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FetchaVirtualNumber>.

The function `virtualNumbers.get` can be used to get the details of a Virtual Number.

It takes the following arguments:

-   `virtualNumber`: The Virtual Number assigned to your account.

It returns an object with the following properties:

-   `virtualNumber`: The Virtual Number assigned to your account.
-   `lastUse`: The last time the Virtual Number was used to send a message.
-   `replyCallbackUrl`: The URL that replies to the Virtual Number will be posted to.
-   `tags`: Any customisable tags assigned to the Virtual Number.

For example:

```javascript
import { VirtualNumbers } from '@telstra/messaging';

const virtualNumbers = new VirtualNumbers();

virtualNumbers
    .get('<VIRTUAL_NUMBER>')
    .then(getVNResponse =>
        console.log('SUCCESS:virtualNumber:get:', getVNResponse)
    )
    .catch(getVNError =>
        console.error('ERROR:virtualNumbers:get:', getVNError)
    );
```

### Fetch all Virtual Numbers

Fetch all Virtual Numbers currently assigned to your account.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FetchallVirtualNumbers>.

The function `virtualNumbers.getAll` can be used to get the all virtual numbers associated to your account.

It takes an object with following prperties as argument:

-   `limit` (optional): Tell us how many results you want us to return, up to a maximum of 50.
-   `offset` (optional): Use the offset to navigate between the response results. An offset of 0 will display the first page of results, and so on.
-   `filter` (optional): Filter your Virtual Numbers by tag or by number.

It returns an object with the following properties:

-   `virtualNumbers`: A list of Virtual Numbers assigned to your account.
-   `paging`: Paging information.

For example:

```javascript
import { VirtualNumbers } from '@telstra/messaging';

const virtualNumbers = new VirtualNumbers();

virtualNumbers
    .getAll()
    .then(result => console.log('SUCCESS:virtualNumber:getAll:', result))
    .catch(error => console.error('ERROR:virtualNumbers:getAll:', error));
```

### Update a Virtual Number

Update a virtual number attributes. For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#UpdateaVirtualNumber>.

The function `virtualNumbers.update` can be used to update a virtual number.

It takes an object with following properties as argument:

-   `virtualNumber`: The Virtual Number assigned to your account.
-   `updateData` (optional):
    -   `reply_callback_url` (optional): The URL that replies to the Virtual Number will be posted to.
    -   `tags` (optional): Create your own tags and use them to fetch, sort and report on your Virtual Numbers through our other endpoints.
        You can assign up to 10 tags per number.

It returns an object with the following properties:

-   `virtualNumber`: The Virtual Number assigned to your account.
-   `lastUse`: The last time the Virtual Number was used to send a message.
-   `replyCallbackUrl`: The URL that replies to the Virtual Number will be posted to.
-   `tags`: Any customisable tags assigned to the Virtual Number.

For example:

```javascript
import { VirtualNumbers } from '@telstra/messaging';
import { TUpdateVirtualNumberRequest } from '../dist/messaging/types';

const virtualNumbers = new VirtualNumbers();
const updateParams: TUpdateVirtualNumberRequest = {
    virtualNumber,
    updateData: { tags: ['V3'] },
};
virtualNumbers
    .update(updateParams)
    .then(result => console.log('SUCCESS:virtualNumber:update:', result))
    .catch(error => console.error('ERROR:virtualNumbers:update:', error));
```

### Delete Virtual Number

Delete the a virtual number. For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#DeleteaVirtualNumber>.

The function `virtualNumbers.get` can be used to unassign a Virtual Number.

It takes the following arguments:

-   `virtualNumber`: The Virtual Number assigned to your account.

It returns nothing.

For example:

```javascript
import { VirtualNumbers } from '@telstra/messaging';

const virtualNumbers = new VirtualNumbers();

virtualNumbers
    .delete('<VIRTUAL_NUMBER>')
    .then(result => console.log('SUCCESS:virtualNumber:delete:', result))
    .catch(error => console.error('ERROR:virtualNumbers:delete:', error));
```

## Message

Send and receive messages. For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Messages>.

### Send Message

Send a message to a mobile number, or to multiple mobile numbers.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#SendanSMSorMMS>.

The function `messages.send` can be used to send a message.

It takes an object with following properties as argument:

-   `to`: The destination address, expected to be a phone number of the form `+614XXXXXXXX` or `04XXXXXXXX`.
-   `from`: This will be either "privateNumber", one of your Virtual Numbers or your senderName.
-   `messageContent` (Either one of messageContent or multimedia is required): The content of the message.
-   `multimedia` (Either one of messageContent or multimedia is required): MMS multimedia content.
-   `retryTimeout` (optional): How many minutes you asked the server to keep trying to send the message.
-   `scheduleSend` (optional): The time (in Central Standard Time) the message is scheduled to send.
-   `deliveryNotification` (optional): If set to true, you will receive a notification to the statusCallbackUrl when your
    SMS or MMS is delivered (paid feature).
-   `statusCallbackUrl` (optional): The URL the API will call when the status of the message changes.
-   `tags` (optional): Any customisable tags assigned to the message.

The type `TMultimedia`can be used to build an mms payload. It has following properties:

-   `type`: The content type of the attachment, for example <TMultimediaContentType.IMAGE_GIF>.
-   `fileName` (optional): Optional field, for example `image.png`.
-   `payload`: The payload of an mms encoded as base64.

It returns an object with the following properties:

-   `messageId`: Use this UUID with our other endpoints to fetch, update or delete the message.
-   `status`: The status will be either queued, sent, delivered or expired.
-   `to`: The recipient's mobile number(s).
-   `from`: This will be either "privateNumber", one of your Virtual Numbers or your senderName.
-   `messageContent`: The content of the message.
-   `multimedia`: The multimedia content of the message (MMS only).
-   `retryTimeout`: How many minutes you asked the server to keep trying to send the message.
-   `scheduleSend`: The time (in Central Standard Time) a message is scheduled to send.
-   `deliveryNotification`: If set to true, you will receive a notification to the
    statusCallbackUrl when your SMS or MMS is delivered (paid feature).
-   `statusCallbackUrl`: The URL the API will call when the status of the message changes.
-   `tags`: Any customisable tags assigned to the message.

For example:

```javascript
import { Messages } from '@telstra/messaging';
import { TMultimediaContentType } from '../dist/messaging/types/MessageTypes.js';

const messages = new Messages();

/** Send an SMS */
message
    .send({
        to: '<MOBILE_NUMBER>',
        from: 'private',
        messageContent: 'Hello from Messaging SDK!',
    })
    .then(result => console.log('SUCCESS:messages:send:sms:', result))
    .catch(error => console.error('ERROR:messages:send:sms:', error));

/** Send an MMS */
messages
    .send({
        to: '<MOBILE_NUMBER>',
        from: 'private',
        messageContent: 'Hello from Messaging SDK!',
        multimedia: [
            {
                type: TMultimediaContentType.IMAGE_GIF,
                fileName: 'bus.gif',
                payload:
                    'R0lGODlhPQBEAPeoAJosM....hIB94v/wRoRKQWGRHgrhGSQJxCS+0pCZbEhAAOw==',
            },
        ],
    })
    .then(result => console.log('SUCCESS:message:send:mms', result))
    .catch(error => console.error('ERROR:message:send:mms', error));
```

### Get a Message

Use the messageId to fetch a message that's been sent from/to
your account within the last 30 days.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Fetchamessage>.

The function `messages.get` can be used to retrieve the a message.

It takes the following arguments:

-   `messageId`: Unique identifier for the message.

It returns an object with the following properties:

-   `messageId`: Use this UUID with our other endpoints to fetch, update or delete the message.
-   `status`: The status will be either queued, sent, delivered or expired.
-   `createTimestamp`: The time you submitted the message to the queue for sending.
-   `sentTimestamp`: The time the message was sent from the server.
-   `receivedTimestamp`: The time the message was received by the recipient's device.
-   `to`: The recipient's mobile number(s).
-   `from`: This will be either "privateNumber", one of your Virtual Numbers or your senderName.
-   `messageContent`: The content of the message.
-   `multimedia`: The multimedia content of the message (MMS only).
-   `direction`: Direction of the message (outgoing or incoming).
-   `retryTimeout`: How many minutes you asked the server to keep trying to send the message.
-   `scheduleSend`: The time (in Central Standard Time) the message is scheduled to send.
-   `deliveryNotification`: If set to true, you will receive a notification to the statusCallbackUrl when your SMS or MMS
    is delivered (paid feature).
-   `statusCallbackUrl`: The URL the API will call when the status of the message changes.
-   `queuePriority`: The priority assigned to the message.
-   `tags`: Any customisable tags assigned to the message.

For example:

```javascript
import { Messages } from '@telstra/messaging';

const message = new Messages();

message
    .get('<MESSAGE_ID>')
    .then(result => console.log('SUCCESS:messages:get:', result))
    .catch(error => console.error('ERROR:messages:get:', error));
```

### Get all Messages

Fetch messages that have been sent from/to your account in the last 30 days.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Fetchallsent/receivedmessages>.

The function `messages.getAll` can be used to fetch all messages.

It takes an object with following properties as argument:

-   `limit` (optional): Tell us how many results you want us to return, up to a maximum of 50.
-   `offset` (optional): Use the offset to navigate between the response results. An offset of 0 will display the first page of results, and so on.
-   `filter` (optional): Filter your Virtual Numbers by tag or by number.

It returns an object with the following properties:

-   `messages`: List of all messages.
-   `paging`: Paging information.

For example:

```javascript
import { Messages } from '@telstra/messaging';

const messages = new Messages();

messages
    .getAll()
    .then(result => console.log('SUCCESS:messages:getAll:', result))
    .catch(error => console.error('ERROR:messages:getAll:', error));
```

### Update a Message

Update a message that's scheduled for sending, you can change any of
the below parameters, as long as the message hasn't been sent yet.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Updateamessage>.

The function `messages.send` can be used to send a message.

It takes an object with following properties as argument:

-   `messageId`: Use this UUID with our other endpoints to fetch, update or delete the message.
-   `to`: The destination address, expected to be a phone number of the form `+614XXXXXXXX` or `04XXXXXXXX`.
-   `from`: This will be either "privateNumber", one of your Virtual Numbers or your senderName.
-   `messageContent` (Either one of messageContent or multimedia is required): The content of the message.
-   `multimedia` (Either one of messageContent or multimedia is required): MMS multimedia content.
-   `retryTimeout` (optional): How many minutes you asked the server to keep trying to send the message.
-   `scheduleSend` (optional): The time (in Central Standard Time) the message is scheduled to send.
-   `deliveryNotification` (optional): If set to true, you will receive a notification to the statusCallbackUrl when your
    SMS or MMS is delivered (paid feature).
-   `statusCallbackUrl` (optional): The URL the API will call when the status of the message changes.
-   `tags` (optional): Any customisable tags assigned to the message.

The type `TMultimedia`can be used to build an mms payload. It has following properties:

-   `type`: The content type of the attachment, for example <TMultimediaContentType.IMAGE_GIF>.
-   `fileName` (optional): Optional field, for example `image.png`.
-   `payload`: The payload of an mms encoded as base64.

The dataclass `telstra.messaging.message.Multimedia` can be used to build
a mms payload. It takes the following arguments:

-   `type`: The content type of the attachment, for example `image/png`.
-   `filename` (optional): Optional field, for example `image.png`.
-   `payload`: The payload of an mms encoded as base64.

It returns an object with the following properties:

-   `messageId`: Use this UUID with our other endpoints to fetch, update or delete the message.
-   `status`: The status will be either queued, sent, delivered or expired.
-   `to`: The recipient's mobile number(s).
-   `from`: This will be either "privateNumber", one of your Virtual Numbers or your senderName.
-   `messageContent`: The content of the message.
-   `multimedia`: The multimedia content of the message (MMS only).
-   `retryTimeout`: How many minutes you asked the server to keep trying to send the message.
-   `scheduleSend`: The time (in Central Standard Time) a message is scheduled to send.
-   `deliveryNotification`: If set to true, you will receive a notification to the
    statusCallbackUrl when your SMS or MMS is delivered (paid feature).
-   `statusCallbackUrl`: The URL the API will call when the status of the message changes.
-   `tags`: Any customisable tags assigned to the message.

For example:

```javascript
import { Messages } from '@telstra/messaging';

const messages = new Messages();

/** Send an SMS */
message
    .update({
        messageId: '<MESSAGE_ID>',
        to: '<MOBILE_NUMBER>',
        from: 'private',
        messageContent: 'Namaste from Messaging SDK!',
    })
    .then(result => console.log('SUCCESS:messages:update:sms:', result))
    .catch(error => console.error('ERROR:messages:update:sms:', error));
```

### Update Message Tags

Update message tags, you can update them even after your message has been delivered.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Updatemessagetags>.

The function `messages.updateTags` can be used to update message tags.

It takes the following arguments:

-   `messageId`: Unique identifier for the message.
-   `tags` (optional): Any customisable tags assigned to the message.

It returns nothing.

For example:

```javascript
import { Messages } from '@telstra/messaging';

const messages = new Messages();

message
    .updateTags({
        messageId: '<MESSAGE_ID>',
        tags: ['Python', 'V3'],
    })
    .then(result => console.log('SUCCESS:messages:updateTags:', result))
    .catch(error => console.error('ERROR:messages:updateTags:', error));
```

### Delete a Message

Delete a scheduled message, but hasn't yet sent.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Deleteamessage>.

The function `messages.delete` can be used to delete a message.

It takes the following arguments:

-   `messageId`: Unique identifier for the message.

It returns nothing.

For example:

```javascript
import { Messages } from '@telstra/messaging';

const message = new Messages();

message
    .delete('<MESSAGE_ID>')
    .then(result => console.log('SUCCESS:messages:delete:', result))
    .catch(error => console.error('ERROR:messages:delete:', error));
```

## Reports

Create and fetch reports. For more information, please see here:
<https://dev.telstra.com/content/messaging-api-v3#tag/reports>.

### Request a Messages Report

Request a CSV report of messages (both incoming and outgoing)
that have been sent to/from your account within the last three months.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Submitarequestforamessagesreport>.

The function `reports.create` can be used to create a report.

It takes the following arguments:

-   `startDate`: Set the time period you want to generate a report for by typing the start date (inclusive) here.
    Note that we only retain data for three months, so please ensure your startDate is not more than three months old.
    Use ISO format(yyyy-mm-dd), e.g. "2019-08-24".
-   `endDate`: Type the end date (inclusive) of your reporting period here.
    Your endDate must be a date in the past, and less than three months from your startDate.
    Use ISO format(yyyy-mm-dd), e.g. "2019-08-24".
-   `reportCallbackUrl` (optional): The callbackUrl where notification is sent when report is ready for download.
-   `filter` (optional): Filter report messages by:
    tag - use one of the tags assigned to your message(s)
    number - either the Virtual Number used to send the message,
    or the Recipient Number the message was sent to.

It returns an object with the following properties:

-   `reportId`: Use this UUID with our other endpoints to fetch the report.
-   `reportCallbackUrl`: If you provided a reportCallbackUrl in your request, it will be returned here.
-   `reportStatus`: The status of the report. It will be either:
    -   queued – the report is in the queue for generation.
    -   completed – the report is ready for download.
    -   failed – the report failed to generate, please try again.

For example:

```javascript
import { Reports } from '@telstra/messaging';
import { TCreateReport } from '@telstra/messaging/types';

const params: TCreateReport = {
    startDate: '<YYYY-mm-DD>',
    endDate: '<YYYY-mm-DD>',
};
reports
    .create(params)
    .then(result => console.log('SUCCESS:reports:create:', result))
    .catch(error => console.error('ERROR:reports:create:', error));
```

### Request a Daily Summary Report

Request a CSV report daily summary of messages (both incoming and outgoing)
that have been sent to/from your account within the last three months.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Submitarequestforamessagesreport>.

The function `reports.createDailySummary` can be used to create a report.

It takes the following arguments:

-   `startDate`: Set the time period you want to generate a report for by typing the start date (inclusive) here.
    Note that we only retain data for three months, so please ensure your startDate is not more than three months old.
    Use ISO format(yyyy-mm-dd), e.g. "2019-08-24".
-   `endDate`: Type the end date (inclusive) of your reporting period here.
    Your endDate must be a date in the past, and less than three months from your startDate.
    Use ISO format(yyyy-mm-dd), e.g. "2019-08-24".
-   `reportCallbackUrl` (optional): The callbackUrl where notification is sent when report is ready for download.
-   `filter` (optional): Filter report messages by:
    tag - use one of the tags assigned to your message(s)
    number - either the Virtual Number used to send the message,
    or the Recipient Number the message was sent to.

It returns an object with the following properties:

-   `reportId`: Use this UUID with our other endpoints to fetch the report.
-   `reportCallbackUrl`: If you provided a reportCallbackUrl in your request, it will be returned here.
-   `reportStatus`: The status of the report. It will be either:
    -   queued – the report is in the queue for generation.
    -   completed – the report is ready for download.
    -   failed – the report failed to generate, please try again.

For example:

```javascript
import { Reports } from '@telstra/messaging';
import { TCreateReport } from '@telstra/messaging/types';

const params: TCreateReport = {
    startDate: '<YYYY-mm-DD>',
    endDate: '<YYYY-mm-DD>',
};
reports
    .createDailySummary(params)
    .then(result => console.log('SUCCESS:reports:createDailySummary:', result))
    .catch(error => console.error('ERROR:reports:createDailySummary:', error));
```

### Fetch a specific report

Use the report_id to fetch a download link for a report generated.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#FetchaReport>.

The function `reports.get` can be used to retrieve
the a report download link. It takes the following arguments:

-   `reportId`: Unique identifier for the report.

It returns an object with the following properties:

-   `reportId`: Use this UUID with our other endpoints to fetch the report.
-   `reportStatus`: The status of the report.
-   `reportUrl`: Download link to download the CSV file.

For example:

```javascript
import { Reports } from '@telstra/messaging';

const reports = new Reports();

reports
    .get('<REPORT_ID>')
    .then(result => console.log('SUCCESS:reports:get:', result))
    .catch(error => console.error('ERROR:reports:get:', error));
```

### Fetch all reports

Fetch details of all reports recently generated for your account.
Use it to check the status of a report, plus fetch the report ID,
status, report type and expiry date.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#Fetchallreports>.

The function `reports.getAll` can be used to fetch all reports.

It doesn't take any arguments.

It returns a list of objects with the following properties:

-   `reportId`: Use this UUID with our other endpoints to fetch the report.
-   `reportStatus`: The status of the report.
-   `reportType`: The type of report generated.
-   `reportExpiry`: The expiry date of your report. After this date, you will be unable to download your report.

For example:

```javascript
import { Reports } from '@telstra/messaging';

const reports = new Reports();

reports
    .getAll()
    .then(result => console.log('SUCCESS:reports:getAll:', result))
    .catch(error => console.error('ERROR:reports:getAll:', error));
```

## Health Check

### Get operational status of the messaging service

Check the operational status of the messaging service.
For more information, please see here:
<https://dev.telstra.com/docs/messaging-api/apiReference/apiReferenceOverviewEndpoints?version=3.x#HealthCheck>.

The function `healthCheck.get` can be used to get the status.

It takes no arguments.

It returns an object with following properties:

-   `status`: Denotes the status of the services Up/Down.

For example:

```javascript
import { HealthCheck } from '@telstra/messaging';

const healthCheck = new HealthCheck();

healthCheck
    .getAll()
    .then(result => console.log('SUCCESS:healthCheck:get:', result))
    .catch(error => console.error('ERROR:healthCheck:get:', error));
```
