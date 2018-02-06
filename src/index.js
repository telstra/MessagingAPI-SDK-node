/**
 * Telstra Messaging API
 *  The Telstra SMS Messaging API allows your applications to send and receive SMS text messages from Australia's leading network operator.  It also allows your application to track the delivery status of both sent and received SMS messages. 
 *
 * OpenAPI spec version: 2.2.4
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: unset
 *
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ErrorError', 'model/ErrorErrorError', 'model/InboundPollResponse', 'model/MMSContent', 'model/Message', 'model/MessageSentResponse', 'model/MessageType', 'model/OAuthRequest', 'model/OAuthResponse', 'model/OutboundPollResponse', 'model/ProvisionNumberRequest', 'model/ProvisionNumberResponse', 'model/SendMmsRequest', 'model/SendSMSRequest', 'model/Status', 'api/AuthenticationApi', 'api/MessagingApi', 'api/ProvisioningApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/ErrorError'), require('./model/ErrorErrorError'), require('./model/InboundPollResponse'), require('./model/MMSContent'), require('./model/Message'), require('./model/MessageSentResponse'), require('./model/MessageType'), require('./model/OAuthRequest'), require('./model/OAuthResponse'), require('./model/OutboundPollResponse'), require('./model/ProvisionNumberRequest'), require('./model/ProvisionNumberResponse'), require('./model/SendMmsRequest'), require('./model/SendSMSRequest'), require('./model/Status'), require('./api/AuthenticationApi'), require('./api/MessagingApi'), require('./api/ProvisioningApi'));
  }
}(function(ApiClient, ErrorError, ErrorErrorError, InboundPollResponse, MMSContent, Message, MessageSentResponse, MessageType, OAuthRequest, OAuthResponse, OutboundPollResponse, ProvisionNumberRequest, ProvisionNumberResponse, SendMmsRequest, SendSMSRequest, Status, AuthenticationApi, MessagingApi, ProvisioningApi) {
  'use strict';

  /**
   * The_Telstra_SMS_Messaging_API_allows_your_applications_to_send_and_receive_SMS_text_messages_from_Australias_leading_network_operator_It_also_allows_your_application_to_track_the_delivery_status_of_both_sent_and_received_SMS_messages_.<br>
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
   * @version 1.0.1
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The ErrorError model constructor.
     * @property {module:model/ErrorError}
     */
    ErrorError: ErrorError,
    /**
     * The ErrorErrorError model constructor.
     * @property {module:model/ErrorErrorError}
     */
    ErrorErrorError: ErrorErrorError,
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
     * The MessageType model constructor.
     * @property {module:model/MessageType}
     */
    MessageType: MessageType,
    /**
     * The OAuthRequest model constructor.
     * @property {module:model/OAuthRequest}
     */
    OAuthRequest: OAuthRequest,
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
