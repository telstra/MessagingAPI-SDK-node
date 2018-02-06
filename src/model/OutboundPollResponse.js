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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Status'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Status'));
  } else {
    // Browser globals (root is window)
    if (!root.TelstraMessaging) {
      root.TelstraMessaging = {};
    }
    root.TelstraMessaging.OutboundPollResponse = factory(root.TelstraMessaging.ApiClient, root.TelstraMessaging.Status);
  }
}(this, function(ApiClient, Status) {
  'use strict';




  /**
   * The OutboundPollResponse model module.
   * @module model/OutboundPollResponse
   * @version 1.0.1
   */

  /**
   * Constructs a new <code>OutboundPollResponse</code>.
   * @alias module:model/OutboundPollResponse
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>OutboundPollResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OutboundPollResponse} obj Optional instance to populate.
   * @return {module:model/OutboundPollResponse} The populated <code>OutboundPollResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('to')) {
        obj['to'] = ApiClient.convertToType(data['to'], 'String');
      }
      if (data.hasOwnProperty('receivedTimestamp')) {
        obj['receivedTimestamp'] = ApiClient.convertToType(data['receivedTimestamp'], 'String');
      }
      if (data.hasOwnProperty('sentTimestamp')) {
        obj['sentTimestamp'] = ApiClient.convertToType(data['sentTimestamp'], 'String');
      }
      if (data.hasOwnProperty('deliveryStatus')) {
        obj['deliveryStatus'] = Status.constructFromObject(data['deliveryStatus']);
      }
    }
    return obj;
  }

  /**
   * The phone number (recipient) the message was sent to (in E.164 format).
   * @member {String} to
   */
  exports.prototype['to'] = undefined;
  /**
   * The date and time when the message was recieved by recipient.
   * @member {String} receivedTimestamp
   */
  exports.prototype['receivedTimestamp'] = undefined;
  /**
   * The date and time when the message was sent.
   * @member {String} sentTimestamp
   */
  exports.prototype['sentTimestamp'] = undefined;
  /**
   * @member {module:model/Status} deliveryStatus
   */
  exports.prototype['deliveryStatus'] = undefined;



  return exports;
}));


