/**
 * Telstra Messaging API
 *  # Introduction  <table><tbody><tr><td class = 'into_api' style='border:none;padding:0 0 0 0'><p>Send and receive SMS and MMS messages globally using Telstra's enterprise grade Messaging API. It also allows your application to track the delivery status of both sent and received messages. Get your dedicated Australian number, and start sending and receiving messages today.</p></td><td class = 'into_api_logo' style='width: 20%;border:none'><img class = 'api_logo' style='margin: -26px 0 0 0' src = 'https://test-dev.telstra.net/sites/default/files/messagingapi-icon.png'></td></tr></tbody></table>  # Features  The Telstra Messaging API provides the features below.  | Feature | Description | | --- | --- | | `Dedicated Number` | Provision a mobile number for your account to be used as `from` address in the API | | `Send Messages` | Sending SMS or MMS messages | | `Receive Messages` | Telstra will deliver messages sent to a dedicated number or to the `notifyURL` defined by you | | `Broadcast Messages` | Invoke a single API call to send a message to a list of numbers provided in `to` | | `Delivery Status` | Query the delivery status of your messages | | `Callbacks` | Provide a notification URL and Telstra will notify your app when a message status changes | | `Alphanumeric Identifier` | Differentiate yourself by providing an alphanumeric string in `from`. This feature is only available on Telstra Account paid plans and works on domestic, i.e. Australian, destinations only | | `Concatenation` | Send messages up to 1900 characters long and Telstra will automaticaly segment and reassemble them | | `Reply Request` | Create a chat session by associating `messageId` and `to` number to track responses received from a mobile number. We will store this association for 8 days | | `Character set` | Accepts all Unicode characters as part of UTF-8 | | `Bounce-back response` | See if your SMS hits an unreachable or unallocated number (Australia Only) | | `Queuing` | Messaging API will automatically queue and deliver each message at a compliant rate. | | `Emoji Encoding` | The API supports the encoding of the full range of emojis in the Basic Multilingual Plane. Support for emojis in the Supplementary Planes include those in the U+1F600 to U+1F6FF block. Emojis in the reply messages will be in their UTF-8 format |  ## Delivery Status: Notification/Callbacks vs Polling  The API provides two methods to confirm that a message has been delivered to the destination.  1. When you send a message there is an opportunity to specify a `notifyURL`. Once the message has been delivered, the API will make a call to this URL to advise of the message status. 2. If you do not specify a URL you can always call the `GET /status` API to get the status of the message.  # Getting Access to the API  1. Register at [https://dev.telstra.com](https://dev.telstra.com). 2. After registration, login to [https://dev.telstra.com](https://dev.telstra.com) and navigate to the **My apps** page. 3. Create your application by clicking the **Add new app** button 4. Select **API Free Trial** Product when configuring your application. This Product includes the Telstra Messaging API as well as other free trial APIs. Your application will be approved automatically. 5. There is a maximum of 1000 free messages per developer. Additional messages and features can be purchased from [https://dev.telstra.com](https://dev.telstra.com). 6. Note your `Client key` and `Client secret` as these will be needed to provision a number for your application and for authentication.  Now head over to **Getting Started** where you can find a postman collection as well as some links to sample apps and SDKs to get you started.  Happy Messaging!  # Frequently Asked Questions  **Q: Is creating a subscription via the Provisioning call a required step?**  A. Yes. You will only be able to start sending messages if you have a provisioned dedicated number. Use Provisioning to create a dedicated number subscription, or renew your dedicated number if it has expired.  **Q: When trying to send an SMS I receive a `400 Bad Request` response. How can I fix this?**  A. You need to make sure you have a provisioned dedicated number before you can send an SMS. If you do not have a provisioned dedicated number and you try to send a message via the API, you will get the error below in the response:  <pre><code class=\"language-sh\">{   \"status\":\"400\",   \"code\":\"DELIVERY-IMPOSSIBLE\",   \"message\":\"Invalid \\'from\\' address specified\" }</code></pre>  Use Provisioning to create a dedicated number subscription, or renew your dedicated number if it has expired.  **Q: How long does my dedicated number stay active for?**  A. When you provision a dedicated number, by default it will be active for 30 days. You can use the `activeDays` parameter during the provisioning call to increment or decrement the number of days your dedicated number will remain active.  Note that Free Trial apps will have 30 days as the maximum `activeDays` they can add to their provisioned number. If the Provisioning call is made several times within that 30-Day period, it will return the `expiryDate` in the Unix format and will not add any activeDays until after that `expiryDate`.  **Q: Can I send a broadcast message using the Telstra Messaging API?**  A. Yes. Recipient numbers can be in the form of an array of strings if a broadcast message needs to be sent, allowing you to send to multiple mobile numbers in one API call.   A sample request body for this will be: `{\"to\":[\"+61412345678\",\"+61487654321\"],\"body\":\"Test Message\"}`  **Q: How many recipient numbers can I send a broadcast message to at one time?**  A. The API currently supports up to 10 recipient numbers in the `\"to\"` array.  **Q: Can I send SMS and MMS to all countries?**  A. You can send SMS and MMS to the countries in [this list](https://raw.githubusercontent.com/telstra/MessagingAPI-v2/master/docs/Telstra_Messaging_API_Country_Codes.csv), provided the destination network supports delivery. Messages CANNOT be sent to countries which are subject to global sanctions namely: Burma, CÃ´te d'Ivoire, Cuba, Iran, North Korea, Syria.  **Q: Can I use `Alphanumeric Identifier` from my paid plan via credit card?**  A. `Alphanumeric Identifier` is only available on Telstra Account paid plans, not through credit card paid plans.  **Q: What is the maximum sized MMS that I can send?**  A. This will depend on the carrier that will receive the MMS. For Telstra it's up to 2MB,  Optus up to 1.5MB and Vodafone only allows up to 500kB. You will need to check with international carriers for thier MMS size limits.  **Q: How is the size of an MMS calculated?**  A. Images are scaled up to approximately 4/3 when base64 encoded. Additionally, there is approximately 200 bytes of overhead on each MMS. Assuming the maximum MMS that can be sent on Telstraâ€™s network is 2MB, then the maximum image size that can be sent will be approximately 1.378MB (1.378 x 1.34 + 200, without SOAP encapsulation).  **Q: How is an MMS classified as Small or Large?**  A. MMSes with numberSegments below 600 are classed as Small whereas those that are bigger than 600 are classed as Large. They will be charged accordingly.  **Q: Are SMILs supported by the Messaging API?**  A. While there will be no error if you send an MMS with a SMIL presentation, the actual layout or sequence defined in the SMIL may not display as expected because most of the new smartphone devices ignore the SMIL presentation layer. SMIL was used in feature phones which had limited capability and SMIL allowed a *powerpoint type* presentation to be provided. Smartphones now have the capability to display video which is the better option for presentations. It is recommended that MMS messages should just drop the SMIL.  **Q: How do I assign a delivery notification or callback URL?**  A. You can assign a delivery notification or callback URL by adding the `notifyURL` parameter in the body of the request when you send a message. Once the message has been delivered, a notification will then be posted to this callback URL.  **Q: Sometimes I am missing delivery receipts, why is this happening?**  A: Telstra can guarantee delivery receipts are provided for any mobile service connected on Telstra's network so long as the destination handset is able to receive SMS or MMS messages. For other carriers, although messages will be delivered to valid handsets on those carriers, they do not have an obligation to provide delivery receipts back to Telstra.  **Q: What is the difference between the `notifyURL` parameter in the Provisoning call versus the `notifyURL` parameter in the Send Message call?**  A. The `notifyURL` in the Provisoning call will be the URL where replies to the provisioned number will be posted. On the other hand, the `notifyURL` in the Send Message call will be the URL where the delivery notification will be posted, e.g. when an SMS has already been delivered to the recipient.  **Q: Is there a specific format for the `notifyURL` parameter?**  A. The `notifyURL` should be a complete URL address which includes the protocol identifier (e.g. `https://`). It should also have a forward slash at the end if it is just a domain (e.g. http://www.example.com/).  # Getting Started  Below are the steps to get started with the Telstra Messaging API.   1. Generate an OAuth2 token using your `Client key` and `Client secret`.   2. Use the Provisioning call to create a subscription and receive a dedicated number.   3. Send a message to a specific mobile number.  ## Run in Postman <a href=\"https://app.getpostman.com/run-collection/44f2a97ae4c9689ce53e#?env%5BMessaging%20API%20Environment%5D=W3sidmFsdWUiOiJ0YXBpLnRlbHN0cmEuY29tIiwia2V5IjoiaG9zdCIsImVuYWJsZWQiOnRydWV9LHsidmFsdWUiOiIiLCJrZXkiOiJjbGllbnRfaWQiLCJlbmFibGVkIjp0cnVlfSx7InZhbHVlIjoiIiwia2V5IjoiY2xpZW50X3NlY3JldCIsImVuYWJsZWQiOnRydWV9LHsidmFsdWUiOm51bGwsImtleSI6ImFjY2Vzc190b2tlbiIsImVuYWJsZWQiOnRydWV9LHsidmFsdWUiOiIiLCJrZXkiOiJtZXNzYWdlX2lkIiwiZW5hYmxlZCI6dHJ1ZX1d\"><img src=\"https://run.pstmn.io/button.svg\" alt=\"Run in Postman\"/></a>  ## Sample Apps   - [Perl Sample App](https://github.com/telstra/MessagingAPI-perl-sample-app)   - [Happy Chat App](https://github.com/telstra/messaging-sample-code-happy-chat)   - [PHP Sample App](https://github.com/developersteve/telstra-messaging-php)  ## SDK Repos   - [Messaging API - PHP SDK](https://github.com/telstra/MessagingAPI-SDK-php)   - [Messaging API - Python SDK](https://github.com/telstra/MessagingAPI-SDK-python)   - [Messaging API - Ruby SDK](https://github.com/telstra/MessagingAPI-SDK-ruby)   - [Messaging API - NodeJS SDK](https://github.com/telstra/MessagingAPI-SDK-node)   - [Messaging API - .Net2 SDK](https://github.com/telstra/MessagingAPI-SDK-dotnet)   - [Messaging API - Java SDK](https://github.com/telstra/MessagingAPI-SDK-Java)  ## Blog Posts For more information on the Messaging API, you can read these blog posts: - [Callbacks Part 1](https://dev.telstra.com/content/understanding-messaging-api-callbacks-part-1) - [Callbacks Part 2](https://dev.telstra.com/content/understanding-messaging-api-callbacks-part-2) 
 *
 * The version of the OpenAPI document: 2.2.9
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import GetMmsResponse from '../model/GetMmsResponse';
import HealthCheckResponse from '../model/HealthCheckResponse';
import InboundPollResponse from '../model/InboundPollResponse';
import MessageSentResponseMms from '../model/MessageSentResponseMms';
import MessageSentResponseSms from '../model/MessageSentResponseSms';
import OutboundPollResponse from '../model/OutboundPollResponse';
import SendMmsRequest from '../model/SendMmsRequest';
import SendSMSRequest from '../model/SendSMSRequest';
import SendSmsMultiRequest from '../model/SendSmsMultiRequest';

/**
* Messaging service.
* @module api/MessagingApi
* @version 2.2.9
*/
export default class MessagingApi {

