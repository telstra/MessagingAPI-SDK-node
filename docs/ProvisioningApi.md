# TelstraMessaging.ProvisioningApi

All URIs are relative to *https://tapi.telstra.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSubscription**](ProvisioningApi.md#createSubscription) | **POST** /messages/provisioning/subscriptions | Create Subscription
[**deleteSubscription**](ProvisioningApi.md#deleteSubscription) | **DELETE** /messages/provisioning/subscriptions | Delete Subscription
[**getSubscription**](ProvisioningApi.md#getSubscription) | **GET** /messages/provisioning/subscriptions | Get Subscription



## createSubscription

> ProvisionNumberResponse createSubscription(body)

Create Subscription

Invoke the provisioning API to get a dedicated mobile number for an account or application.  Note that Free Trial apps will have a 30-Day Limit for their provisioned number. If the Provisioning call is made several times within that 30-Day period, it will return the &#x60;expiryDate&#x60; in the Unix format and will not add any activeDays until after that &#x60;expiryDate&#x60;. After the &#x60;expiryDate&#x60;, you may make another Provisioning call to extend the activeDays by another 30-Days.  For paid apps, a provisioned number can be allotted for a maximum of 5 years. If a Provisioning call is made which will result to activeDays &gt; 1825, a 409 &#x60;Active Days Max&#x60; response will be returned to indicate that the provisioned number is already valid for more than 5 years and that no update to activeDays has been made. 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.ProvisioningApi();
let body = new TelstraMessaging.ProvisionNumberRequest(); // ProvisionNumberRequest | A JSON payload containing the required attributes
apiInstance.createSubscription(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ProvisionNumberRequest**](ProvisionNumberRequest.md)| A JSON payload containing the required attributes | 

### Return type

[**ProvisionNumberResponse**](ProvisionNumberResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteSubscription

> deleteSubscription(body)

Delete Subscription

Delete a mobile number subscription from an account 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.ProvisioningApi();
let body = new TelstraMessaging.DeleteNumberRequest(); // DeleteNumberRequest | EmptyArr
apiInstance.deleteSubscription(body).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DeleteNumberRequest**](DeleteNumberRequest.md)| EmptyArr | 

### Return type

null (empty response body)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## getSubscription

> GetSubscriptionResponse getSubscription()

Get Subscription

Get mobile number subscription for an account 

### Example

```javascript
import TelstraMessaging from 'Telstra_Messaging';
let defaultClient = TelstraMessaging.ApiClient.instance;
// Configure OAuth2 access token for authorization: auth
let auth = defaultClient.authentications['auth'];
auth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new TelstraMessaging.ProvisioningApi();
apiInstance.getSubscription().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetSubscriptionResponse**](GetSubscriptionResponse.md)

### Authorization

[auth](../README.md#auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

