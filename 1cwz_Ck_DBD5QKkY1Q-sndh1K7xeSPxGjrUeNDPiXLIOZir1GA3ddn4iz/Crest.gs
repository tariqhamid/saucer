// https://gist.github.com/fuzzysteve/820cd2573d87a1d20d87

/*

Doesn't currently do anything other than dump some region information into the log.

Uses https://github.com/googlesamples/apps-script-oauth2

Details for the setup of that are on the page. short version:
Add the library MswhXl8fVhTFUH_Q3UOJbXvxhMjh3Sh48 to your sheet code. Resources -> libraries

get the project key from file-> project properties

Set up a new crest application, with https://script.google.com/macros/d/{PROJECT KEY}/usercallback as your callback (replace project key. obviously)


*/



function onOpen() {
  SpreadsheetApp.getUi() 
      .createMenu('CREST Stuff')
      .addItem('Authorize', 'showSidebar')
  .addItem('Make request','makeRequest')
      .addToUi();
}


function getCrestService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('crest')

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl('https://login.eveonline.com/oauth/authorize')
      .setTokenUrl('https://login.eveonline.com/oauth/token')

      // Set the client ID and secret, from the Google Developers Console.
      .setClientId('078b073not getting mine 8e62bd07169')
      .setClientSecret('xH9AQESAnot getting mine 0YAA8xf3Ck')

      // Set the project key of the script using this library.
      .setProjectKey('MZ8C-it-s a project property on the code UFQX0')

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope('publicData')
}

function showSidebar() {
  var crestService = getCrestService();
  if (!crestService.hasAccess()) {
    var authorizationUrl = crestService.getAuthorizationUrl();
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
  var crestService = getCrestService();
  var isAuthorized = crestService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

function makeRequest() {
  var crestService = getCrestService();
  var response = UrlFetchApp.fetch('https://crest-tq.eveonline.com/constellations/20000358/', {
    headers: {
      Authorization: 'Bearer ' + crestService.getAccessToken()
    }
  });
  Logger.log(response);
}
