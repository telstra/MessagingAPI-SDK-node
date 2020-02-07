# TelstraMessaging.SendSmsMultiRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**smsMulti** | [**[MessageMulti]**](MessageMulti.md) | Multiple SMS. Up to 10 messages can be sent in one API call. | [optional] 
**notifyURL** | **String** | Contains a URL that will be called once your message has been processed. The status may be delivered, expired, deleted, etc. Please refer to the Delivery Status section for more information.  If you are using a domain URL you must include the forward slash at the end of the URL (e.g. http://www.example.com/).  This is required when &#x60;\&quot;receiptOff\&quot;&#x60; is missing or &#x60;\&quot;receiptOff\&quot;:\&quot;false\&quot;&#x60;.  | [optional] 


