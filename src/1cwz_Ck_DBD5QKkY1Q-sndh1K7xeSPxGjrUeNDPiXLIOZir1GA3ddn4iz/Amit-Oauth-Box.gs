//
// https://ctrlq.org/code/20088-box-api-google-script
//


// Written by Amit Agarwal www.ctrlq.org
 
// Step 1.
function authorizeBox() {
  var service = getBoxService_();
  if (!service.hasAccess()) {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL to authorize: %s',
               authorizationUrl);
  } else {
    Logger.log('Your account is already authorized');
  }
}
 
// Step 2.
function getFoldersList() {
  
  var response = UrlFetchApp.fetch('https://api.box.com/2.0/folders/0/items?fields=name,type', {
    headers: {
      'Authorization': 'Bearer ' + getBoxService_().getAccessToken()
    }
  });
  
  var result = JSON.parse(response.getContentText());
  var items = result.entries;
  
  var folders = [];
  
  for (var i=0; i<items.length; i++) {
    if (items[i].type === "folder") {
      folders.push({name: items[i].name, id: items[i].id});
    }
  }
  
  Logger.log(folders);
}
 
 
/**
* Configures the service.
*/
function getBoxService_() {
  return OAuth2.createService('Box')
  .setAuthorizationBaseUrl('https://app.box.com/api/oauth2/authorize')
  .setTokenUrl('https://app.box.com/api/oauth2/token')
  .setClientId(CLIENT_ID)
  .setClientSecret(CLIENT_SECRET)
  .setCallbackFunction('authCallback')
  .setPropertyStore(PropertiesService.getUserProperties());
}
 
/**
* Handles the OAuth callback.
*/
function authCallback(request) {
  var service = getBoxService_();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Your Google account is now connected to Box');
  } else {
    return HtmlService.createHtmlOutput('Sorry, the connection to Box was denied');
  }
}
