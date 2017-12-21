/**
  * @module TelstraMessagingAPILib
  *
  * The Telstra SMS Messaging API allows your applications to send and receive SMS text messages
  * from Australia's leading network operator.  It also allows your application to track the
  * delivery status of both sent and received SMS messages.
  */

'use strict';

const Configuration = require('./configuration');
const OAuthManager = require('./OAuthManager');
const Environments = require('./Environments');
const ProvisioningController = require('./Controllers/ProvisioningController');
const MessagingController = require('./Controllers/MessagingController');
const OAuthAuthorizationController = require('./Controllers/OAuthAuthorizationController');
const StatusEnum = require('./Models/StatusEnum');
const OutboundPollResponse = require('./Models/OutboundPollResponse');
const MMSContent = require('./Models/MMSContent');
const SendMMSRequest = require('./Models/SendMMSRequest');
const MessageTypeEnum = require('./Models/MessageTypeEnum');
const ErrorError = require('./Models/ErrorError');
const SendSMSRequest = require('./Models/SendSMSRequest');
const InboundPollResponse = require('./Models/InboundPollResponse');
const Message = require('./Models/Message');
const MessageSentResponse = require('./Models/MessageSentResponse');
const ProvisionNumberResponse = require('./Models/ProvisionNumberResponse');
const ProvisionNumberRequest = require('./Models/ProvisionNumberRequest');
const OAuthScopeEnum = require('./Models/OAuthScopeEnum');
const OAuthToken = require('./Models/OAuthToken');
const OAuthProviderErrorEnum = require('./Models/OAuthProviderErrorEnum');
const ErrorErrorError62ErrorException = require('./Exceptions/ErrorErrorError62ErrorException');
const ErrorErrorErrorErrorErrorException =
  require('./Exceptions/ErrorErrorErrorErrorErrorException');
const OAuthProviderException = require('./Exceptions/OAuthProviderException');
const APIException = require('./Exceptions/APIException');


const initializer = {
    // functional components of TelstraMessagingAPILib
    Configuration,
    Environments,
    OAuthManager,
    // controllers of TelstraMessagingAPILib
    ProvisioningController,
    MessagingController,
    OAuthAuthorizationController,
    // models of TelstraMessagingAPILib
    StatusEnum,
    OutboundPollResponse,
    MMSContent,
    SendMMSRequest,
    MessageTypeEnum,
    ErrorError,
    SendSMSRequest,
    InboundPollResponse,
    Message,
    MessageSentResponse,
    ProvisionNumberResponse,
    ProvisionNumberRequest,
    OAuthScopeEnum,
    OAuthToken,
    OAuthProviderErrorEnum,
    // exceptions of TelstraMessagingAPILib
    ErrorErrorError62ErrorException,
    ErrorErrorErrorErrorErrorException,
    OAuthProviderException,
    APIException,
};

module.exports = initializer;
