/*

URL Blocked: This redirect failed because the redirect URI is not whitelisted
  in the app’s Client OAuth Settings. Make sure Client and Web OAuth Login are
  on and add all your app domains as Valid OAuth Redirect URIs.

*/


/*

Doesn't currently do anything other than dump some region information into the log.

Uses https://github.com/googlesamples/apps-script-oauth2

Details for the setup of that are on the page. short version:
Add the library MswhXl8fVhTFUH_Q3UOJbXvxhMjh3Sh48 to your sheet code. Resources -> libraries

get the project key from file-> project properties

Set up a new crest application, with https://script.google.com/macros/d/{PROJECT KEY}/usercallback as your callback (replace project key. obviously)


*/


var CLIENT_ID = '271118276599099'
var CLIENT_SECRET = '12abe962d46a2212629ac3f3b77d04bc'


function onFBOpen() {
  SpreadsheetApp.getUi() 
      .createMenu('Facebook Stuff')
      .addItem('Authorize', 'showFBSidebar')
  .addItem('Make request','makeRequest')
      .addToUi();
}


function getFBService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('facebook')

      // Set the endpoint URLs, which are the same for all Google services.
      ///.setAuthorizationBaseUrl('https://login.eveonline.com/oauth/authorize')
      ///.setTokenUrl('https://login.eveonline.com/oauth/token')
  
      .setAuthorizationBaseUrl('https://www.facebook.com/dialog/oauth')
      .setTokenUrl('https://graph.facebook.com/v2.6/oauth/access_token')

      // Set the client ID and secret, from the Google Developers Console.
      ///.setClientId('078b073not getting mine 8e62bd07169')
      ///.setClientSecret('xH9AQESAnot getting mine 0YAA8xf3Ck')
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)

      // Set the project key of the script using this library.
      ///.setProjectKey('MZ8C-it-s a project property on the code UFQX0')

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      //.setScope('publicData')
}

function showFBSidebar() {
  var service = getFBService();
  if (!service.hasAccess()) {
    var authorizationUrl = service.getAuthorizationUrl();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page);
  } else {
    var ui = SpreadsheetApp.getUi();
    ui.alert('Spreadsheet is already Authorized');
  }
}

function authCallback(request) {
  var service = getFBService();
  var isAuthorized = service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

function makeRequest() {
  var service = getFBService();
  var response = UrlFetchApp.fetch('https://graph.facebook.com/v2.6/me', {
    headers: {
      Authorization: 'Bearer ' + service.getAccessToken()
    }
  });
  Logger.log(response);
}