    /**
    * Constructs a new MessagingApi. 
    * @alias module:api/MessagingApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


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
     * @param {String} messageid Unique identifier of a message - it is the value returned from a previous POST call to https://tapi.telstra.com/v2/messages/mms 
     * @param {module:api/MessagingApi~getMMSStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/OutboundPollResponse>}
     */
    getMMSStatus(messageid, callback) {
      let postBody = null;
      // verify the required parameter 'messageid' is set
      if (messageid === undefined || messageid === null) {
        throw new Error("Missing the required parameter 'messageid' when calling getMMSStatus");
      }

      let pathParams = {
        'messageid': messageid
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [OutboundPollResponse];
      return this.apiClient.callApi(
        '/messages/mms/{messageid}/status', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
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
     * If no notification URL has been specified, it is possible to poll for the message status.  Note that the `MessageId` that appears in the URL must be URL encoded. Just copying the `MessageId` as it was supplied when submitting the message may not work.  # SMS Status with Notification URL  When a message has reached its final state, the API will send a POST to the URL that has been previously specified.  <pre><code class=\"language-sh\">{     \"to\": \"+61418123456\",     \"sentTimestamp\": \"2017-03-17T10:05:22+10:00\",     \"receivedTimestamp\": \"2017-03-17T10:05:23+10:00\",     \"messageId\": \"1234567890ABCDEFGHIJKLNOPQRSTUVW\",     \"deliveryStatus\": \"DELIVRD\"   } </code></pre>  The fields are:  | Field | Description | | --- | ---| | `to` |  The number the message was sent to. | | `receivedTimestamp` | Time the message was sent to the API. | | `sentTimestamp` | Time handling of the message ended. | | `deliveryStatus` | The final state of the message. | | `messageId` | The same reference that was returned when the original message was sent.| | `receivedTimestamp` | Time the message was sent to the API.|  Upon receiving this call it is expected that your servers will give a 204 (No Content) response. 
     * @param {String} messageId Unique identifier of a message - it is the value returned from a previous POST call to https://tapi.telstra.com/v2/messages/sms. 
     * @param {module:api/MessagingApi~getSMSStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/OutboundPollResponse>}
     */
    getSMSStatus(messageId, callback) {
      let postBody = null;
      // verify the required parameter 'messageId' is set
      if (messageId === undefined || messageId === null) {
        throw new Error("Missing the required parameter 'messageId' when calling getSMSStatus");
      }

      let pathParams = {
        'messageId': messageId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [OutboundPollResponse];
      return this.apiClient.callApi(
        '/messages/sms/{messageId}/status', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the mMSHealthCheck operation.
     * @callback module:api/MessagingApi~mMSHealthCheckCallback
     * @param {String} error Error message, if any.
     * @param {module:model/HealthCheckResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * MMS Health Check
     * Determine whether the MMS service is up or down. 
     * @param {module:api/MessagingApi~mMSHealthCheckCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/HealthCheckResponse}
     */
    mMSHealthCheck(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = HealthCheckResponse;
      return this.apiClient.callApi(
        '/messages/mms/heathcheck', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the retrieveMMSReplies operation.
     * @callback module:api/MessagingApi~retrieveMMSRepliesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetMmsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve MMS Replies
     * Messages are retrieved one at a time, starting with the earliest reply.  If the subscription has a `notifyURL`, reply messages will be logged there instead, i.e. `GET` and reply `notifyURL` are exclusive.  # MMS Reply with Notification URL  When a reply is received, the API will send a POST to the subscription URL that has been previously specified.  <pre><code class=\"language-sh\">{   \"to\": \"+61418123456\",   \"from\": \"+61421987654\",   \"sentTimestamp\": \"2018-03-23T12:15:45+10:00\",   \"messageId\": \"XFRO1ApiA0000000111\",   \"subject\": \"Foo\",   \"envelope\": \"string\",   \"MMSContent\":     [       {         \"type\": \"text/plain\",         \"filename\": \"text_1.txt\",         \"payload\": \"string\"       },       {         \"type\": \"image/jpeg\",         \"filename\": \"sample.jpeg\",         \"payload\": \"string\"       }     ] }</code></pre>  The fields are:  | Field | Description | | --- | --- | | `to` |The number the message was sent to. | | `from` | The number the message was sent from. | | `sentTimestamp` | Time handling of the message ended. | | `messageId` | Message Id assigned by the MMSC | | `subject` | The subject assigned to the message. | | `envelope` | Information about about terminal type and originating operator. | | `MMSContent` | An array of the actual content of the reply message. | | `type` | The content type of the message. | | `filename` | The filename for the message content. | | `payload` | The content of the message. | 
     * @param {module:api/MessagingApi~retrieveMMSRepliesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetMmsResponse}
     */
    retrieveMMSReplies(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetMmsResponse;
      return this.apiClient.callApi(
        '/messages/mms', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the retrieveSMSReplies operation.
     * @callback module:api/MessagingApi~retrieveSMSRepliesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InboundPollResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve SMS Replies
     * Messages are retrieved one at a time, starting with the earliest reply.  The API supports the encoding of emojis in the reply message. The emojis will be in their UTF-8 format.  If the subscription has a `notifyURL`, reply messages will be logged there instead.  # SMS Reply with Notification URL  When a reply is received, the API will send a POST to the subscription URL that has been previously specified.  <pre><code class=\"language-sh\">{   \"to\":\"+61472880123\",   \"from\":\"+61412345678\",   \"body\":\"Foo4\",   \"sentTimestamp\":\"2018-04-20T14:24:35\",   \"messageId\":\"DMASApiA0000000146\" }</code></pre>  The fields are:  | Field | Description | | --- |--- | | `to` | The number the message was sent to. | | `from` | The number the message was sent from. | | `body` | The content of the SMS response. | | `sentTimestamp` | Time handling of the message ended. | | `messageId` | The ID assigned to the message. | 
     * @param {module:api/MessagingApi~retrieveSMSRepliesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InboundPollResponse}
     */
    retrieveSMSReplies(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InboundPollResponse;
      return this.apiClient.callApi(
        '/messages/sms', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the sMSHealthCheck operation.
     * @callback module:api/MessagingApi~sMSHealthCheckCallback
     * @param {String} error Error message, if any.
     * @param {module:model/HealthCheckResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * SMS Health Check
     * Determine whether the SMS service is up or down. 
     * @param {module:api/MessagingApi~sMSHealthCheckCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/HealthCheckResponse}
     */
    sMSHealthCheck(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = HealthCheckResponse;
      return this.apiClient.callApi(
        '/messages/sms/heathcheck', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the sMSMulti operation.
     * @callback module:api/MessagingApi~sMSMultiCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MessageSentResponseSms} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send Multiple SMS
     * Send multiple SMS in one API call. 
     * @param {module:model/SendSmsMultiRequest} payload A JSON payload containing the recipient's phone number and text message. This number can be in international format if preceeded by a '+' or in national format ('04xxxxxxxx') where x is a digit. 
     * @param {module:api/MessagingApi~sMSMultiCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MessageSentResponseSms}
     */
    sMSMulti(payload, callback) {
      let postBody = payload;
      // verify the required parameter 'payload' is set
      if (payload === undefined || payload === null) {
        throw new Error("Missing the required parameter 'payload' when calling sMSMulti");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = MessageSentResponseSms;
      return this.apiClient.callApi(
        '/messages/sms/multi', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the sendMMS operation.
     * @callback module:api/MessagingApi~sendMMSCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MessageSentResponseMms} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send MMS
     * Send MMS
     * @param {module:model/SendMmsRequest} body A JSON or XML payload containing the recipient's phone number and MMS message. The recipient number should be in the format '04xxxxxxxx' where x is a digit. 
     * @param {module:api/MessagingApi~sendMMSCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MessageSentResponseMms}
     */
    sendMMS(body, callback) {
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling sendMMS");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = MessageSentResponseMms;
      return this.apiClient.callApi(
        '/messages/mms', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the sendSMS operation.
     * @callback module:api/MessagingApi~sendSMSCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MessageSentResponseSms} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send SMS
     * Send an SMS Message to a single or multiple mobile number/s. 
     * @param {module:model/SendSMSRequest} payload A JSON or XML payload containing the recipient's phone number and text message. This number can be in international format if preceeded by a '+' or in national format ('04xxxxxxxx') where x is a digit. 
     * @param {module:api/MessagingApi~sendSMSCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MessageSentResponseSms}
     */
    sendSMS(payload, callback) {
      let postBody = payload;
      // verify the required parameter 'payload' is set
      if (payload === undefined || payload === null) {
        throw new Error("Missing the required parameter 'payload' when calling sendSMS");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = MessageSentResponseSms;
      return this.apiClient.callApi(
        '/messages/sms', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
