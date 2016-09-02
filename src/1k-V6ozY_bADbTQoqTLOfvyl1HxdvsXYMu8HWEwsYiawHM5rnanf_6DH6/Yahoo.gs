
/*
  Yahoo oAuth 2.0 guide API requests
  https://developer.yahoo.com/oauth2/guide/apirequests/
*/

var CLIENT_ID = 'dj0yJmk9alpoSTZBNktVeDA2JmQ9WVdrOVJFOTJlakZyTkhNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD00OQ--';
var CLIENT_SECRET = 'd58fd0190bcd213061035bd580b565e2dd433f90';

/**
* Authorizes and makes a request to the Yahoo API.
*/

function runYahoo() {
  var service = getServiceYahoo();
  if (service.hasAccess()) {
    //var url = 'https://social.yahooapis.com/v1/user/abcdef123/profile?format=json';
    var url = 'https://social.yahooapis.com/v1/me/guid?format=json'
    var options = {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      },
      muteHttpExceptions: true
    }
    var response = UrlFetchApp.fetch(url, options);
    //Logger.log(response.getContentText())
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    
    var guid = result.guid.value
    Logger.log(guid)
    
    
    url = 'https://social.yahooapis.com/v1/user/' + guid + '/profile?format=json';
    response = UrlFetchApp.fetch(url, options);
    
    //Logger.log(response.getContentText())
    result = JSON.parse(response.getContentText())

    Logger.log(result)
  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
               authorizationUrl);
  }
}

/**
* Reset the authorization state, so that it can be re-tested.
*/
function resetYahoo() {
  var service = getServiceYahoo();
  service.reset();
}

/**
* Configures the service.
*/
function getServiceYahoo() {
  return OAuth2.createService('Yahoo')
  // Set the endpoint URLs.
  .setAuthorizationBaseUrl('https://api.login.yahoo.com/oauth2/request_auth')
  .setTokenUrl('https://api.login.yahoo.com/oauth2/get_token')

  // Set the client ID and secret.
  .setClientId(CLIENT_ID)
  .setClientSecret(CLIENT_SECRET)

  // Set the name of the callback function that should be invoked to complete
  // the OAuth flow.
  .setCallbackFunction('authCallbackYahoo')

  // Set the property store where authorized tokens should be persisted.
  .setPropertyStore(PropertiesService.getUserProperties());
}

/**
* Handles the OAuth callback.
*/
function authCallbackYahoo(request) {
  var service = getServiceYahoo();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!<br/>' + JSON.stringify(request));
  } else {
    return HtmlService.createHtmlOutput('Denied');
  }
}
