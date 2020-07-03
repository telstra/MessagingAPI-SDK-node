# TelstraMessaging.MessageSentResponseMms

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**messages** | [**[Message]**](Message.md) | An array of messages. | 
**mmsMediaKB** | **Number** | Indicates the message size in kB of the MMS sent.  | [optional] 
**country** | **[Object]** | An array of the countries to which the destination MSISDNs belong. | [optional] 
**messageType** | **String** | This returns whether the message sent was a SMS or MMS. | 
**numberSegments** | **Number** | MMS with numberSegments below 600 are classed as Small whereas those that are bigger than 600 are classed as Large. They will be charged accordingly.  | 


