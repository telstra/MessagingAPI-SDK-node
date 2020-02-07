# TelstraMessaging.MessagingApi

All URIs are relative to *https://tapi.telstra.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getMMSStatus**](MessagingApi.md#getMMSStatus) | **GET** /messages/mms/{messageid}/status | Get MMS Status
[**getSMSStatus**](MessagingApi.md#getSMSStatus) | **GET** /messages/sms/{messageId}/status | Get SMS Status
[**mMSHealthCheck**](MessagingApi.md#mMSHealthCheck) | **GET** /messages/mms/healthcheck | MMS Health Check
[**retrieveMMSReplies**](MessagingApi.md#retrieveMMSReplies) | **GET** /messages/mms | Retrieve MMS Replies
[**retrieveSMSReplies**](MessagingApi.md#retrieveSMSReplies) | **GET** /messages/sms | Retrieve SMS Replies
[**sMSHealthCheck**](MessagingApi.md#sMSHealthCheck) | **GET** /messages/sms/healthcheck | SMS Health Check
[**sMSMulti**](MessagingApi.md#sMSMulti) | **POST** /messages/sms/multi | Send Multiple SMS
[**sendMMS**](MessagingApi.md#sendMMS) | **POST** /messages/mms | Send MMS
[**sendSMS**](MessagingApi.md#sendSMS) | **POST** /messages/sms | Send SMS



## getMMSStatus

> [OutboundPollResponse] getMMSStatus(messageid)

Get MMS Status

Get MMS Status

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.MessagingApi();
let messageid = "messageid_example"; // String | Unique identifier of a message - it is the value returned from a previous POST call to https://tapi.telstra.com/v2/messages/mms 
apiInstance.getMMSStatus(messageid).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **messageid** | **String**| Unique identifier of a message - it is the value returned from a previous POST call to https://tapi.telstra.com/v2/messages/mms  | 

### Return type

[**[OutboundPollResponse]**](OutboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSMSStatus

> [OutboundPollResponse] getSMSStatus(messageId)

Get SMS Status

If no notification URL has been specified, it is possible to poll for the message status.  Note that the &#x60;MessageId&#x60; that appears in the URL must be URL encoded. Just copying the &#x60;MessageId&#x60; as it was supplied when submitting the message may not work.  # SMS Status with Notification URL  When a message has reached its final state, the API will send a POST to the URL that has been previously specified.  &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{     \&quot;to\&quot;: \&quot;+61418123456\&quot;,     \&quot;sentTimestamp\&quot;: \&quot;2017-03-17T10:05:22+10:00\&quot;,     \&quot;receivedTimestamp\&quot;: \&quot;2017-03-17T10:05:23+10:00\&quot;,     \&quot;messageId\&quot;: \&quot;1234567890ABCDEFGHIJKLNOPQRSTUVW\&quot;,     \&quot;deliveryStatus\&quot;: \&quot;DELIVRD\&quot;   } &lt;/code&gt;&lt;/pre&gt;  The fields are:  | Field | Description | | --- | ---| | &#x60;to&#x60; |  The number the message was sent to. | | &#x60;receivedTimestamp&#x60; | Time the message was sent to the API. | | &#x60;sentTimestamp&#x60; | Time handling of the message ended. | | &#x60;deliveryStatus&#x60; | The final state of the message. | | &#x60;messageId&#x60; | The same reference that was returned when the original message was sent.| | &#x60;receivedTimestamp&#x60; | Time the message was sent to the API.|  Upon receiving this call it is expected that your servers will give a 204 (No Content) response. 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.MessagingApi();
let messageId = "messageId_example"; // String | Unique identifier of a message - it is the value returned from a previous POST call to https://tapi.telstra.com/v2/messages/sms. 
apiInstance.getSMSStatus(messageId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **messageId** | **String**| Unique identifier of a message - it is the value returned from a previous POST call to https://tapi.telstra.com/v2/messages/sms.  | 

### Return type

[**[OutboundPollResponse]**](OutboundPollResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## mMSHealthCheck

> HealthCheckResponse mMSHealthCheck()

MMS Health Check

Determine whether the MMS service is up or down. 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';

let apiInstance = new TelstraMessaging.MessagingApi();
apiInstance.mMSHealthCheck().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**HealthCheckResponse**](HealthCheckResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## retrieveMMSReplies

> GetMmsResponse retrieveMMSReplies()

Retrieve MMS Replies

Messages are retrieved one at a time, starting with the earliest reply.  If the subscription has a &#x60;notifyURL&#x60;, reply messages will be logged there instead, i.e. &#x60;GET&#x60; and reply &#x60;notifyURL&#x60; are exclusive.  # MMS Reply with Notification URL  When a reply is received, the API will send a POST to the subscription URL that has been previously specified.  &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{   \&quot;to\&quot;: \&quot;+61418123456\&quot;,   \&quot;from\&quot;: \&quot;+61421987654\&quot;,   \&quot;sentTimestamp\&quot;: \&quot;2018-03-23T12:15:45+10:00\&quot;,   \&quot;messageId\&quot;: \&quot;XFRO1ApiA0000000111\&quot;,   \&quot;subject\&quot;: \&quot;Foo\&quot;,   \&quot;envelope\&quot;: \&quot;string\&quot;,   \&quot;MMSContent\&quot;:     [       {         \&quot;type\&quot;: \&quot;text/plain\&quot;,         \&quot;filename\&quot;: \&quot;text_1.txt\&quot;,         \&quot;payload\&quot;: \&quot;string\&quot;       },       {         \&quot;type\&quot;: \&quot;image/jpeg\&quot;,         \&quot;filename\&quot;: \&quot;sample.jpeg\&quot;,         \&quot;payload\&quot;: \&quot;string\&quot;       }     ] }&lt;/code&gt;&lt;/pre&gt;  The fields are:  | Field | Description | | --- | --- | | &#x60;to&#x60; |The number the message was sent to. | | &#x60;from&#x60; | The number the message was sent from. | | &#x60;sentTimestamp&#x60; | Time handling of the message ended. | | &#x60;messageId&#x60; | Message Id assigned by the MMSC | | &#x60;subject&#x60; | The subject assigned to the message. | | &#x60;envelope&#x60; | Information about about terminal type and originating operator. | | &#x60;MMSContent&#x60; | An array of the actual content of the reply message. | | &#x60;type&#x60; | The content type of the message. | | &#x60;filename&#x60; | The filename for the message content. | | &#x60;payload&#x60; | The content of the message. | 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.MessagingApi();
apiInstance.retrieveMMSReplies().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetMmsResponse**](GetMmsResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## retrieveSMSReplies

> InboundPollResponse retrieveSMSReplies()

Retrieve SMS Replies

Messages are retrieved one at a time, starting with the earliest reply.  The API supports the encoding of emojis in the reply message. The emojis will be in their UTF-8 format.  If the subscription has a &#x60;notifyURL&#x60;, reply messages will be logged there instead.  # SMS Reply with Notification URL  When a reply is received, the API will send a POST to the subscription URL that has been previously specified.  &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{   \&quot;to\&quot;:\&quot;+61472880123\&quot;,   \&quot;from\&quot;:\&quot;+61412345678\&quot;,   \&quot;body\&quot;:\&quot;Foo4\&quot;,   \&quot;sentTimestamp\&quot;:\&quot;2018-04-20T14:24:35\&quot;,   \&quot;messageId\&quot;:\&quot;DMASApiA0000000146\&quot; }&lt;/code&gt;&lt;/pre&gt;  The fields are:  | Field | Description | | --- |--- | | &#x60;to&#x60; | The number the message was sent to. | | &#x60;from&#x60; | The number the message was sent from. | | &#x60;body&#x60; | The content of the SMS response. | | &#x60;sentTimestamp&#x60; | Time handling of the message ended. | | &#x60;messageId&#x60; | The ID assigned to the message. | 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.MessagingApi();
apiInstance.retrieveSMSReplies().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

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


## sMSHealthCheck

> HealthCheckResponse sMSHealthCheck()

SMS Health Check

Determine whether the SMS service is up or down. 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';

let apiInstance = new TelstraMessaging.MessagingApi();
apiInstance.sMSHealthCheck().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**HealthCheckResponse**](HealthCheckResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## sMSMulti

> MessageSentResponseSms sMSMulti(payload)

Send Multiple SMS

Send multiple SMS in one API call. 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.MessagingApi();
let payload = new TelstraMessaging.SendSmsMultiRequest(); // SendSmsMultiRequest | A JSON payload containing the recipient's phone number and text message. This number can be in international format if preceeded by a '+' or in national format ('04xxxxxxxx') where x is a digit. 
apiInstance.sMSMulti(payload).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **payload** | [**SendSmsMultiRequest**](SendSmsMultiRequest.md)| A JSON payload containing the recipient&#39;s phone number and text message. This number can be in international format if preceeded by a &#39;+&#39; or in national format (&#39;04xxxxxxxx&#39;) where x is a digit.  | 

### Return type

[**MessageSentResponseSms**](MessageSentResponseSms.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## sendMMS

> MessageSentResponseMms sendMMS(body)

Send MMS

Send MMS

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.MessagingApi();
let body = new TelstraMessaging.SendMmsRequest(); // SendMmsRequest | A JSON or XML payload containing the recipient's phone number and MMS message. The recipient number should be in the format '04xxxxxxxx' where x is a digit. 
apiInstance.sendMMS(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SendMmsRequest**](SendMmsRequest.md)| A JSON or XML payload containing the recipient&#39;s phone number and MMS message. The recipient number should be in the format &#39;04xxxxxxxx&#39; where x is a digit.  | 

### Return type

[**MessageSentResponseMms**](MessageSentResponseMms.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## sendSMS

> MessageSentResponseSms sendSMS(payload)

Send SMS

Send an SMS Message to a single or multiple mobile number/s. 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.MessagingApi();
let payload = new TelstraMessaging.SendSMSRequest(); // SendSMSRequest | A JSON or XML payload containing the recipient's phone number and text message. This number can be in international format if preceeded by a '+' or in national format ('04xxxxxxxx') where x is a digit. 
apiInstance.sendSMS(payload).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **payload** | [**SendSMSRequest**](SendSMSRequest.md)| A JSON or XML payload containing the recipient&#39;s phone number and text message. This number can be in international format if preceeded by a &#39;+&#39; or in national format (&#39;04xxxxxxxx&#39;) where x is a digit.  | 

### Return type

[**MessageSentResponseSms**](MessageSentResponseSms.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

