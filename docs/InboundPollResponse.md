# TelstraMessaging.InboundPollResponse

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**to** | **String** | The phone number (recipient) that the message was sent to(in E.164 format). | [optional] 
**from** | **String** | The phone number (sender) that the message was sent from (in E.164 format). | [optional] 
**body** | **String** | Text body of the message that was sent | [optional] 
**receivedTimestamp** | **String** | The date and time when the message was recieved by recipient. | [optional] 
**moreMessages** | **Number** | Indicates if there are more messages that can be polled from the server. 0&#x3D;No more messages available. Anything else indicates there are more messages on the server. | [optional] 
**messageId** | **String** | Optional message ID of the SMS you sent. Use this ID to view the message status or get responses. | [optional] 


