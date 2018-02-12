# TelstraMessaging.AuthApi

All URIs are relative to *https://tapi.telstra.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**oauthTokenPost**](AuthApi.md#oauthTokenPost) | **POST** /oauth/token | AuthGeneratetokenPost


<a name="oauthTokenPost"></a>
# **oauthTokenPost**
> AuthgeneratetokenpostResponse oauthTokenPost(oAuthClientId, oAuthClientSecret)

AuthGeneratetokenPost

generate auth token

### Example
```javascript
var TelstraMessaging = require('Telstra_Messaging');

var apiInstance = new TelstraMessaging.AuthApi();

var oAuthClientId = "oAuthClientId_example"; // String | 

var oAuthClientSecret = "oAuthClientSecret_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.oauthTokenPost(oAuthClientId, oAuthClientSecret, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **oAuthClientId** | **String**|  | 
 **oAuthClientSecret** | **String**|  | 

### Return type

[**AuthgeneratetokenpostResponse**](AuthgeneratetokenpostResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

