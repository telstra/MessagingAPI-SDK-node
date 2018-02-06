# TelstraMessaging.ProvisioningApi

All URIs are relative to *https://tapi.telstra.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSubscription**](ProvisioningApi.md#createSubscription) | **POST** /messages/provisioning/subscriptions | Create Subscription
[**deleteSubscription**](ProvisioningApi.md#deleteSubscription) | **DELETE** /messages/provisioning/subscriptions | Delete Subscription
[**getSubscription**](ProvisioningApi.md#getSubscription) | **GET** /messages/provisioning/subscriptions | Get Subscription


<a name="createSubscription"></a>
# **createSubscription**
> ProvisionNumberResponse createSubscription(authorization, body)

Create Subscription

Provision a mobile number

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.ProvisioningApi();

var authorization = "authorization_example"; // String | An OAUTH bearer token that is entitled to use the 'SUBSCRIPTION' scope.

var body = new TelstraMessaging.ProvisionNumberRequest(); // ProvisionNumberRequest | A JSON payload containing the required attributes


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createSubscription(authorization, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| An OAUTH bearer token that is entitled to use the &#39;SUBSCRIPTION&#39; scope. | 
 **body** | [**ProvisionNumberRequest**](ProvisionNumberRequest.md)| A JSON payload containing the required attributes | 

### Return type

[**ProvisionNumberResponse**](ProvisionNumberResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteSubscription"></a>
# **deleteSubscription**
> deleteSubscription(authorization)

Delete Subscription

Delete a mobile number subscription from an account

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.ProvisioningApi();

var authorization = "authorization_example"; // String | An OAUTH bearer token that is entitled to use the 'SUBSCRIPTION' scope.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteSubscription(authorization, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| An OAUTH bearer token that is entitled to use the &#39;SUBSCRIPTION&#39; scope. | 

### Return type

null (empty response body)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getSubscription"></a>
# **getSubscription**
> [ProvisionNumberResponse] getSubscription(authorization)

Get Subscription

Get mobile number subscription for an account

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');
var defaultClient = TelstraMessaging.ApiClient.instance;

// Configure OAuth2 access token for authorization: auth
var auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new TelstraMessaging.ProvisioningApi();

var authorization = "authorization_example"; // String | An OAUTH bearer token that is entitled to use the 'SUBSCRIPTION' scope.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getSubscription(authorization, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| An OAUTH bearer token that is entitled to use the &#39;SUBSCRIPTION&#39; scope. | 

### Return type

[**[ProvisionNumberResponse]**](ProvisionNumberResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

