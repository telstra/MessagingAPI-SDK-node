/**
 * Telstra Messaging API
 *  # Introduction  Send and receive SMS and MMS messages globally using Telstraâ€™s enterprise grade Messaging API. It also allows your application to track the delivery status of both sent and received messages. Get your dedicated Australian number, and start sending and receiving messages today.  # Features  The Telstra Messaging API provides the features below. | Feature | Description | | --- | --- | | `Dedicated Number` | Provision a mobile number for your account to be used as `from` address in the API | | `Send Messages` | Sending SMS or MMS messages | | `Receive Messages` | Telstra will deliver messages sent to a dedicated number or to the `notifyURL` defined by you | | `Broadcast Messages` | Invoke a single API call to send a message to a list of numbers provided in `to` | | `Delivery Status` | Query the delivery status of your messages | | `Callbacks` | Provide a notification URL and Telstra will notify your app when a message status changes | | `Alphanumeric Identifier` | Differentiate yourself by providing an alphanumeric string in `from`. This feature is only available on paid plans | | `Concatenation` | Send messages up to 1900 characters long and Telstra will automaticaly segment and reassemble them | | `Reply Request` | Create a chat session by associating `messageId` and `to` number to track responses received from a mobile number. We will store this association for 8 days | | `Character set` | Accepts all Unicode characters as part of UTF-8 | | `Bounce-back response` | See if your SMS hits an unreachable or unallocated number (Australia Only) | | `Queuing` | Messaging API will automatically queue and deliver each message at a compliant rate. | | `Emoji Encoding` | The API supports the encoding of the full range of emojis. Emojis in the reply messages will be in their UTF-8 format. |  ## Delivery Notification or Callbacks  The API provides several methods for notifying when a message has been delivered to the destination.  1. When you send a message there is an opportunity to specify a `notifyURL`. Once the message has been delivered the API will make a call to this URL to advise of the message status. 2. If you do not specify a URL you can always call the `GET /status` API to get the status of the message.  # Getting Access to the API  1. Register at [https://dev.telstra.com](https://dev.telstra.com). 2. After registration, login to [https://dev.telstra.com](https://dev.telstra.com) and navigate to the **My apps** page. 3. Create your application by clicking the **Add new app** button 4. Select **API Free Trial** Product when configuring your application. This Product includes the Telstra Messaging API as well as other free trial APIs. Your application will be approved automatically. 5. There is a maximum of 1000 free messages per developer. Additional messages and features can be purchased from [https://dev.telstra.com](https://dev.telstra.com). 6. Note your `Client key` and `Client secret` as these will be needed to provision a number for your application and for authentication.  Now head over to **Getting Started** where you can find a postman collection as well as some links to sample apps and SDKs to get you started. Happy Messaging!  # Frequently Asked Questions  **Q: Is creating a subscription via the Provisioning call a required step?** A. Yes. You will only be able to start sending messages if you have a provisioned dedicated number. Use Provisioning to create a dedicated number subscription, or renew your dedicated number if it has expired.  **Q: When trying to send an SMS I receive a `400 Bad Request` response. How can I fix this?** A. You need to make sure you have a provisioned dedicated number before you can send an SMS.  If you do not have a provisioned dedicated number and you try to send a message via the API, you will get the error below in the response:  <pre><code class=\"language-sh\">{   \"status\":\"400\",   \"code\":\"DELIVERY-IMPOSSIBLE\",   \"message\":\"Invalid \\'from\\' address specified\" }</code></pre>  Use Provisioning to create a dedicated number subscription, or renew your dedicated number if it has expired.  **Q: How long does my dedicated number stay active for?** A. When you provision a dedicated number, by default it will be active for 30-days. You can use the `activeDays` parameter during the provisioning call to increment or decrement the number of days your dedicated number will remain active.  **Q: Can I send a broadcast message using the Telstra Messaging API?** A. Yes. Recipient numbers can be in the form of an array of strings if a broadcast message needs to be sent, allowing you to send to multiple mobile numbers in one API call.   A sample request body for this will be: `{\"to\":[\"+61412345678\",\"+61487654321\"],\"body\":\"Test Message\"}`  **Q: Can I use `Alphanumeric Identifier` from my paid plan via credit card?** A. `Alphanumeric Identifier` is only available on Telstra Account paid plans, not through credit card paid plans.  **Q: What is the maximum sized MMS that I can send?** A. This will depend on the carrier that will receive the MMS. For Telstra it's up to 2MB,  Optus up to 1.5MB and Vodafone only allows up to 500kB. You will need to check with international carriers for thier MMS size limits.  **Q: How is the size of an MMS calculated?** A. Images are scaled up to approximately 4/3 when base64 encoded. Additionally, there is approximately 200 bytes of overhead on each MMS. Assuming the maximum MMS that can be sent on Telstraâ€™s network is 2MB, then the maximum image size that can be sent will be approximately 1.378MB (1.378 x 1.34 + 200, without SOAP encapsulation).  **Q: How is an MMS classified as Small or Large?** A. MMSes with size below 600kB are classed as Small whereas those that are bigger than 600kB are classed as Large. They will be charged accordingly.  **Q: Are SMILs supported by the Messaging API?** A. While there will be no error if you send an MMS with a SMIL presentation, the actual layout or sequence defined in the SMIL may not display as expected because most of the new smartphone devices ignore the SMIL presentation layer. SMIL was used in feature phones which had limited capability and SMIL allowed a *powerpoint type* presentation to be provided. Smartphones now have the capability to display video which is the better option for presentations. It is recommended that MMS messages should just drop the SMIL.  **Q: How do I assign a delivery notification or callback URL?** A. You can assign a delivery notification or callback URL by adding the `notifyURL` parameter in the body of the request when you send a message. Once the message has been delivered, a notification will then be posted to this callback URL.  **Q: What is the difference between the `notifyURL` parameter in the Provisoning call versus the `notifyURL` parameter in the Send Message call?** A. The `notifyURL` in the Provisoning call will be the URL where replies to the provisioned number will be posted. On the other hand, the `notifyURL` in the Send Message call will be the URL where the delivery notification will be posted, e.g. when an SMS has already been delivered to the recipient.  # Getting Started  Below are the steps to get started with the Telstra Messaging API.   1. Generate an OAuth2 token using your `Client key` and `Client secret`.   2. Use the Provisioning call to create a subscription and receive a dedicated number.   3. Send a message to a specific mobile number.  ## Run in Postman <a href=\"https://app.getpostman.com/run-collection/ded00578f69a9deba256#?env%5BMessaging%20API%20Environments%5D=W3siZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X2lkIiwidmFsdWUiOiIiLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiY2xpZW50X3NlY3JldCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImFjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Imhvc3QiLCJ2YWx1ZSI6InRhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoiQXV0aG9yaXphdGlvbiIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6Im9hdXRoX2hvc3QiLCJ2YWx1ZSI6InNhcGkudGVsc3RyYS5jb20iLCJ0eXBlIjoidGV4dCJ9LHsiZW5hYmxlZCI6dHJ1ZSwia2V5IjoibWVzc2FnZV9pZCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifV0=\"><img src=\"https://run.pstmn.io/button.svg\" alt=\"Run in Postman\"/></a>  ## Sample Apps   - [Perl Sample App](https://github.com/telstra/MessagingAPI-perl-sample-app)   - [Happy Chat App](https://github.com/telstra/messaging-sample-code-happy-chat)   - [PHP Sample App](https://github.com/developersteve/telstra-messaging-php)  ## SDK Repos   - [Messaging API - PHP SDK](https://github.com/telstra/MessagingAPI-SDK-php)   - [Messaging API - Python SDK](https://github.com/telstra/MessagingAPI-SDK-python)   - [Messaging API - Ruby SDK](https://github.com/telstra/MessagingAPI-SDK-ruby)   - [Messaging API - NodeJS SDK](https://github.com/telstra/MessagingAPI-SDK-node)   - [Messaging API - .Net2 SDK](https://github.com/telstra/MessagingAPI-SDK-dotnet)   - [Messaging API - Java SDK](https://github.com/telstra/MessagingAPI-SDK-Java)  ## Blog Posts For more information on the Messaging API, you can read these blog posts: - [Callbacks Part 1](https://dev.telstra.com/content/understanding-messaging-api-callbacks-part-1)  - [Callbacks Part 2](https://dev.telstra.com/content/understanding-messaging-api-callbacks-part-2) 
 *
 * OpenAPI spec version: 2.2.7
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 *
 * OpenAPI Generator version: 3.0.3
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/InboundPollResponse', 'model/MMSContent', 'model/MessageSentResponse', 'model/OutboundPollResponse', 'model/SendMmsRequest', 'model/SendSMSRequest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/InboundPollResponse'), require('../model/MMSContent'), require('../model/MessageSentResponse'), require('../model/OutboundPollResponse'), require('../model/SendMmsRequest'), require('../model/SendSMSRequest'));
  } else {
    // Browser globals (root is window)
    if (!root.TelstraMessaging) {
      root.TelstraMessaging = {};
    }
    root.TelstraMessaging.MessagingApi = factory(root.TelstraMessaging.ApiClient, root.TelstraMessaging.InboundPollResponse, root.TelstraMessaging.MMSContent, root.TelstraMessaging.MessageSentResponse, root.TelstraMessaging.OutboundPollResponse, root.TelstraMessaging.SendMmsRequest, root.TelstraMessaging.SendSMSRequest);
  }
}(this, function(ApiClient, InboundPollResponse, MMSContent, MessageSentResponse, OutboundPollResponse, SendMmsRequest, SendSMSRequest) {
  'use strict';

  /**
   * Messaging service.
   * @module api/MessagingApi
   * @version 1.0.5
   */

  /**
   * Constructs a new MessagingApi. 
   * @alias module:api/MessagingApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getMMSStatus operation.
     * @callback module:api/MessagingApi~getMMSStatusCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/OutboundPollResponse>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get MMS Status
     * Get MMS Status
     * @param {String} messageid Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/mms 
     * @param {module:api/MessagingApi~getMMSStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/OutboundPollResponse>}
     */
    this.getMMSStatus = function(messageid, callback) {
      var postBody = null;

      // verify the required parameter 'messageid' is set
      if (messageid === undefined || messageid === null) {
        throw new Error("Missing the required parameter 'messageid' when calling getMMSStatus");
      }


      var pathParams = {
        'messageid': messageid
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['auth'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [OutboundPollResponse];

      return this.apiClient.callApi(
        '/messages/mms/{messageid}/status', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getSMSStatus operation.
     * @callback module:api/MessagingApi~getSMSStatusCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/OutboundPollResponse>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get SMS Status
     * If no notification URL has been specified, it is possible to poll for the message status. Note that the &#x60;MessageId&#x60; that appears in the URL must be URL encoded. Just copying the &#x60;MessageId&#x60; as it was supplied when submitting the message may not work.  SMS Status with Notification URL --- When a message has reached its final state, the API will send a POST to the URL that has been previously specified. &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{     to: &#39;+61418123456&#39;     sentTimestamp: &#39;2017-03-17T10:05:22+10:00&#39;     receivedTimestamp: &#39;2017-03-17T10:05:23+10:00&#39;     messageId: /cccb284200035236000000000ee9d074019e0301/1261418123456     deliveryStatus: DELIVRD   } &lt;/code&gt;&lt;/pre&gt;  The fields are: &lt;table&gt;   &lt;thead&gt;     &lt;tr&gt;       &lt;th&gt;Field&lt;/th&gt;       &lt;th&gt;Description&lt;/th&gt;     &lt;/tr&gt;   &lt;/thead&gt;   &lt;tbody&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;to&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;The number the message was sent to.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;receivedTimestamp&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;Time the message was sent to the API.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;sentTimestamp&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;Time handling of the message ended.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;deliveryStatus&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;The final state of the message.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;messageId&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;The same reference that was returned when the original message was sent.&lt;/td&gt;     &lt;/tr&gt;     &lt;tr&gt;       &lt;td&gt;&lt;code&gt;receivedTimestamp&lt;/code&gt;&lt;/td&gt;       &lt;td&gt;Time the message was sent to the API.&lt;/td&gt;     &lt;/tr&gt;   &lt;/tbody&gt; &lt;/table&gt;  Upon receiving this call it is expected that your servers will give a 204 (No Content) response. Anything else will cause the API to reattempt the call 5 minutes later. 
     * @param {String} messageId Unique identifier of a message - it is the value returned from a previous POST call to https://api.telstra.com/v2/messages/sms. 
     * @param {module:api/MessagingApi~getSMSStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/OutboundPollResponse>}
     */
    this.getSMSStatus = function(messageId, callback) {
      var postBody = null;

      // verify the required parameter 'messageId' is set
      if (messageId === undefined || messageId === null) {
        throw new Error("Missing the required parameter 'messageId' when calling getSMSStatus");
      }


      var pathParams = {
        'messageId': messageId
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['auth'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [OutboundPollResponse];

      return this.apiClient.callApi(
        '/messages/sms/{messageId}/status', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the retrieveMMSResponses operation.
     * @callback module:api/MessagingApi~retrieveMMSResponsesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/MMSContent>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve MMS Responses
     * Messages are retrieved one at a time, starting with the earliest response. If the subscription has a &#x60;notifyURL&#x60;, response messages will be logged there instead.  # Notification URL Format for MMS Replies  &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{   \&quot;status\&quot;: \&quot;RECEIVED\&quot;,   \&quot;destinationAddress\&quot;: \&quot;+61418123456\&quot;,   \&quot;senderAddress\&quot;: \&quot;+61421987654\&quot;,   \&quot;subject\&quot;: \&quot;Foo\&quot;,   \&quot;sentTimestamp\&quot;: \&quot;2018-03-23T12:15:45+10:00\&quot;,   \&quot;envelope\&quot;: \&quot;string\&quot;,   \&quot;MMSContent\&quot;:     [       {         \&quot;type\&quot;: \&quot;text/plain\&quot;,         \&quot;filename\&quot;: \&quot;text_1.txt\&quot;,         \&quot;payload\&quot;: \&quot;string\&quot;       },       {         \&quot;type\&quot;: \&quot;image/jpeg\&quot;,         \&quot;filename\&quot;: \&quot;sample.jpeg\&quot;,         \&quot;payload\&quot;: \&quot;string\&quot;       }     ] }&lt;/code&gt;&lt;/pre&gt;  The fields are: | Field | Description | | --- | --- | | &#x60;status&#x60; | The final state of the message. | | &#x60;destinationAddress&#x60; |The number the message was sent to. | | &#x60;senderAddress&#x60; | The number the message was sent from. | | &#x60;subject&#x60; | The subject assigned to the message. | | &#x60;sentTimestamp&#x60; | Time handling of the message ended. | | &#x60;envelope&#x60; | Information about about terminal type and originating operator. | | &#x60;MMSContent&#x60; | An array of the actual content of the reply message. | | &#x60;type&#x60; | The content type of the message. | | &#x60;filename&#x60; | The filename for the message content. | | &#x60;payload&#x60; | The content of the message. | 
     * @param {module:api/MessagingApi~retrieveMMSResponsesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/MMSContent>}
     */
    this.retrieveMMSResponses = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['auth'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [MMSContent];

      return this.apiClient.callApi(
        '/messages/mms', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the retrieveSMSResponses operation.
     * @callback module:api/MessagingApi~retrieveSMSResponsesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InboundPollResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve SMS Responses
     * Messages are retrieved one at a time, starting with the earliest response. The API supports the encoding of the full range of emojis in the reply message. The emojis will be in their UTF-8 format. If the subscription has a &#x60;notifyURL&#x60;, response messages will be logged there instead.  # Notification URL Format for SMS Response  &lt;pre&gt;&lt;code class&#x3D;\&quot;language-sh\&quot;&gt;{   \&quot;to\&quot;:\&quot;+61472880123\&quot;,   \&quot;from\&quot;:\&quot;+61412345678\&quot;,   \&quot;body\&quot;:\&quot;Foo4\&quot;,   \&quot;sentTimestamp\&quot;:\&quot;2018-04-20T14:24:35\&quot;,   \&quot;messageId\&quot;:\&quot;DMASApiA0000000146\&quot; }&lt;/code&gt;&lt;/pre&gt;  The fields are: | Field | Description | | --- |--- | | &#x60;to&#x60; | The number the message was sent to. | | &#x60;from&#x60; | The number the message was sent from. | | &#x60;body&#x60; | The content of the SMS response. | | &#x60;sentTimestamp&#x60; | Time handling of the message ended. | | &#x60;messageId&#x60; | The ID assigned to the message. | 
     * @param {module:api/MessagingApi~retrieveSMSResponsesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InboundPollResponse}
     */
    this.retrieveSMSResponses = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['auth'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = InboundPollResponse;

      return this.apiClient.callApi(
        '/messages/sms', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the sendMMS operation.
     * @callback module:api/MessagingApi~sendMMSCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MessageSentResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send MMS
     * Send MMS
     * @param {module:model/SendMmsRequest} sendMmsRequest A JSON or XML payload containing the recipient&#39;s phone number and MMS message. The recipient number should be in the format &#39;04xxxxxxxx&#39; where x is a digit.

     * @param {module:api/MessagingApi~sendMMSCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MessageSentResponse}
     */
    this.sendMMS = function(sendMmsRequest, callback) {
      var postBody = sendMmsRequest;

      // verify the required parameter 'sendMmsRequest' is set
      if (sendMmsRequest === undefined || sendMmsRequest === null) {
        throw new Error("Missing the required parameter 'sendMmsRequest' when calling sendMMS");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['auth'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = MessageSentResponse;

      return this.apiClient.callApi(
        '/messages/mms', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the sendSMS operation.
     * @callback module:api/MessagingApi~sendSMSCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MessageSentResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send SMS
     * Send an SMS Message to a single or multiple mobile number/s. 
     * @param {module:model/SendSMSRequest} sendSMSRequest A JSON or XML payload containing the recipient&#39;s phone number and text message. This number can be in international format if preceeded by a &#39;+&#39; or in national format (&#39;04xxxxxxxx&#39;) where x is a digit.

     * @param {module:api/MessagingApi~sendSMSCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MessageSentResponse}
     */
    this.sendSMS = function(sendSMSRequest, callback) {
      var postBody = sendSMSRequest;

      // verify the required parameter 'sendSMSRequest' is set
      if (sendSMSRequest === undefined || sendSMSRequest === null) {
        throw new Error("Missing the required parameter 'sendSMSRequest' when calling sendSMS");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['auth'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = MessageSentResponse;

      return this.apiClient.callApi(
        '/messages/sms', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
