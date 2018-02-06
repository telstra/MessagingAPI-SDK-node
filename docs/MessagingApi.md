# TelstraMessaging.MessagingApi

All URIs are relative to *https://tapi.telstra.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getMMSStatus**](MessagingApi.md#getMMSStatus) | **GET** /messages/mms/{messageid}/status | Get MMS Status
[**getSMSStatus**](MessagingApi.md#getSMSStatus) | **GET** /messages/sms/{messageId}/status | Get SMS Status
[**retrieveSMSResponses**](MessagingApi.md#retrieveSMSResponses) | **GET** /messages/sms | Retrieve SMS Responses
[**sendMMS**](MessagingApi.md#sendMMS) | **POST** /messages/mms | Send MMS
[**sendSMS**](MessagingApi.md#sendSMS) | **POST** /messages/sms | Send SMS


<a name="getMMSStatus"></a>
# **getMMSStatus**
> OutboundPollResponse getMMSStatus(messageid)

Get MMS Status

Get MMS Status

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.MessagingApi();

var messageid = "messageid_example"; // String | Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/mms


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getMMSStatus(messageid, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **messageid** | **String**| Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/mms | 

### Return type

[**OutboundPollResponse**](OutboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getSMSStatus"></a>
# **getSMSStatus**
> OutboundPollResponse getSMSStatus(messageId)

Get SMS Status

Get Message Status

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.MessagingApi();

var messageId = "messageId_example"; // String | Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/sms


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getSMSStatus(messageId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **messageId** | **String**| Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/sms | 

### Return type

[**OutboundPollResponse**](OutboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="retrieveSMSResponses"></a>
# **retrieveSMSResponses**
> [InboundPollResponse] retrieveSMSResponses()

Retrieve SMS Responses

Retrieve Messages

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.MessagingApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.retrieveSMSResponses(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[InboundPollResponse]**](InboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="sendMMS"></a>
# **sendMMS**
> Object sendMMS(body)

Send MMS

Send MMS

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.MessagingApi();

var body = new TelstraMessaging.SendMmsRequest(); // SendMmsRequest | A JSON or XML payload containing the recipient's phone number and MMS message.The recipient number should be in the format '04xxxxxxxx' where x is a digit


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.sendMMS(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SendMmsRequest**](SendMmsRequest.md)| A JSON or XML payload containing the recipient&#39;s phone number and MMS message.The recipient number should be in the format &#39;04xxxxxxxx&#39; where x is a digit | 

### Return type

**Object**

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="sendSMS"></a>
# **sendSMS**
> MessageSentResponse sendSMS(payload)

Send SMS

Send Message

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.MessagingApi();

var payload = new TelstraMessaging.SendSMSRequest(); // SendSMSRequest | A JSON or XML payload containing the recipient's phone number and text message. The recipient number should be in the format '04xxxxxxxx' where x is a digit


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.sendSMS(payload, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **payload** | [**SendSMSRequest**](SendSMSRequest.md)| A JSON or XML payload containing the recipient&#39;s phone number and text message. The recipient number should be in the format &#39;04xxxxxxxx&#39; where x is a digit | 

### Return type

[**MessageSentResponse**](MessageSentResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

