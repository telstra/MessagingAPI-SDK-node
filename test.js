var TelstraMessaging = require('Telstra_Messaging');


var api = new TelstraMessaging.AuthenticationApi()
var clientId = process.env.CLIENT_ID; // {String} 
var clientSecret = process.env.CLIENT_SECRET; // {String} 
var grantType = "client_credentials"; // {String} 
var opts = {
  'scope': "NSMS" // {String} NSMS
};

async function run() {
  try {
    const authResp = await api.authToken(clientId, clientSecret, grantType, opts);
    console.log('Access token acquired');

    var defaultClient = TelstraMessaging.ApiClient.instance;
    // Configure OAuth2 access token for authorization: auth
    var auth = defaultClient.authentications['auth'];
    auth.accessToken = authResp.access_token;

    let apiInstance = new TelstraMessaging.ProvisioningApi();
    let body = new TelstraMessaging.ProvisionNumberRequest(30);

    await apiInstance.createSubscription(body);
    console.log('Number provisioned');

    apiInstance = new TelstraMessaging.MessagingApi();
    body = new TelstraMessaging.SendSMSRequest(process.env.PHONE_NO, 'Test JS SDK', process.env.FROM_ALIAS); // SendMmsRequest | A JSON or XML payload containing the recipient's phone number and MMS message. The recipient number should be in the format '04xxxxxxxx' where x is a digit. 
    const sent = await apiInstance.sendSMS(body);

    console.log('Message sent: ', sent);

  } catch (err) {
    console.error(err);
  }  
}

run();