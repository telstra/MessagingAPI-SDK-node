/**
 * Telstra Messaging API
 *  # Introduction  Send and receive SMS and MMS messages globally using Telstraâ€™s enterprise grade Messaging API. It also allows your application to track the delivery status of both sent and received messages. Get your dedicated Australian number, and start sending and receiving messages today.  # Features  The Telstra Messaging API provides the features below. | Feature | Description | | --- | --- | | `Dedicated Number` | Provision a mobile number for your account to be used as `from` address in the API | | `Send Messages` | Sending SMS or MMS messages | | `Receive Messages` | Telstra will deliver messages sent to a dedicated number or to the `notifyURL` defined by you | | `Broadcast Messages` | Invoke a single API call to send a message to a list of numbers provided in `to` | | `Delivery Status` | Query the delivery status of your messages | | `Callbacks` | Provide a notification URL and Telstra will notify your app when a message status changes | | `Alphanumeric Identifier` | Differentiate yourself by providing an alphanumeric string in `from`. This feature is only available on paid plans | | `Concatenation` | Send messages up to 1900 characters long and Telstra will automaticaly segment and reassemble them | | `Reply Request` | Create a chat session by associating `messageId` and `to` number to track responses received from a mobile number. We will store this association for 8 days | | `Character set` | Accepts all Unicode characters as part of UTF-8 | | `Bounce-back response` | See if your SMS hits an unreachable or unallocated number (Australia Only) | | `Queuing` | Messaging API will automatically queue and deliver each message at a compliant rate. | | `Emoji Encoding` | The API supports the encoding of the full range of emojis. Emojis in the reply messages will be in their UTF-8 format. |  ## Delivery Notification or Callbacks  The API provides several methods for notifying when a message has been delivered to the destination.  1. When you send a message there is an opportunity to specify a `notifyURL`. Once the message has been delivered the API will make a call to this URL to advise of the message status. 2. If you do not specify a URL you can always call the `GET /status` API to get the status of the message.  # Getting Access to the API  1. Register at [https://dev.telstra.com](https://dev.telstra.com). 2. After registration, login to [https://dev.telstra.com](https://dev.telstra.com) and navigate to the **My apps** page. 3. Create your application by clicking the **Add new app** button 4. Select **API Free Trial** Product when configuring your application. This Product includes the Telstra Messaging API as well as other free trial APIs. Your application will be approved automatically. 5. There is a maximum of 1000 free messages per developer. Additional messages and features can be purchased from [https://dev.telstra.com](https://dev.telstra.com). 6. Note your `Client key` and `Client secret` as these will be needed to provision a number for your application and for authentication.  Now head over to **Getting Started** where you can find a postman collection as well as some links to sample apps and SDKs to get you started. Happy Messaging!  # Frequently Asked Questions  **Q: Is creating a subscription via the Provisioning call a required step?** A. Yes. You will only be able to start sending messages if you have a provisioned dedicated number. Use Provisioning to create a dedicated number subscription, or renew your dedicated number if it has expired.  **Q: When trying to send an SMS I receive a `400 Bad Request` response. How can I fix this?** A. You need to make sure you have a provisioned dedicated number before you can send an SMS.  If you do not have a provisioned dedicated number and you try to send a message via the API, you will get the error below in the response:  <pre><code class=\"language-sh\">{   \"status\":\"400\",   \"code\":\"DELIVERY-IMPOSSIBLE\",   \"message\":\"Invalid \\'from\\' address specified\" }</code></pre>  Use Provisioning to create a dedicated number subscription, or renew your dedicated number if it has expired.  **Q: Can I send a broadcast message using the Telstra Messaging API?** A. Yes. Recipient numbers can be in the form of an array of strings if a broadcast message needs to be sent, allowing you to send to multiple mobile numbers in one API call.   A sample request body for this will be: `{\"to\":[\"+61412345678\",\"+61487654321\"],\"body\":\"Test Message\"}`  **Q: Can I use `Alphanumeric Identifier` from my paid plan via credit card?** A. `Alphanumeric Identifier` is only available on Telstra Account paid plans, not through credit card paid plans.  **Q: How long does my dedicated number stay active for?** A. When you provision a dedicated number, by default it will be active for 30-days. You can use the `activeDays` parameter during the provisioning call to increment or decrement the number of days your dedicated number will remain active.  **Q: What is the maximum sized MMS that I can send?** A. This will depend on the carrier that will receive the MMS. For Telstra it's up to 2MB,  Optus up to 1.5MB and Vodafone only allows up to 500kB. You will need to check with international carriers for thier MMS size limits.  **Q: Are SMILs supported by the Messaging API?** A. While there will be no error if you send an MMS with a SMIL presentation, the actual layout or sequence defined in the SMIL may not display as expected because most of the new smartphone devices ignore the SMIL presentation layer. SMIL was used in feature phones which had limited capability and SMIL allowed a *powerpoint type* presentation to be provided. Smartphones now have the capability to display video which is the better option for presentations. It is recommended that MMS messages should just drop the SMIL.  **Q: How do I assign a delivery notification or callback URL?** A. You can assign a delivery notification or callback URL by adding the `notifyURL` parameter in the body of the request when you send a message. Once the message has been delivered, a notification will then be posted to this callback URL.  **Q: What is the difference between the `notifyURL` parameter in the Provisoning call versus the `notifyURL` parameter in the Send Message call?** A. The `notifyURL` in the Provisoning call will be the URL where replies to the provisioned number will be posted. On the other hand, the `notifyURL` in the Send Message call will be the URL where the delivery notification will be posted, e.g. when an SMS has already been delivered to the recipient.  # Getting Started  Below are the steps to get started with the Telstra Messaging API.   1. Generate an OAuth2 token using your `Client key` and `Client secret`.   2. Use the Provisioning call to create a subscription and receive a dedicated number.   3. Send a message to a specific mobile number.  ## Run in Postman <a href=\"https://app.getpostman.com/run-collection/ded00578f69a9deba256#?env%5BMessaging%20API%20Environments%5D=W3siZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X2lkIiwidmFsdWUiOiIiLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X3NlY3JldCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImFjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Imhvc3QiLCJ2YWx1ZSI6InRhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiQXV0aG9yaXphdGlvbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Im9hdXRoX2hvc3QiLCJ2YWx1ZSI6InNhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoibWVzc2FnZV9pZCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifV0=\"><img src=\"https://run.pstmn.io/button.svg\" alt=\"Run in Postman\"/></a>  ## Sample Apps   - [Perl Sample App](https://github.com/telstra/MessagingAPI-perl-sample-app)   - [Happy Chat App](https://github.com/telstra/messaging-sample-code-happy-chat)   - [PHP Sample App](https://github.com/developersteve/telstra-messaging-php)  ## SDK Repos   - [Messaging API - PHP SDK](https://github.com/telstra/MessagingAPI-SDK-php)   - [Messaging API - Python SDK](https://github.com/telstra/MessagingAPI-SDK-python)   - [Messaging API - Ruby SDK](https://github.com/telstra/MessagingAPI-SDK-ruby)   - [Messaging API - NodeJS SDK](https://github.com/telstra/MessagingAPI-SDK-node)   - [Messaging API - .Net2 SDK](https://github.com/telstra/MessagingAPI-SDK-dotnet)   - [Messaging API - Java SDK](https://github.com/telstra/MessagingAPI-SDK-Java)  ## Blog Posts For more information on the Messaging API, you can read these blog posts: - [Callbacks Part 1](https://dev.telstra.com/content/understanding-messaging-api-callbacks-part-1)  - [Callbacks Part 2](https://dev.telstra.com/content/understanding-messaging-api-callbacks-part-2) 
 *
 * OpenAPI spec version: 2.2.6
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 *
 * OpenAPI Generator version: 3.0.1
 *
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/DeleteNumberRequest', 'model/GetSubscriptionResponse', 'model/InboundPollResponse', 'model/MMSContent', 'model/Message', 'model/MessageSentResponse', 'model/OAuthResponse', 'model/OutboundPollResponse', 'model/ProvisionNumberRequest', 'model/ProvisionNumberResponse', 'model/SendMmsRequest', 'model/SendSMSRequest', 'model/Status', 'api/AuthenticationApi', 'api/MessagingApi', 'api/ProvisioningApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/DeleteNumberRequest'), require('./model/GetSubscriptionResponse'), require('./model/InboundPollResponse'), require('./model/MMSContent'), require('./model/Message'), require('./model/MessageSentResponse'), require('./model/OAuthResponse'), require('./model/OutboundPollResponse'), require('./model/ProvisionNumberRequest'), require('./model/ProvisionNumberResponse'), require('./model/SendMmsRequest'), require('./model/SendSMSRequest'), require('./model/Status'), require('./api/AuthenticationApi'), require('./api/MessagingApi'), require('./api/ProvisioningApi'));
  }
}(function(ApiClient, DeleteNumberRequest, GetSubscriptionResponse, InboundPollResponse, MMSContent, Message, MessageSentResponse, OAuthResponse, OutboundPollResponse, ProvisionNumberRequest, ProvisionNumberResponse, SendMmsRequest, SendSMSRequest, Status, AuthenticationApi, MessagingApi, ProvisioningApi) {
  'use strict';

  /**
   * _IntroductionSend_and_receive_SMS_and_MMS_messages_globally_using_Telstras_enterprise_grade_Messaging_API_It_also_allows_your_application_to_track_the_delivery_status_of_both_sent_and_received_messages_Get_your_dedicated_Australian_number_and_start_sending_and_receiving_messages_today__FeaturesThe_Telstra_Messaging_API_provides_the_features_below__Feature__Description____________Dedicated_Number__Provision_a_mobile_number_for_your_account_to_be_used_as_from_address_in_the_API__Send_Messages__Sending_SMS_or_MMS_messages__Receive_Messages__Telstra_will_deliver_messages_sent_to_a_dedicated_number_or_to_the_notifyURL_defined_by_you__Broadcast_Messages__Invoke_a_single_API_call_to_send_a_message_to_a_list_of_numbers_provided_in_to__Delivery_Status__Query_the_delivery_status_of_your_messages__Callbacks__Provide_a_notification_URL_and_Telstra_will_notify_your_app_when_a_message_status_changes__Alphanumeric_Identifier__Differentiate_yourself_by_providing_an_alphanumeric_string_in_from__This_feature_is_only_available_on_paid_plans__Concatenation__Send_messages_up_to_1900_characters_long_and_Telstra_will_automaticaly_segment_and_reassemble_them__Reply_Request__Create_a_chat_session_by_associating_messageId_and_to_number_to_track_responses_received_from_a_mobile_number__We_will_store_this_association_for_8_days__Character_set__Accepts_all_Unicode_characters_as_part_of_UTF_8__Bounce_back_response__See_if_your_SMS_hits_an_unreachable_or_unallocated_number__Australia_Only__Queuing__Messaging_API_will_automatically_queue_and_deliver_each_message_at_a_compliant_rate___Emoji_Encoding__The_API_supports_the_encoding_of_the_full_range_of_emojis__Emojis_in_the_reply_messages_will_be_in_their_UTF_8_format___Delivery_Notification_or_CallbacksThe_API_provides_several_methods_for_notifying_when_a_message_has_been_delivered_to_the_destination_1__When_you_send_a_message_there_is_an_opportunity_to_specify_a_notifyURL__Once_the_message_has_been_delivered_the_API_will_make_a_call_to_this_URL_to_advise_of_the_message_status_2__If_you_do_not_specify_a_URL_you_can_always_call_the_GET_status_API_to_get_the_status_of_the_message__Getting_Access_to_the_API1__Register_at__httpsdev_telstra_com_httpsdev_telstra_com_2__After_registration_login_to__httpsdev_telstra_com_httpsdev_telstra_com_and_navigate_to_the_My_apps_page_3__Create_your_application_by_clicking_the_Add_new_app_button4__Select_API_Free_Trial_Product_when_configuring_your_application__This_Product_includes_the_Telstra_Messaging_API_as_well_as_other_free_trial_APIs__Your_application_will_be_approved_automatically_5__There_is_a_maximum_of_1000_free_messages_per_developer__Additional_messages_and_features_can_be_purchased_from__httpsdev_telstra_com_httpsdev_telstra_com_6__Note_your_Client_key_and_Client_secret_as_these_will_be_needed_to_provision_a_number_for_your_application_and_for_authentication_Now_head_over_to_Getting_Started_where_you_can_find_a_postman_collection_as_well_as_some_links_to_sample_apps_and_SDKs_to_get_you_started_Happy_Messaging_Frequently_Asked_QuestionsQ_Is_creating_a_subscription_via_the_Provisioning_call_a_required_stepA__Yes__You_will_only_be_able_to_start_sending_messages_if_you_have_a_provisioned_dedicated_number__Use_Provisioning_to_create_a_dedicated_number_subscription_or_renew_your_dedicated_number_if_it_has_expired_Q_When_trying_to_send_an_SMS_I_receive_a_400_Bad_Request_response__How_can_I_fix_thisA__You_need_to_make_sure_you_have_a_provisioned_dedicated_number_before_you_can_send_an_SMS__If_you_do_not_have_a_provisioned_dedicated_number_and_you_try_to_send_a_message_via_the_API_you_will_get_the_error_below_in_the_responseprecode_classlanguage_sh__status400__codeDELIVERY_IMPOSSIBLE__messageInvalid_from_address_specifiedcodepreUse_Provisioning_to_create_a_dedicated_number_subscription_or_renew_your_dedicated_number_if_it_has_expired_Q_Can_I_send_a_broadcast_message_using_the_Telstra_Messaging_APIA__Yes__Recipient_numbers_can_be_in_the_form_of_an_array_of_strings_if_a_broadcast_message_needs_to_be_sent_allowing_you_to_send_to_multiple_mobile_numbers_in_one_API_call___A_sample_request_body_for_this_will_be_to_6141234567861487654321bodyTest_MessageQ_Can_I_use_Alphanumeric_Identifier_from_my_paid_plan_via_credit_cardA__Alphanumeric_Identifier_is_only_available_on_Telstra_Account_paid_plans_not_through_credit_card_paid_plans_Q_How_long_does_my_dedicated_number_stay_active_forA__When_you_provision_a_dedicated_number_by_default_it_will_be_active_for_30_days__You_can_use_the_activeDays_parameter_during_the_provisioning_call_to_increment_or_decrement_the_number_of_days_your_dedicated_number_will_remain_active_Q_What_is_the_maximum_sized_MMS_that_I_can_sendA__This_will_depend_on_the_carrier_that_will_receive_the_MMS__For_Telstra_its_up_to_2MB__Optus_up_to_1_5MB_and_Vodafone_only_allows_up_to_500kB__You_will_need_to_check_with_international_carriers_for_thier_MMS_size_limits_Q_Are_SMILs_supported_by_the_Messaging_APIA__While_there_will_be_no_error_if_you_send_an_MMS_with_a_SMIL_presentation_the_actual_layout_or_sequence_defined_in_the_SMIL_may_not_display_as_expected_because_most_of_the_new_smartphone_devices_ignore_the_SMIL_presentation_layer__SMIL_was_used_in_feature_phones_which_had_limited_capability_and_SMIL_allowed_a_powerpoint_type_presentation_to_be_provided__Smartphones_now_have_the_capability_to_display_video_which_is_the_better_option_for_presentations__It_is_recommended_that_MMS_messages_should_just_drop_the_SMIL_Q_How_do_I_assign_a_delivery_notification_or_callback_URLA__You_can_assign_a_delivery_notification_or_callback_URL_by_adding_the_notifyURL_parameter_in_the_body_of_the_request_when_you_send_a_message__Once_the_message_has_been_delivered_a_notification_will_then_be_posted_to_this_callback_URL_Q_What_is_the_difference_between_the_notifyURL_parameter_in_the_Provisoning_call_versus_the_notifyURL_parameter_in_the_Send_Message_callA__The_notifyURL_in_the_Provisoning_call_will_be_the_URL_where_replies_to_the_provisioned_number_will_be_posted_On_the_other_hand_the_notifyURL_in_the_Send_Message_call_will_be_the_URL_where_the_delivery_notification_will_be_posted_e_g__when_an_SMS_has_already_been_delivered_to_the_recipient__Getting_StartedBelow_are_the_steps_to_get_started_with_the_Telstra_Messaging_API___1__Generate_an_OAuth2_token_using_your_Client_key_and_Client_secret___2__Use_the_Provisioning_call_to_create_a_subscription_and_receive_a_dedicated_number___3__Send_a_message_to_a_specific_mobile_number__Run_in_Postmanahrefhttpsapp_getpostman_comrun_collectionded00578f69a9deba256env5BMessaging20API20Environments5DW3siZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X2lkIiwidmFsdWUiOiIiLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X3NlY3JldCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImFjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Imhvc3QiLCJ2YWx1ZSI6InRhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiQXV0aG9yaXphdGlvbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Im9hdXRoX2hvc3QiLCJ2YWx1ZSI6InNhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoibWVzc2FnZV9pZCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifV0imgsrchttpsrun_pstmn_iobutton_svg_altRun_in_Postmana_Sample_Apps_____Perl_Sample_App_httpsgithub_comtelstraMessagingAPI_perl_sample_app_____Happy_Chat_App_httpsgithub_comtelstramessaging_sample_code_happy_chat_____PHP_Sample_App_httpsgithub_comdeveloperstevetelstra_messaging_php_SDK_Repos_____Messaging_API___PHP_SDK_httpsgithub_comtelstraMessagingAPI_SDK_php_____Messaging_API___Python_SDK_httpsgithub_comtelstraMessagingAPI_SDK_python_____Messaging_API___Ruby_SDK_httpsgithub_comtelstraMessagingAPI_SDK_ruby_____Messaging_API___NodeJS_SDK_httpsgithub_comtelstraMessagingAPI_SDK_node_____Messaging_API____Net2_SDK_httpsgithub_comtelstraMessagingAPI_SDK_dotnet_____Messaging_API___Java_SDK_httpsgithub_comtelstraMessagingAPI_SDK_Java_Blog_PostsFor_more_information_on_the_Messaging_API_you_can_read_these_blog_posts___Callbacks_Part_1_httpsdev_telstra_comcontentunderstanding_messaging_api_callbacks_part_1____Callbacks_Part_2_httpsdev_telstra_comcontentunderstanding_messaging_api_callbacks_part_2.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var TelstraMessaging = require('index'); // See note below*.
   * var xxxSvc = new TelstraMessaging.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new TelstraMessaging.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new TelstraMessaging.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new TelstraMessaging.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 1.0.4.1
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The DeleteNumberRequest model constructor.
     * @property {module:model/DeleteNumberRequest}
     */
    DeleteNumberRequest: DeleteNumberRequest,
    /**
     * The GetSubscriptionResponse model constructor.
     * @property {module:model/GetSubscriptionResponse}
     */
    GetSubscriptionResponse: GetSubscriptionResponse,
    /**
     * The InboundPollResponse model constructor.
     * @property {module:model/InboundPollResponse}
     */
    InboundPollResponse: InboundPollResponse,
    /**
     * The MMSContent model constructor.
     * @property {module:model/MMSContent}
     */
    MMSContent: MMSContent,
    /**
     * The Message model constructor.
     * @property {module:model/Message}
     */
    Message: Message,
    /**
     * The MessageSentResponse model constructor.
     * @property {module:model/MessageSentResponse}
     */
    MessageSentResponse: MessageSentResponse,
    /**
     * The OAuthResponse model constructor.
     * @property {module:model/OAuthResponse}
     */
    OAuthResponse: OAuthResponse,
    /**
     * The OutboundPollResponse model constructor.
     * @property {module:model/OutboundPollResponse}
     */
    OutboundPollResponse: OutboundPollResponse,
    /**
     * The ProvisionNumberRequest model constructor.
     * @property {module:model/ProvisionNumberRequest}
     */
    ProvisionNumberRequest: ProvisionNumberRequest,
    /**
     * The ProvisionNumberResponse model constructor.
     * @property {module:model/ProvisionNumberResponse}
     */
    ProvisionNumberResponse: ProvisionNumberResponse,
    /**
     * The SendMmsRequest model constructor.
     * @property {module:model/SendMmsRequest}
     */
    SendMmsRequest: SendMmsRequest,
    /**
     * The SendSMSRequest model constructor.
     * @property {module:model/SendSMSRequest}
     */
    SendSMSRequest: SendSMSRequest,
    /**
     * The Status model constructor.
     * @property {module:model/Status}
     */
    Status: Status,
    /**
     * The AuthenticationApi service constructor.
     * @property {module:api/AuthenticationApi}
     */
    AuthenticationApi: AuthenticationApi,
    /**
     * The MessagingApi service constructor.
     * @property {module:api/MessagingApi}
     */
    MessagingApi: MessagingApi,
    /**
     * The ProvisioningApi service constructor.
     * @property {module:api/ProvisioningApi}
     */
    ProvisioningApi: ProvisioningApi
  };

  return exports;
}));
