# TelstraMessaging.Message

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**to** | **String** | Just a copy of the number the message is sent to. | 
**deliveryStatus** | **String** | Gives an indication if the message has been accepted for delivery. The description field contains information on why a message may have been rejected. | 
**messageId** | **String** | For an accepted message, ths will be a unique reference that can be used to check the messages status. Please refer to the Delivery Notification section. Note that &#x60;messageId&#x60; will be different for each number that the message was sent to. | 
**messageStatusURL** | **String** | For an accepted message, ths will be the URL that can be used to check the messages status. Please refer to the Delivery Notification section. | [optional] 


