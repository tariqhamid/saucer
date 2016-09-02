var CLIENT_ID = '48800';
var CLIENT_SECRET = '6TGRaVIdiS9dsQ8zRbxSk8Edl5kmC7cy2LVJcLjij0ig4v0ltDTMFjlEAdWQk5jl';

/**
 * Authorizes and makes a request to the Wordpress API.
 */
function runWP() {
  var service = getServiceWP();
  if (service.hasAccess()) {
    var blogId = service.getToken_().blog_id;
    var url = 'https://public-api.wordpress.com/rest/v1.1/sites/' + blogId + '/posts';
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
function resetWP() {
  var service = getServiceWP();
  service.reset();
}

/**
 * Configures the service.
 */
function getServiceWP() {
  return OAuth2.createService('Wordpress')
      // Set the endpoint URLs.
      .setTokenUrl('https://public-api.wordpress.com/oauth2/token')
      .setAuthorizationBaseUrl('https://public-api.wordpress.com/oauth2/authorize')

      // Set the client ID and secret.
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallbackWP')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties());
}

/**
 * Handles the OAuth2 callback.
 */
function authCallbackWP(request) {
  var service = getServiceWP();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied');
  }
}