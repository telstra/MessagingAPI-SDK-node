# TelstraMessaging.AuthenticationApi

All URIs are relative to *https://tapi.telstra.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authToken**](AuthenticationApi.md#authToken) | **POST** /oauth/token | Generate OAuth2 token


<a name="authToken"></a>
# **authToken**
> OAuthResponse authToken(clientId, clientSecret, grantType)

Generate OAuth2 token

To generate an OAuth2 Authentication token, pass through your &#x60;Client key&#x60; and &#x60;Client secret&#x60; that you received when you registered for the **API Free Trial** Product. The grant_type should be left as &#x60;client_credentials&#x60; and the scope as &#x60;NSMS&#x60;. The token will expire in one hour. 

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');

var apiInstance = new TelstraMessaging.AuthenticationApi();
var clientId = "clientId_example"; // String | 
var clientSecret = "clientSecret_example"; // String | 
var grantType = "'client_credentials'"; // String | 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.authToken(clientId, clientSecret, grantType, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clientId** | **String**|  | 
 **clientSecret** | **String**|  | 
 **grantType** | **String**|  | [default to &#39;client_credentials&#39;]

### Return type

[**OAuthResponse**](OAuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

