/**
 * Meetup API Guides:
 * http://www.meetup.com/meetup_api/
 * http://www.meetup.com/meetup_api/auth/#oauth2
 */

var CLIENT_ID = 'kc7jue1ht9gd6gr4qb66t845ij';
var CLIENT_SECRET = '4bjvo43p6ttf51p1o5c9u1lout';

/**
 * Authorizes and makes a request to the Meetup API.
 */

function runMU() {
  var service = getService();
  if (service.hasAccess()) {
    var url = 'https://api.meetup.com/dashboard';
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
function resetMU() {
  var service = getServiceMU();
  service.reset();
}

/**
 * Configures the service.
 */
function getServiceMU() {
  return OAuth2.createService('Meetup')
      // Set the endpoint URLs.
      .setAuthorizationBaseUrl('https://secure.meetup.com/oauth2/authorize')
      .setTokenUrl('https://secure.meetup.com/oauth2/access')

      // Set the client ID and secret.
      .setClientId(CLIENT_ID)
        .setClientSecret(CLIENT_SECRET)

      // Set the name of the callback function that should be invoked to complete
      // the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties());
}

/**
 * Handles the OAuth callback.
 */
function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied');
  }
}