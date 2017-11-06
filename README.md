# Getting started


The Telstra SMS Messaging API allows your applications to send and receive SMS text messages from Australia's leading network operator.

It also allows your application to track the delivery status of both sent and received SMS messages.


## How to Build

The generated SDK relies on [Node Package Manager](https://www.npmjs.com/) (NPM) being available to resolve dependencies. If you don't already have NPM installed, please go ahead and follow instructions to install NPM from [here](https://nodejs.org/en/download/).
The SDK also requires Node to be installed. If Node isn't already installed, please install it from [here](https://nodejs.org/en/download/)
> NPM is installed by default when Node is installed

To check if node and npm have been successfully installed, write the following commands in command prompt:

* `node --version`
* `npm -version`

Now use npm to resolve all dependencies by running the following command in the root directory (of the SDK folder):

```bash
npm install
```

This will install all dependencies in the `node_modules` folder.

Once dependencies are resolved, you will need to move the folder `TelstraMessagingAPILib ` in to your `node_modules` folder.

## Initialization

### Example
In this example, `app.js` will check if the access token has been set in the SDK. If it has been, API calls can be made. Otherwise, client has to be authorized first before making API calls.  
This example makes use of [node-localstorage](https://www.npmjs.com/package/node-localstorage) for handling data persistence.

#### `app.js`

```JavaScript
const express = require('express');
const app = express();

const PORT = 1800;

const lib = require('lib');
const oAuthManager = lib.OAuthManager;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

lib.Configuration.oAuthClientId = 'oAuthClientId'; // OAuth 2 Client ID
lib.Configuration.oAuthClientSecret = 'oAuthClientSecret'; // OAuth 2 Client Secret

const storedToken = localStorage.getItem('token');
if (storedToken !== null && storedToken !== undefined) {
    lib.Configuration.oAuthToken = storedToken;
}
lib.Configuration.oAuthTokenUpdateCallback = function(token) {
    // token is the updated access_token
    localStorage.setItem('token', token);
};

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

app.get('/', (req, res) => {
    if (oAuthManager.isTokenSet()) {
        // token is already stored in the client
        // make API calls as required
    } else {
        const scopes = [lib.OAuthScopeEnum.NSMS];
        const promise = oAuthManager.authorize(scopes);
        promise.then((success) => {
            // client authorized. API calls can be made
        }, (exception) => {
            // error occurred, exception will be of type lib/Exceptions/OAuthProviderException
        });
    }
});

```


See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

# Class Reference

## <a name="list_of_controllers"></a>List of Controllers

* [ProvisioningController](#provisioning_controller)
* [MessagingController](#messaging_controller)

## <a name="provisioning_controller"></a>![Class: ](https://apidocs.io/img/class.png ".ProvisioningController") ProvisioningController

### Get singleton instance

The singleton instance of the ``` ProvisioningController ``` class can be accessed from the API Client.

```javascript
var controller = lib.ProvisioningController;
```

### <a name="delete_subscription"></a>![Method: ](https://apidocs.io/img/method.png ".ProvisioningController.deleteSubscription") deleteSubscription

> Delete Subscription

#### Example Usage

```javascript


    controller.deleteSubscription(function(error, response, context) {

    
    });
```

See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Invalid or missing request parameters |
| 401 | Invalid or no credentials passed in the request |
| 403 | Authorization credentials passed and accepted but account does not have permission |
| 404 | The requested URI does not exist |
| 0 | An internal error occurred when processing the request |




### <a name="create_subscription"></a>![Method: ](https://apidocs.io/img/method.png ".ProvisioningController.createSubscription") createSubscription

> Create Subscription

#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | A JSON payload containing the required attributes |



#### Example Usage

```javascript

    var body = new ProvisionNumberRequest({"key":"value"});

    controller.createSubscription(body, function(error, response, context) {

    
    });
```

See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Invalid or missing request parameters |
| 401 | Invalid or no credentials passed in the request |
| 403 | Authorization credentials passed and accepted but account does not have permission |
| 404 | The requested URI does not exist |
| 0 | An internal error occurred when processing the request |




### <a name="get_subscription"></a>![Method: ](https://apidocs.io/img/method.png ".ProvisioningController.getSubscription") getSubscription

> Get Subscription

#### Example Usage

```javascript


    controller.getSubscription(function(error, response, context) {

    
    });
```

See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Invalid or missing request parameters |
| 401 | Invalid or no credentials passed in the request |
| 403 | Authorization credentials passed and accepted but account does not have permission |
| 404 | The requested URI does not exist |
| 0 | An internal error occurred when processing the request |




[Back to List of Controllers](#list_of_controllers)

## <a name="messaging_controller"></a>![Class: ](https://apidocs.io/img/class.png ".MessagingController") MessagingController

### Get singleton instance

The singleton instance of the ``` MessagingController ``` class can be accessed from the API Client.

```javascript
var controller = lib.MessagingController;
```

### <a name="create_send_sms"></a>![Method: ](https://apidocs.io/img/method.png ".MessagingController.createSendSMS") createSendSMS

> Send SMS

#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| payload |  ``` Required ```  | A JSON or XML payload containing the recipient's phone number and text message.

The recipient number should be in the format '04xxxxxxxx' where x is a digit |



#### Example Usage

```javascript

    var payload = new SendSMSRequest({"key":"value"});

    controller.createSendSMS(payload, function(error, response, context) {

    
    });
```

See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Invalid or missing request parameters |
| 401 | Invalid or no credentials passed in the request |
| 403 | Authorization credentials passed and accepted but account does<br>not have permission |
| 404 | The requested URI does not exist |
| 405 | The requested resource does not support the supplied verb |
| 415 | API does not support the requested content type |
| 422 | The request is formed correctly, but due to some condition<br>the request cannot be processed e.g. email is required and it is not provided<br>in the request |
| 501 | The HTTP method being used has not yet been implemented for<br>the requested resource |
| 503 | The service requested is currently unavailable |
| 0 | An internal error occurred when processing the request |




### <a name="get_sms_status"></a>![Method: ](https://apidocs.io/img/method.png ".MessagingController.getSMSStatus") getSMSStatus

> Get SMS Status

#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| messageId |  ``` Required ```  | Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/sms |



#### Example Usage

```javascript

    var messageId = 'messageId';

    controller.getSMSStatus(messageId, function(error, response, context) {

    
    });
```

See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Invalid or missing request parameters |
| 401 | Invalid or no credentials passed in the request |
| 403 | Authorization credentials passed and accepted but account does<br>not have permission |
| 404 | The requested URI does not exist |
| 405 | The requested resource does not support the supplied verb |
| 415 | API does not support the requested content type |
| 422 | The request is formed correctly, but due to some condition<br>the request cannot be processed e.g. email is required and it is not provided<br>in the request |
| 501 | The HTTP method being used has not yet been implemented for<br>the requested resource |
| 503 | The service requested is currently unavailable |
| 0 | An internal error occurred when processing the request |




### <a name="create_send_mms"></a>![Method: ](https://apidocs.io/img/method.png ".MessagingController.createSendMMS") createSendMMS

> Send MMS

#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | A JSON or XML payload containing the recipient's phone number
and MMS message.The recipient number should be in the format '04xxxxxxxx'
where x is a digit |



#### Example Usage

```javascript

    var body = new SendMMSRequest({"key":"value"});

    controller.createSendMMS(body, function(error, response, context) {

    
    });
```

See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Invalid or missing request parameters |
| 401 | Invalid or no credentials passed in the request |
| 403 | Authorization credentials passed and accepted but account does<br>not have permission |
| 404 | The requested URI does not exist |
| 405 | The requested resource does not support the supplied verb |
| 415 | API does not support the requested content type |
| 422 | The request is formed correctly, but due to some condition<br>the request cannot be processed e.g. email is required and it is not provided<br>in the request |
| 501 | The HTTP method being used has not yet been implemented for<br>the requested resource |
| 503 | The service requested is currently unavailable |
| 0 | An internal error occurred when processing the request |




### <a name="get_mms_status"></a>![Method: ](https://apidocs.io/img/method.png ".MessagingController.getMMSStatus") getMMSStatus

> Get MMS Status


#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| messageid |  ``` Required ```  | Unique identifier of a message - it is the value returned from
a previous POST call to https://api.telstra.com/v2/messages/mms |

#### Example Usage

```javascript

    var messageid = 'messageid';

    controller.getMMSStatus(messageid, function(error, response, context) {

    
    });
```

See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Invalid or missing request parameters |
| 401 | Invalid or no credentials passed in the request |
| 403 | Authorization credentials passed and accepted but account does<br>not have permission |
| 404 | The requested URI does not exist |
| 405 | The requested resource does not support the supplied verb |
| 415 | API does not support the requested content type |
| 422 | The request is formed correctly, but due to some condition<br>the request cannot be processed e.g. email is required and it is not provided<br>in the request |
| 501 | The HTTP method being used has not yet been implemented for<br>the requested resource |
| 503 | The service requested is currently unavailable |
| 0 | An internal error occurred when processing the request |




### <a name="retrieve_sms_responses"></a>![Method: ](https://apidocs.io/img/method.png ".MessagingController.retrieveSMSResponses") retrieveSMSResponses

> Retrieve SMS Responses

#### Example Usage

```javascript


    controller.retrieveSMSResponses(function(error, response, context) {

    
    });
```

See the documentation at [Dev.Telstra.com](https://dev.telstra.com/content/messaging-api) for more information

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Invalid or missing request parameters |
| 401 | Invalid or no credentials passed in the request |
| 403 | Authorization credentials passed and accepted but account does<br>not have permission |
| 404 | The requested URI does not exist |
| 405 | The requested resource does not support the supplied verb |
| 415 | API does not support the requested content type |
| 422 | The request is formed correctly, but due to some condition<br>the request cannot be processed e.g. email is required and it is not provided<br>in the request |
| 501 | The HTTP method being used has not yet been implemented for<br>the requested resource |
| 503 | The service requested is currently unavailable |
| 0 | An internal error occurred when processing the request |




[Back to List of Controllers](#list_of_controllers)



