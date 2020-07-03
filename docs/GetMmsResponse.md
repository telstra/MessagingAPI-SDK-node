# TelstraMessaging.GetMmsResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **String** | The final state of the message.  | 
**destinationAddress** | **String** | The number the message was sent to.  | 
**senderAddress** | **String** | The number the message was sent from.  | 
**subject** | **String** | The subject assigned to the message.  | [optional] 
**messageId** | **String** | Message Id assigned by the MMSC.  | [optional] 
**apiMsgId** | **String** | Message Id assigned by the API.  | [optional] 
**sentTimestamp** | **String** | Time handling of the message ended.  | 
**mMSContent** | [**[MMSContent]**](MMSContent.md) | An array of content that was received in an MMS message.  | 


