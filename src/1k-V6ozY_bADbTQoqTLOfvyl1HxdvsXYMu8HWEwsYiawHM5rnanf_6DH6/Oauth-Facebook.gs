/*
 * Facebook OAuth 2.0 guides:
 * https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
 * https://developers.facebook.com/apps/
 */

var FB_CLIENT_ID = '912362655576180'
var FB_CLIENT_SECRET = '35de3e2219c9bf4ab35af180d3529ced'

/*
email : Provides access to the person's primary email address. This permission is approved by default.
public_profile : Provides access to a person's basic information, including first name, last name, profile picture, gender and age range. This permission is approved by default.
user_friends : Provides access to a person's list of friends that also use your app. This permission is approved by default.

 {
  "name": "Tariq Hamid",
  "id": "10210399101874769"
 }

API Tester: https://developers.facebook.com/tools/explorer/?method=GET&path=me%2Ftaggable_friends&version=v2.7
*/
/*
So, in v2.0 you'll only be able to get all friends via the /me/taggable_friends 
(https://developers.facebook.com/docs/graph-api/reference/v2.0/user/taggable_friends) endpoint,
which only contains the fields id, name, picture, and only can be used after a review of your app by Facebook.


*/
/*
 * Authorizes and makes a request to the Facebook API.
 */

function runFB(e) {
  var service = getServiceFB();
  var html = '';
  if (service.hasAccess()) {
    var url = 'https://graph.facebook.com/v2.6/me'
    var response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      } ,
      // "useIntranet" : true
      muteHttpExceptions:true
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    Logger.log(result);
    
    /*
      http://stackoverflow.com/questions/23507885/retrieve-full-list-of-friends-using-facebook-api
    
    So, in v2.0 you'll only be able to get all friends via the /me/taggable_friends
    (https://developers.facebook.com/docs/graph-api/reference/v2.0/user/taggable_friends) endpoint,
    which only contains the fields id, name, picture, and only can be used after a review of your app by Facebook.
    */
    // http://stackoverflow.com/questions/23507885/retrieve-full-list-of-friends-using-facebook-api
    //url = 'https://graph.facebook.com/v2.7/me/taggable_friends?limit=50&access_token=' + service.getAccessToken()
    url = 'https://graph.facebook.com/v2.7/me/friends?limit=50&access_token=' + service.getAccessToken()
    //url = 'https://graph.facebook.com/v2.6/me/permissions?limit=50&access_token=' + service.getAccessToken()
    response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      } ,
      // "useIntranet" : true
      muteHttpExceptions:true
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    Logger.log(result);
    
    
    url = 'https://graph.facebook.com/v2.6/me/permissions'
    response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      } ,
      // "useIntranet" : true
      muteHttpExceptions:true
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    Logger.log(result);


  } else {
    var authorizationUrl = service.getAuthorizationUrl() // + '&email&public_profile&user_friends';
    Logger.log('Open the following URL and re-run the script: %s',
        authorizationUrl);
  }

}

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  var service = getServiceFB();
  service.reset();
}

/**
 * Configures the service.
 */
function getServiceFB() {
  return OAuth2.createService('Facebook')
      // Set the endpoint URLs.
      .setAuthorizationBaseUrl('https://www.facebook.com/dialog/oauth')
      .setTokenUrl('https://graph.facebook.com/v2.6/oauth/access_token')

      // Set the client ID and secret.
      .setClientId(FB_CLIENT_ID)
      .setClientSecret(FB_CLIENT_SECRET)

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
  var service = getServiceFB();
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
