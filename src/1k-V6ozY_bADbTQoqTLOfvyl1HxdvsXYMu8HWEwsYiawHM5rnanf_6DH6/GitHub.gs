
// var GitHub_CLIENT_ID = '6c8c008f935e4ea57609',
//    GitHub_CLIENT_SECRET = '25b5a5f098e66c91ea845f8d060e7782f006c800',
//    USERNAME = 'tariqhamid';

var CLIENT_ID = '6c8c008f935e4ea57609';
var CLIENT_SECRET = '25b5a5f098e66c91ea845f8d060e7782f006c800';

/**
 * Authorizes and makes a request to the GitHub API.
 */
function runGH() {
  var service = getServiceGH();
  if (service.hasAccess()) {
    var url = 'https://api.github.com/user/repos';
    var response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
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
function resetGH() {
  var service = getServiceGH();
  service.reset();
}

/**
 * Configures the service.
 */
function getServiceGH() {
  return OAuth2.createService('GitHub')
      // Set the endpoint URLs.
      .setAuthorizationBaseUrl('https://github.com/login/oauth/authorize')
      .setTokenUrl('https://github.com/login/oauth/access_token')

      // Set the client ID and secret.
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)

      // Set the name of the callback function that should be invoked to complete
      // the OAuth flow.
      .setCallbackFunction('authCallbackMU')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())
}

/**
 * Handles the OAuth callback.
 */
function authCallbackGH(request) {
  var service = getServiceGH();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied');
  }
}