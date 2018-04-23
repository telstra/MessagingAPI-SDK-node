/**
 * Telstra Messaging API
 *  # Introduction  Send and receive SMS and MMS messages globally using Telstraâ€™s enterprise grade Messaging API. It also allows your application to track the delivery status of both sent and received messages. Get your dedicated Australian number, and start sending and receiving messages today.  # Features  <p>The Telstra Messaging API provides the features below. <table>   <thead>     <tr>       <th>Feature</th>       <th>Description</th>     </tr>   </thead>   <tbody>     <tr>       <td><code>Dedicated Number</code></td>       <td>Provision a mobile number for your account to be used as from address in the API</td>     </tr>     <tr>       <td><code>Send Messages</code></td>       <td>Sending SMS or MMS messages</td>     </tr>     <tr>       <td><code>Receive Messages</code></td>       <td>Telstra will deliver messages sent to a dedicated number or to the <code>notifyURL</code> defined by you</td>     </tr>     <tr>       <td><code>Broadcast Messages</code></td>       <td>Invoke a single API to send a message to a list of number provided in <code>to</code></td>     </tr>     <tr>       <td><code>Delivery Status</code></td>       <td>Query the delivery status of your messages</td>     </tr>     <tr>       <td><code>Callbacks</code></td>       <td>Provide a notification URL and Telstra will notify your app when messages status changes</td>     </tr>     <tr>       <td><code>Alphanumeric Identifier</code></td>       <td>Differentiate yourself by providing an alphanumeric string in <code>from</code>. This feature is only available on paid plans</td>     </tr>     <tr>       <td><code>Concatenation</code></td>       <td>Send messages up to 1900 characters long and Telstra will automaticaly segment and reassemble them</td>     </tr>     <tr>       <td><code>Reply Request</code></td>       <td>Create a chat session by associating <code>messageId</code> and <code>to</code> number to track responses received from a mobile number. We will store this association for 8 days</td>     </tr>     <tr>       <td><code>Character set</code></td>       <td>Accepts all Unicode characters as part of UTF-8</td>     </tr>     <tr>       <td><code>Bounce-back response</code></td>       <td>See if your SMS hits an unreachable or unallocated number (Australia Only)</td>     </tr>     <tr>       <td><code>Queuing</code></td>       <td>Messaging API will automatically queue and deliver each message at a compliant rate.</td>     </tr>     <tr>       <td><code>Emoji Encoding</code></td>       <td>The API supports the encoding of the full range of emojis. Emojis in the reply messages will be in their UTF-8 format.</td>     </tr>   </tbody> </table>   # Getting Access to the API  <ol>   <li>Register at <a href=\"https://dev.telstra.com\">https://dev.telstra.com</a>.   <li>After registration, login to <a href=\"https://dev.telstra.com\">https://dev.telstra.com</a>        and navigate to the &quot;My apps&quot; page.    <li>Create your application by clicking the &quot;Add new app&quot; button    <li>Select &quot;API Free Trial&quot; Product when configuring your application. This Product includes the Telstra Messaging API as well as other APIs. Your application will be approved automatically.   <li>There is a maximum of 1000 free messages per developer. Additional messages and features can be purchased from <a href=\"https://dev.telstra.com\">https://dev.telstra.com</a>.   <li>Note your <code>Client key</code> and <code>Client secret</code> as these will be needed to provision a number for your application and for authentication. </ol>  <p>Now head over to <b>Getting Started</b> where you can find a postman collection as well as some links to sample apps and SDKs to get you started. <p>Happy Messaging!   # Getting Started  <p>Below are the steps to get started with the Telstra Messaging API.</p>    <ol>     <li>Generate OAuth2 Token using your <code>Client key</code> and <code>Client secret</code>.</li>     <li>Create Subscription in order to receive a provisioned number.</li>     <li>Send Message to a specific mobile number.</li>   </ol>    <h2>Run in Postman</h2>    <p><a   href=\"https://app.getpostman.com/run-collection/ded00578f69a9deba256#?env%5BMessaging%20API%20Environments%5D=W3siZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X2lkIiwidmFsdWUiOiIiLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X3NlY3JldCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImFjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Imhvc3QiLCJ2YWx1ZSI6InRhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiQXV0aG9yaXphdGlvbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Im9hdXRoX2hvc3QiLCJ2YWx1ZSI6InNhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoibWVzc2FnZV9pZCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifV0=\">   <img src=\"https://run.pstmn.io/button.svg\" alt=\"Run in Postman\" /></a></p>    <h2>Sample Apps</h2>   - <a href=\"https://github.com/telstra/MessagingAPI-perl-sample-app\">Perl Sample App</a>   - <a href=\"https://github.com/telstra/messaging-sample-code-happy-chat\">Happy Chat App</a>   - <a href=\"https://github.com/developersteve/telstra-messaging-php\">PHP Sample App</a>    <h2>SDK repos</h2>   - <a href=\"https://github.com/telstra/MessagingAPI-SDK-php\">Messaging API - PHP SDK</a>   - <a href=\"https://github.com/telstra/MessagingAPI-SDK-python\">Messaging API - Python SDK</a>   - <a href=\"https://github.com/telstra/MessagingAPI-SDK-ruby\">Messaging API - Ruby SDK</a>   - <a href=\"https://github.com/telstra/MessagingAPI-SDK-node\">Messaging API - NodeJS SDK</a>   - <a href=\"https://github.com/telstra/MessagingAPI-SDK-dotnet\">Messaging API - .Net2 SDK</a>   - <a href=\"https://github.com/telstra/MessagingAPI-SDK-Java\">Messaging API - Java SDK</a>  # Delivery Notification  The API provides several methods for notifying when a message has been delivered to the destination.  <ol>   <li>When you provision a number there is an opportunity to specify a <code>notifyURL</code>, when the message has been delivered the API will make a call to this URL to advise of the message status. If this is not provided then you can make use the Get Replies API to poll for messages.</li>   <li>If you do not specify a URL you can always call the <code>GET /sms</code> API get the latest replies to the message.</li> </ol>  <I>Please note that the notification URLs and the polling call are exclusive. If a notification URL has been set then the polling call will not provide any useful information.</I>  <h2>Notification URL Format</h2>  When a message has reached its final state, the API will send a POST to the URL that has been previously specified.   <h3>Notification URL Format for SMS</h3> <pre><code class=\"language-sh\">{     to: '+61418123456'     sentTimestamp: '2017-03-17T10:05:22+10:00'     receivedTimestamp: '2017-03-17T10:05:23+10:00'     messageId: /cccb284200035236000000000ee9d074019e0301/1261418123456     deliveryStatus: DELIVRD   } </code></pre> \\ The fields are:  <table>   <thead>     <tr>       <th>Field</th>       <th>Description</th>     </tr>   </thead>   <tbody>     <tr>       <td><code>to</code></td>       <td>The number the message was sent to.</td>     </tr>     <tr>       <td><code>receivedTimestamp</code></td>       <td>Time the message was sent to the API.</td>     </tr>     <tr>       <td><code>sentTimestamp</code></td>       <td>Time handling of the message ended.</td>     </tr>     <tr>       <td><code>deliveryStatus</code></td>       <td>The final state of the message.</td>     </tr>     <tr>       <td><code>messageId</code></td>       <td>The same reference that was returned when the original message was sent.</td>     </tr>     <tr>       <td><code>receivedTimestamp</code></td>       <td>Time the message was sent to the API.</td>     </tr>   </tbody> </table>  Upon receiving this call it is expected that your servers will give a 204 (No Content) response. Anything else will cause the API to reattempt the call 5 minutes later.   <h3>Notification URL Format for SMS Replies</h3> <pre><code class=\"language-sh\">{     \"status\": \"RECEIVED\"     \"destinationAddress\": \"+61418123456\"     \"senderAddress\": \"+61421987654\"     \"message\": \"Foo\"             \"sentTimestamp\": \"2018-03-23T12:10:06+10:00\"   }                              </code></pre>  \\ The fields are:  <table>   <thead>     <tr>       <th>Field</th>       <th>Description</th>     </tr>   </thead>   <tbody>     <tr>       <td><code>status</code></td>       <td>The final state of the message.</td>     </tr>     <tr>       <td><code>destinationAddress</code></td>       <td>The number the message was sent to.</td>     </tr>     <tr>       <td><code>senderAddress</code></td>       <td>The number the message was sent from.</td>     </tr>     <tr>       <td><code>message</code></td>       <td>The sontent of the SMS reply.</td>     </tr>     <tr>       <td><code>sentTimestamp</code></td>       <td>Time handling of the message ended.</td>     </tr>   </tbody> </table>  <h3>Notification URL Format for MMS Replies</h3> <pre><code class=\"language-sh\">{     \"status\": \"RECEIVED\",     \"destinationAddress\": \"+61418123456\",     \"senderAddress\": \"+61421987654\",     \"subject\": \"Foo\",     \"sentTimestamp\": \"2018-03-23T12:15:45+10:00\",     \"envelope\": \"string\",     \"MMSContent\":      [       {         \"type\": \"application/smil\",         \"filename\": \"smil.xml\",         \"payload\": \"string\"       },        {         \"type\": \"image/jpeg\",         \"filename\": \"sample.jpeg\",         \"payload\": \"string\"        }      ]    } </code></pre>  \\ The fields are:  <table>   <thead>     <tr>       <th>Field</th>       <th>Description</th>     </tr>   </thead>   <tbody>     <tr>       <td><code>status</code></td>       <td>The final state of the message.</td>     </tr>     <tr>       <td><code>destinationAddress</code></td>       <td>The number the message was sent to.</td>     </tr>     <tr>       <td><code>senderAddress</code></td>       <td>The number the message was sent from.</td>     </tr>     <tr>       <td><code>subject</code></td>       <td>The subject assigned to the message.</td>     </tr>     <tr>       <td><code>sentTimestamp</code></td>       <td>Time handling of the message ended.</td>     </tr>     <tr>       <td><code>envelope</code></td>       <td>Information about about terminal type and originating operator.</td>     </tr>     <tr>       <td><code>MMSContent</code></td>       <td>An array of the actual content of the reply message.</td>     </tr>     <tr>       <td><code>type</code></td>       <td>The content type of the message.</td>     </tr>     <tr>       <td><code>filename</code></td>       <td>The filename for the message content.</td>     </tr>     <tr>       <td><code>payload</code></td>       <td>The content of the message.</td>     </tr>   </tbody> </table>  # Frequently Asked Questions **Q: Can I send a broadcast message using the Telstra Messging API?** A. Yes. Recipient numbers can be in teh form of an array of strings if a broadcast message needs to be sent.  <h2>Notes</h2> <a href=\"http://petstore.swagger.io/?url=https://raw.githubusercontent.com/telstra/MessagingAPI-v2/master/docs/swagger/messaging-api-swagger.yaml\" target=\"_blank\">View messaging in Swagger UI</a>
 *
 * OpenAPI spec version: 2.2.6
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
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
   * _IntroductionSend_and_receive_SMS_and_MMS_messages_globally_using_Telstras_enterprise_grade_Messaging_API_It_also_allows_your_application_to_track_the_delivery_status_of_both_sent_and_received_messages_Get_your_dedicated_Australian_number_and_start_sending_and_receiving_messages_today__FeaturespThe_Telstra_Messaging_API_provides_the_features_below_table__thead____tr______thFeatureth______thDescriptionth____tr__thead__tbody____tr______tdcodeDedicated_Numbercodetd______tdProvision_a_mobile_number_for_your_account_to_be_used_as_from_address_in_the_APItd____tr____tr______tdcodeSend_Messagescodetd______tdSending_SMS_or_MMS_messagestd____tr____tr______tdcodeReceive_Messagescodetd______tdTelstra_will_deliver_messages_sent_to_a_dedicated_number_or_to_the_codenotifyURLcode_defined_by_youtd____tr____tr______tdcodeBroadcast_Messagescodetd______tdInvoke_a_single_API_to_send_a_message_to_a_list_of_number_provided_in_codetocodetd____tr____tr______tdcodeDelivery_Statuscodetd______tdQuery_the_delivery_status_of_your_messagestd____tr____tr______tdcodeCallbackscodetd______tdProvide_a_notification_URL_and_Telstra_will_notify_your_app_when_messages_status_changestd____tr____tr______tdcodeAlphanumeric_Identifiercodetd______tdDifferentiate_yourself_by_providing_an_alphanumeric_string_in_codefromcode__This_feature_is_only_available_on_paid_planstd____tr____tr______tdcodeConcatenationcodetd______tdSend_messages_up_to_1900_characters_long_and_Telstra_will_automaticaly_segment_and_reassemble_themtd____tr____tr______tdcodeReply_Requestcodetd______tdCreate_a_chat_session_by_associating_codemessageIdcode_and_codetocode_number_to_track_responses_received_from_a_mobile_number__We_will_store_this_association_for_8_daystd____tr____tr______tdcodeCharacter_setcodetd______tdAccepts_all_Unicode_characters_as_part_of_UTF_8td____tr____tr______tdcodeBounce_back_responsecodetd______tdSee_if_your_SMS_hits_an_unreachable_or_unallocated_number__Australia_Onlytd____tr____tr______tdcodeQueuingcodetd______tdMessaging_API_will_automatically_queue_and_deliver_each_message_at_a_compliant_rate_td____tr____tr______tdcodeEmoji_Encodingcodetd______tdThe_API_supports_the_encoding_of_the_full_range_of_emojis__Emojis_in_the_reply_messages_will_be_in_their_UTF_8_format_td____tr__tbodytable_Getting_Access_to_the_APIol__liRegister_at_a_hrefhttpsdev_telstra_comhttpsdev_telstra_coma___liAfter_registration_login_to_a_hrefhttpsdev_telstra_comhttpsdev_telstra_coma_______and_navigate_to_the_quotMy_appsquot_page____liCreate_your_application_by_clicking_the_quotAdd_new_appquot_button___liSelect_quotAPI_Free_Trialquot_Product_when_configuring_your_application__This_Product_includes_the_Telstra_Messaging_API_as_well_as_other_APIs__Your_application_will_be_approved_automatically___liThere_is_a_maximum_of_1000_free_messages_per_developer__Additional_messages_and_features_can_be_purchased_from_a_hrefhttpsdev_telstra_comhttpsdev_telstra_coma___liNote_your_codeClient_keycode_and_codeClient_secretcode_as_these_will_be_needed_to_provision_a_number_for_your_application_and_for_authentication_olpNow_head_over_to_bGetting_Startedb_where_you_can_find_a_postmancollection_as_well_as_some_links_to_sample_apps_and_SDKs_to_get_you_started_pHappy_Messaging_Getting_StartedpBelow_are_the_steps_to_get_started_with_the_Telstra_Messaging_API_p__ol____liGenerate_OAuth2_Token_using_your_codeClient_keycode_and_codeClient_secretcode_li____liCreate_Subscription_in_order_to_receive_a_provisioned_number_li____liSend_Message_to_a_specific_mobile_number_li__ol__h2Run_in_Postmanh2__pa__hrefhttpsapp_getpostman_comrun_collectionded00578f69a9deba256env5BMessaging20API20Environments5DW3siZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X2lkIiwidmFsdWUiOiIiLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X3NlY3JldCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImFjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Imhvc3QiLCJ2YWx1ZSI6InRhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiQXV0aG9yaXphdGlvbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Im9hdXRoX2hvc3QiLCJ2YWx1ZSI6InNhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoibWVzc2FnZV9pZCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifV0__img_srchttpsrun_pstmn_iobutton_svg_altRun_in_Postman_ap__h2Sample_Appsh2____a_hrefhttpsgithub_comtelstraMessagingAPI_perl_sample_appPerl_Sample_Appa____a_hrefhttpsgithub_comtelstramessaging_sample_code_happy_chatHappy_Chat_Appa____a_hrefhttpsgithub_comdeveloperstevetelstra_messaging_phpPHP_Sample_Appa__h2SDK_reposh2____a_hrefhttpsgithub_comtelstraMessagingAPI_SDK_phpMessaging_API___PHP_SDKa____a_hrefhttpsgithub_comtelstraMessagingAPI_SDK_pythonMessaging_API___Python_SDKa____a_hrefhttpsgithub_comtelstraMessagingAPI_SDK_rubyMessaging_API___Ruby_SDKa____a_hrefhttpsgithub_comtelstraMessagingAPI_SDK_nodeMessaging_API___NodeJS_SDKa____a_hrefhttpsgithub_comtelstraMessagingAPI_SDK_dotnetMessaging_API____Net2_SDKa____a_hrefhttpsgithub_comtelstraMessagingAPI_SDK_JavaMessaging_API___Java_SDKa_Delivery_NotificationThe_API_provides_several_methods_for_notifying_when_a_message_has_been_delivered_to_the_destination_ol__liWhen_you_provision_a_number_there_is_an_opportunity_to_specify_a_codenotifyURLcode_when_the_message_has_been_delivered_the_API_will_make_a_call_to_this_URL_to_advise_of_the_message_status__If_this_is_not_provided_then_you_can_make_use_the_Get_Replies_API_to_poll_for_messages_li__liIf_you_do_not_specify_a_URL_you_can_always_call_the_codeGET_smscode_API_get_the_latest_replies_to_the_message_liolIPlease_note_that_the_notification_URLs_and_the_polling_call_are_exclusive__If_a_notification_URL_has_been_set_then_the_polling_call_will_not_provide_any_useful_information_Ih2Notification_URL_Formath2When_a_message_has_reached_its_final_state_the_API_will_send_a_POST_to_the_URL_that_has_been_previously_specified__h3Notification_URL_Format_for_SMSh3precode_classlanguage_sh____to_61418123456____sentTimestamp_2017_03_17T1005221000____receivedTimestamp_2017_03_17T1005231000____messageId_cccb284200035236000000000ee9d074019e03011261418123456____deliveryStatus_DELIVRD__codepreThe_fields_are_table__thead____tr______thFieldth______thDescriptionth____tr__thead__tbody____tr______tdcodetocodetd______tdThe_number_the_message_was_sent_to_td____tr____tr______tdcodereceivedTimestampcodetd______tdTime_the_message_was_sent_to_the_API_td____tr____tr______tdcodesentTimestampcodetd______tdTime_handling_of_the_message_ended_td____tr____tr______tdcodedeliveryStatuscodetd______tdThe_final_state_of_the_message_td____tr____tr______tdcodemessageIdcodetd______tdThe_same_reference_that_was_returned_when_the_original_message_was_sent_td____tr____tr______tdcodereceivedTimestampcodetd______tdTime_the_message_was_sent_to_the_API_td____tr__tbodytableUpon_receiving_this_call_it_is_expected_that_your_servers_will_give_a_204__No_Content_response__Anything_else_will_cause_the_API_to_reattempt_the_call_5_minutes_later_h3Notification_URL_Format_for_SMS_Repliesh3precode_classlanguage_sh____status_RECEIVED____destinationAddress_61418123456____senderAddress_61421987654____message_Foo____________sentTimestamp_2018_03_23T1210061000_______________________________codepreThe_fields_are_table__thead____tr______thFieldth______thDescriptionth____tr__thead__tbody____tr______tdcodestatuscodetd______tdThe_final_state_of_the_message_td____tr____tr______tdcodedestinationAddresscodetd______tdThe_number_the_message_was_sent_to_td____tr____tr______tdcodesenderAddresscodetd______tdThe_number_the_message_was_sent_from_td____tr____tr______tdcodemessagecodetd______tdThe_sontent_of_the_SMS_reply_td____tr____tr______tdcodesentTimestampcodetd______tdTime_handling_of_the_message_ended_td____tr__tbodytableh3Notification_URL_Format_for_MMS_Repliesh3precode_classlanguage_sh____status_RECEIVED____destinationAddress_61418123456____senderAddress_61421987654____subject_Foo____sentTimestamp_2018_03_23T1215451000____envelope_string____MMSContent____________________type_applicationsmil________filename_smil_xml________payload_string_____________________type_imagejpeg________filename_sample_jpeg________payload_string_______________codepreThe_fields_are_table__thead____tr______thFieldth______thDescriptionth____tr__thead__tbody____tr______tdcodestatuscodetd______tdThe_final_state_of_the_message_td____tr____tr______tdcodedestinationAddresscodetd______tdThe_number_the_message_was_sent_to_td____tr____tr______tdcodesenderAddresscodetd______tdThe_number_the_message_was_sent_from_td____tr____tr______tdcodesubjectcodetd______tdThe_subject_assigned_to_the_message_td____tr____tr______tdcodesentTimestampcodetd______tdTime_handling_of_the_message_ended_td____tr____tr______tdcodeenvelopecodetd______tdInformation_about_about_terminal_type_and_originating_operator_td____tr____tr______tdcodeMMSContentcodetd______tdAn_array_of_the_actual_content_of_the_reply_message_td____tr____tr______tdcodetypecodetd______tdThe_content_type_of_the_message_td____tr____tr______tdcodefilenamecodetd______tdThe_filename_for_the_message_content_td____tr____tr______tdcodepayloadcodetd______tdThe_content_of_the_message_td____tr__tbodytable_Frequently_Asked_QuestionsQ_Can_I_send_a_broadcast_message_using_the_Telstra_Messging_APIA__Yes__Recipient_numbers_can_be_in_teh_form_of_an_array_of_strings_if_a_broadcast_message_needs_to_be_sent_h2Notesh2a_hrefhttppetstore_swagger_iourlhttpsraw_githubusercontent_comtelstraMessagingAPI_v2masterdocsswaggermessaging_api_swagger_yaml_target_blankView_messaging_in_Swagger_UIa.<br>
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
   * @version 1.0.4
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
