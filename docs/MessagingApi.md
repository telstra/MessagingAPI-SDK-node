# TelstraMessaging.MessagingApi

All URIs are relative to *https://tapi.telstra.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getMMSStatus**](MessagingApi.md#getMMSStatus) | **GET** /messages/mms/{messageid}/status | Get MMS Status
[**getSMSStatus**](MessagingApi.md#getSMSStatus) | **GET** /messages/sms/{messageId}/status | Get SMS Status
[**retrieveMMSResponses**](MessagingApi.md#retrieveMMSResponses) | **GET** /messages/mms | Retrieve MMS Responses
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
 **messageid** | **String**| Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/mms  | 

### Return type

[**[OutboundPollResponse]**](OutboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getSMSStatus"></a>
# **getSMSStatus**
> [OutboundPollResponse] getSMSStatus(messageId)

Get SMS Status

If no notification URL has been specified, it is possible to poll for the message status. Note that the &#x60;MessageId&#x60; that appears in the URL must be URL encoded. Just copying the &#x60;MessageId&#x60; as it was supplied when submitting the message may not work.  SMS Status with Notification URL --- When a message has reached its final state, the API will send a POST to the URL that has been previously specified. &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{     to: &#39;+61418123456&#39;     sentTimestamp: &#39;2017-03-17T10:05:22+10:00&#39;     receivedTimestamp: &#39;2017-03-17T10:05:23+10:00&#39;     messageId: /cccb284200035236000000000ee9d074019e0301/1261418123456     deliveryStatus: DELIVRD   } &lt;/code&gt;&lt;/pre&gt;  The fields are: &lt;table&gt;   &lt;thead&gt;     &lt;tr&gt;       &lt;th&gt;Field&lt;/th&gt;       &lt;th&gt;Description&lt;/th&gt;     &lt;/tr&gt;   &lt;/thead&gt;   &lt;tbody&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;to&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;The number the message was sent to.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;receivedTimestamp&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;Time the message was sent to the API.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;sentTimestamp&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;Time handling of the message ended.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;deliveryStatus&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;The final state of the message.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;messageId&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;The same reference that was returned when the original message was sent.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;receivedTimestamp&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;Time the message was sent to the API.&lt;/td&gt;     &lt;/tr&gt;   &lt;/tbody&gt; &lt;/table&gt;  Upon receiving this call it is expected that your servers will give a 204 (No Content) response. Anything else will cause the API to reattempt the call 5 minutes later. 

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
 **messageId** | **String**| Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/sms.  | 

### Return type

[**[OutboundPollResponse]**](OutboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="retrieveMMSResponses"></a>
# **retrieveMMSResponses**
> [MMSContent] retrieveMMSResponses()

Retrieve MMS Responses

Messages are retrieved one at a time, starting with the earliest response. If the subscription has a &#x60;notifyURL&#x60;, response messages will be logged there instead.  # Notification URL Format for MMS Replies  &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{   \&quot;status\&quot;: \&quot;RECEIVED\&quot;,   \&quot;destinationAddress\&quot;: \&quot;+61418123456\&quot;,   \&quot;senderAddress\&quot;: \&quot;+61421987654\&quot;,   \&quot;subject\&quot;: \&quot;Foo\&quot;,   \&quot;sentTimestamp\&quot;: \&quot;2018-03-23T12:15:45+10:00\&quot;,   \&quot;envelope\&quot;: \&quot;string\&quot;,   \&quot;MMSContent\&quot;:     [       {         \&quot;type\&quot;: \&quot;text/plain\&quot;,         \&quot;filename\&quot;: \&quot;text_1.txt\&quot;,         \&quot;payload\&quot;: \&quot;string\&quot;       },       {         \&quot;type\&quot;: \&quot;image/jpeg\&quot;,         \&quot;filename\&quot;: \&quot;sample.jpeg\&quot;,         \&quot;payload\&quot;: \&quot;string\&quot;       }     ] }&lt;/code&gt;&lt;/pre&gt;  The fields are: | Field | Description | | --- | --- | | &#x60;status&#x60; | The final state of the message. | | &#x60;destinationAddress&#x60; |The number the message was sent to. | | &#x60;senderAddress&#x60; | The number the message was sent from. | | &#x60;subject&#x60; | The subject assigned to the message. | | &#x60;sentTimestamp&#x60; | Time handling of the message ended. | | &#x60;envelope&#x60; | Information about about terminal type and originating operator. | | &#x60;MMSContent&#x60; | An array of the actual content of the reply message. | | &#x60;type&#x60; | The content type of the message. | | &#x60;filename&#x60; | The filename for the message content. | | &#x60;payload&#x60; | The content of the message. | 

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
apiInstance.retrieveMMSResponses(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[MMSContent]**](MMSContent.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="retrieveSMSResponses"></a>
# **retrieveSMSResponses**
> InboundPollResponse retrieveSMSResponses()

Retrieve SMS Responses

Messages are retrieved one at a time, starting with the earliest response. The API supports the encoding of the full range of emojis in the reply message. The emojis will be in their UTF-8 format. If the subscription has a &#x60;notifyURL&#x60;, response messages will be logged there instead.  # Notification URL Format for SMS Response  &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{   \&quot;to\&quot;:\&quot;+61472880123\&quot;,   \&quot;from\&quot;:\&quot;+61412345678\&quot;,   \&quot;body\&quot;:\&quot;Foo4\&quot;,   \&quot;sentTimestamp\&quot;:\&quot;2018-04-20T14:24:35\&quot;,   \&quot;messageId\&quot;:\&quot;DMASApiA0000000146\&quot; }&lt;/code&gt;&lt;/pre&gt;  The fields are: | Field | Description | | --- |--- | | &#x60;to&#x60; | The number the message was sent to. | | &#x60;from&#x60; | The number the message was sent from. | | &#x60;body&#x60; | The content of the SMS response. | | &#x60;sentTimestamp&#x60; | Time handling of the message ended. | | &#x60;messageId&#x60; | The ID assigned to the message. | 

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

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="sendMMS"></a>
# **sendMMS**
> MessageSentResponse sendMMS(sendMmsRequest)

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
var sendMmsRequest = new TelstraMessaging.SendMmsRequest(); // SendMmsRequest | A JSON or XML payload containing the recipient's phone number and MMS message.
The recipient number should be in the format '04xxxxxxxx' where x is a digit.

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.sendMMS(sendMmsRequest, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sendMmsRequest** | [**SendMmsRequest**](SendMmsRequest.md)| A JSON or XML payload containing the recipient&#39;s phone number and MMS message.
The recipient number should be in the format &#39;04xxxxxxxx&#39; where x is a digit.
 | 

### Return type

[**MessageSentResponse**](MessageSentResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="sendSMS"></a>
# **sendSMS**
> MessageSentResponse sendSMS(sendSMSRequest)

Send SMS

Send an SMS Message to a single or multiple mobile number/s. 

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.MessagingApi();
var sendSMSRequest = new TelstraMessaging.SendSMSRequest(); // SendSMSRequest | A JSON or XML payload containing the recipient's phone number and text message.
This number can be in international format if preceeded by a â€˜+â€™ or in national format ('04xxxxxxxx') where x is a digit.

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.sendSMS(sendSMSRequest, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sendSMSRequest** | [**SendSMSRequest**](SendSMSRequest.md)| A JSON or XML payload containing the recipient&#39;s phone number and text message.
This number can be in international format if preceeded by a â€˜+â€™ or in national format (&#39;04xxxxxxxx&#39;) where x is a digit.
 | 

### Return type

[**MessageSentResponse**](MessageSentResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

