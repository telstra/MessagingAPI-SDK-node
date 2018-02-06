# TelstraMessaging.SendSMSRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**to** | **String** | Phone number (in E.164 format) to send the SMS to. This number can be in international format if preceeded by a ‘+’, or in national format. | 
**body** | **String** | The text body of the message. Messages longer than 160 characters will be counted as multiple messages. | 
**from** | **String** | Phone number (in E.164 format) the SMS was sent from. If not present, the serverice will use the mobile number associated with the application, or it be an Alphanumeric address of up to 11 characters. | [optional] 
**validity** | **Number** | How long the platform should attempt to deliver the message for. This period is specified in minutes from the message | [optional] 
**scheduledDelivery** | **Number** | How long the platform should wait before attempting to send the message - specified in minutes. | [optional] 
**notifyURL** | **String** | Contains a URL that will be called once your message has been processed. The status may be delivered, expired, deleted, etc. | [optional] 
**replyRequest** | **Boolean** | If set to true, the reply message functionality will be implemented and the to address will be ignored if present. If false or not present, then normal message handling is implemented. | [optional] 


