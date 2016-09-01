/*
 * Facebook OAuth 2.0 guides:
 * https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
 * https://developers.facebook.com/apps/
 */

var CLIENT_ID = '271118276599099'
var CLIENT_SECRET = '12abe962d46a2212629ac3f3b77d04bc'

/*
 * Authorizes and makes a request to the Facebook API.
 */

function runFB(e) {
  var service = getService();
  var html = '';
  if (service.hasAccess()) {
    var url = 'https://graph.facebook.com/v2.6/me';
    var response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      }
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
        authorizationUrl);
  }
}

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function resetFB() {
  var service = getService();
  service.reset();
}

/**
 * Configures the service.
 */
function getServiceFb() {
  return OAuth2.createService('Facebook')
      // Set the endpoint URLs.
      .setAuthorizationBaseUrl('https://www.facebook.com/dialog/oauth')
      .setTokenUrl('https://graph.facebook.com/v2.6/oauth/access_token')

      // Set the client ID and secret.
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)

      // Set the name of the callback function that should be invoked to complete
      // the OAuth flow.
      .setCallbackFunction('FBauthCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties());
}

/**
 * Handles the OAuth callback.
 */
function FBauthCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    Logger.log('Success!')
    return HtmlService.createHtmlOutput('Success!');
  } else {
    Logger.log('Denied')

    return HtmlService.createHtmlOutput('Denied');
  }
}


//------------
// [16-07-20 01:08:13:119 BST] https://script.google.com/macros/d/MW6Ktw7UUlFlremClaKWUk0MeTNx2jEzZ/usercallback
function logRedirectUri() {
    var service = getServiceFB();
    Logger.log(service.getRedirectUri());
}
