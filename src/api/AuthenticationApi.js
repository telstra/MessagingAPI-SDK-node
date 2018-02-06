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
    define(['ApiClient', 'model/OAuthResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/OAuthResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.TelstraMessaging) {
      root.TelstraMessaging = {};
    }
    root.TelstraMessaging.AuthenticationApi = factory(root.TelstraMessaging.ApiClient, root.TelstraMessaging.OAuthResponse);
  }
}(this, function(ApiClient, OAuthResponse) {
  'use strict';

  /**
   * Authentication service.
   * @module api/AuthenticationApi
   * @version 1.0.1
   */

  /**
   * Constructs a new AuthenticationApi. 
   * @alias module:api/AuthenticationApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the authToken operation.
     * @callback module:api/AuthenticationApi~authTokenCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OAuthResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Generate authentication token
     * Generate authentication token
     * @param {String} clientId 
     * @param {String} clientSecret 
     * @param {String} grantType 
     * @param {module:api/AuthenticationApi~authTokenCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/OAuthResponse}
     */
    this.authToken = function(clientId, clientSecret, grantType, callback) {
      var postBody = null;

      // verify the required parameter 'clientId' is set
      if (clientId === undefined || clientId === null) {
        throw new Error("Missing the required parameter 'clientId' when calling authToken");
      }

      // verify the required parameter 'clientSecret' is set
      if (clientSecret === undefined || clientSecret === null) {
        throw new Error("Missing the required parameter 'clientSecret' when calling authToken");
      }

      // verify the required parameter 'grantType' is set
      if (grantType === undefined || grantType === null) {
        throw new Error("Missing the required parameter 'grantType' when calling authToken");
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
        'client_id': clientId,
        'client_secret': clientSecret,
        'grant_type': grantType
      };

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = OAuthResponse;

      return this.apiClient.callApi(
        '/oauth/token', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
