# Telstra_Messaging

TelstraMessaging - JavaScript client for Telstra_Messaging
 The Telstra SMS Messaging API allows your applications to send and receive SMS text messages from Australia's leading network operator.  It also allows your application to track the delivery status of both sent and received SMS messages. 

- API version: 2.2.4
- Package version: 1.0.2

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),

Then install it via:

```shell
npm install Telstra_Messaging --save
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing 
into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

Finally, switch to the directory you want to use your Telstra_Messaging from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

You should now be able to `require('Telstra_Messaging')` in javascript files from the directory you ran the last 
command above from.

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/Telstra/MessagingAPI-SDK-node
then install it via:

```shell
    npm install Telstra/MessagingAPI-SDK-node --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file, that's to say your javascript file where you actually 
use this library):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var TelstraMessaging = require('Telstra_Messaging');

var api = new TelstraMessaging.AuthenticationApi()

var clientId = "clientId_example"; // {String} 

var clientSecret = "clientSecret_example"; // {String} 

var grantType = "client_credentials"; // {String} 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.authToken(clientId, clientSecret, grantType, callback);

```

## Documentation for API Endpoints

All URIs are relative to *https://tapi.telstra.com/v2*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*TelstraMessaging.AuthenticationApi* | [**authToken**](docs/AuthenticationApi.md#authToken) | **POST** /oauth/token | Generate authentication token
*TelstraMessaging.MessagingApi* | [**getMMSStatus**](docs/MessagingApi.md#getMMSStatus) | **GET** /messages/mms/{messageid}/status | Get MMS Status
*TelstraMessaging.MessagingApi* | [**getSMSStatus**](docs/MessagingApi.md#getSMSStatus) | **GET** /messages/sms/{messageId}/status | Get SMS Status
*TelstraMessaging.MessagingApi* | [**retrieveSMSResponses**](docs/MessagingApi.md#retrieveSMSResponses) | **GET** /messages/sms | Retrieve SMS Responses
*TelstraMessaging.MessagingApi* | [**sendMMS**](docs/MessagingApi.md#sendMMS) | **POST** /messages/mms | Send MMS
*TelstraMessaging.MessagingApi* | [**sendSMS**](docs/MessagingApi.md#sendSMS) | **POST** /messages/sms | Send SMS
*TelstraMessaging.ProvisioningApi* | [**createSubscription**](docs/ProvisioningApi.md#createSubscription) | **POST** /messages/provisioning/subscriptions | Create Subscription
*TelstraMessaging.ProvisioningApi* | [**deleteSubscription**](docs/ProvisioningApi.md#deleteSubscription) | **DELETE** /messages/provisioning/subscriptions | Delete Subscription
*TelstraMessaging.ProvisioningApi* | [**getSubscription**](docs/ProvisioningApi.md#getSubscription) | **GET** /messages/provisioning/subscriptions | Get Subscription


## Documentation for Models

 - [TelstraMessaging.DeleteNumberRequest](docs/DeleteNumberRequest.md)
 - [TelstraMessaging.ErrorError](docs/ErrorError.md)
 - [TelstraMessaging.ErrorErrorError](docs/ErrorErrorError.md)
 - [TelstraMessaging.GetSubscriptionResponse](docs/GetSubscriptionResponse.md)
 - [TelstraMessaging.InboundPollResponse](docs/InboundPollResponse.md)
 - [TelstraMessaging.MMSContent](docs/MMSContent.md)
 - [TelstraMessaging.Message](docs/Message.md)
 - [TelstraMessaging.MessageSentResponse](docs/MessageSentResponse.md)
 - [TelstraMessaging.MessageType](docs/MessageType.md)
 - [TelstraMessaging.OAuthRequest](docs/OAuthRequest.md)
 - [TelstraMessaging.OAuthResponse](docs/OAuthResponse.md)
 - [TelstraMessaging.OutboundPollResponse](docs/OutboundPollResponse.md)
 - [TelstraMessaging.ProvisionNumberRequest](docs/ProvisionNumberRequest.md)
 - [TelstraMessaging.ProvisionNumberResponse](docs/ProvisionNumberResponse.md)
 - [TelstraMessaging.SendMmsRequest](docs/SendMmsRequest.md)
 - [TelstraMessaging.SendSMSRequest](docs/SendSMSRequest.md)
 - [TelstraMessaging.Status](docs/Status.md)


## Documentation for Authorisation


### auth

- **Type**: OAuth
- **Flow**: application
- **Authorisation URL**: 
- **Scopes**: 
  - NSMS: NSMS

