//
// https://www.linkedin.com/developer/apps/4543533/auth
//

var LinkedIn_CLIENT_ID = '77y1puq9y8a3qq'
var LinkedIn_CLIENT_SECRET = 'x5km81bxRLEyWinW'


/**
 * Authorizes and makes a request to the LinkedIn API.
 */
function runLinkedIn() {
  var service = getServiceLinkedIn();
  if (service.hasAccess()) {
    // see: https://developer.linkedin.com/docs/fields/basic-profile
    //var url = 'https://api.linkedin.com/v1/people/~?format=json';
    var url = 'https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url,email-address)?format=json'
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
function reset() {
  var service = getServiceLinkedIn();
  service.reset();
}

/**
 * Configures the service.
 */
function getServiceLinkedIn() {
  return OAuth2.createService('LinkedIn')
      // Set the endpoint URLs.
      .setAuthorizationBaseUrl('https://www.linkedin.com/uas/oauth2/authorization')
      //.setAuthorizationBaseUrl(BASE_URL)

      .setTokenUrl('https://www.linkedin.com/uas/oauth2/accessToken')

      // Set the client ID and secret.
      .setClientId(LinkedIn_CLIENT_ID)
      .setClientSecret(LinkedIn_CLIENT_SECRET)

      // Set the name of the callback function that should be invoked to complete
      // the OAuth flow.
      .setCallbackFunction('authCallbackLinkedIn')
  
      .setParam('login_hint', Session.getActiveUser().getEmail())  // added

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())
  
  
      // Sets the login hint, which will prevent the account chooser screen
      // from being shown to users logged in with multiple accounts.
      .setParam('login_hint', Session.getActiveUser().getEmail())
  
  
}

/**
 * Handles the OAuth callback.
 */
function authCallbackLinkedIn(request) {
  var service = getServiceLinkedIn();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied');
  }
}

//------------------

function showSidebarLinkedIn() {
  var service = getServiceLinkedIn();
  if (!service.hasAccess()) {

    // see: https://developer.linkedin.com/docs/fields/basic-profile
    //var url = 'https://api.linkedin.com/v1/people/~?format=json';
    var url = 'https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url,email-address)?format=json'
    var response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      }
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    
  } else {
    // ...
    var authorizationUrl = service.getAuthorizationUrl();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page);
  }
}

//------------
/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 */
/*
function onLinkedInOpen() {function onOpenLinkedIn() {
  SpreadsheetApp.getUi().
      .createMenu('OAuth Stuff')
      .addItem('LinkedIn Authorize', 'showSidebar')
      .addToUi();
}

*/


