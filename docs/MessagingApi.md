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
> [OutboundPollResponse] getMMSStatus(messageid)

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

[**[OutboundPollResponse]**](OutboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getSMSStatus"></a>
# **getSMSStatus**
> [OutboundPollResponse] getSMSStatus(messageId)

Get SMS Status

If no notification URL has been specified, it is possible to poll for the message status. &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;  #!/bin/bash   #!/bin/bash   # Example of how to poll for a message status   AccessToken&#x3D;\&quot;Consumer Access Token\&quot;   MessageId&#x3D;\&quot;Previous supplied Message Id, URL encoded\&quot;   curl -X get -H \&quot;Authorization: Bearer $AccessToken\&quot; \\     -H \&quot;Content-Type: application/json\&quot; \\     \&quot;https://tapi.telstra.com/v2/messages/sms/$MessageId\&quot; &lt;/code&gt;&lt;/pre&gt;  Note that the &#x60;MessageId&#x60; that appears in the URL must be URL encoded, just copying the &#x60;MessageId&#x60; as it was supplied when submitting the message may not work.

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.MessagingApi();

var messageId = "messageId_example"; // String | Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/sms.


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
 **messageId** | **String**| Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/sms. | 

### Return type

[**[OutboundPollResponse]**](OutboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="retrieveSMSResponses"></a>
# **retrieveSMSResponses**
> InboundPollResponse retrieveSMSResponses()

Retrieve SMS Responses

Messages are retrieved one at a time, starting with the earliest response. The API supports the encoding of the full range of emojis in the reply message. The emojis will be in their UTF-8 format. If the subscription has a &#x60;notifyURL&#x60;, response messages will be logged there instead.

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

[**InboundPollResponse**](InboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="sendMMS"></a>
# **sendMMS**
> MessageSentResponse sendMMS(body)

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

[**MessageSentResponse**](MessageSentResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="sendSMS"></a>
# **sendSMS**
> MessageSentResponse sendSMS(payload)

Send SMS

Send an SMS Message to a single or multiple mobile number/s.  &lt;h3&gt;Send message to a single number: &lt;/h3&gt; &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;  #!/bin/bash   # Use the Messaging API-v2 to send an SMS   # Note: only to: and body: are required   AccessToken&#x3D;\&quot;Access Token\&quot;   Dest&#x3D;\&quot;Destination number\&quot;   curl -X POST -H \&quot;Authorization: Bearer $AccessToken\&quot; -H \&quot;Content-Type: application/json\&quot; -d \&quot;{     \\\&quot;to\\\&quot;:\\\&quot;$Dest\\\&quot;,     \\\&quot;body\\\&quot;:\\\&quot;Test Message\\\&quot;,     \\\&quot;from\\\&quot;: \\\&quot;+61412345678\\\&quot;,     \\\&quot;validity\\\&quot;: 5,     \\\&quot;scheduledDelivery\\\&quot;: 1,     \\\&quot;notifyURL\\\&quot;: \\\&quot;\\\&quot;,     \\\&quot;replyRequest\\\&quot;: false     \\\&quot;priority\\\&quot;: true   }\&quot; \&quot;https://tapi.telstra.com/v2/messages/sms\&quot; &lt;/code&gt;&lt;/pre&gt;  \\ &lt;h3&gt;Send message to multiple numbers: &lt;/h3&gt; &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt; #!/bin/bash   # Use the Messaging API to send an SMS   AccessToken&#x3D;\&quot;Access Token\&quot;   Dest&#x3D;\&quot;Destination number\&quot;   curl -X post -H \&quot;Authorization: Bearer $AccessToken\&quot; \\     -H \&quot;Content-Type: application/json\&quot; \\     -d &#39;{ \&quot;to\&quot;:\&quot;$dest1, $dest2, $dest3\&quot;, \&quot;body\&quot;:\&quot;Test Message\&quot; }&#39; \\     https://tapi.telstra.com/v2/messages/sms   &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.MessagingApi();

var payload = new TelstraMessaging.SendSMSRequest(); // SendSMSRequest | A JSON or XML payload containing the recipient's phone number and text message.  This number can be in international format if preceeded by a â€˜+â€™ or in national format ('04xxxxxxxx') where x is a digit.


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
 **payload** | [**SendSMSRequest**](SendSMSRequest.md)| A JSON or XML payload containing the recipient&#39;s phone number and text message.  This number can be in international format if preceeded by a â€˜+â€™ or in national format (&#39;04xxxxxxxx&#39;) where x is a digit. | 

### Return type

[**MessageSentResponse**](MessageSentResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

