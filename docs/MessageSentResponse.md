# TelstraMessaging.MessageSentResponse

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**messages** | [**[Message]**](Message.md) | An array of messages. | 
**messageType** | **String** | This returns whether the message sent was a SMS or MMS. | 
**numberSegments** | **Number** | For SMS messages only, the value indicates the number of 160 character message segments sent. | 
**numberNationalDestinations** | **Number** | This returns the number of domestic Australian messages sent. | [optional] 
**numberInternationalDestinations** | **Number** | This returns the number of international messages sent | [optional] 


