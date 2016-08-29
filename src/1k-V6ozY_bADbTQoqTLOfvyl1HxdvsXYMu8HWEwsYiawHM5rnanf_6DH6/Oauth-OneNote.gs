function getServiceOneNote(){
  return OAuth2.createService('onenote')
    .setAuthorizationBaseUrl('https://login.live.com/oauth20_authorize.srf')
    .setTokenUrl('https://login.live.com/oauth20_authorize.srf')
    .setClientId(onenote_client_id)
    .setClientSecret(onenote_client_secret)
    .setCallbackFunction('authCallbackOneNote')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('wl.signin wl.offline_access office.onenote_update');
}

/* This is the actual function to act in OneNote */
function posttoOneDrive(){
  var onenote = getServiceOneNote();
  if (onenote.hasAccess()) {
    var response = onenote.fetch('https://www.onenote.com/api/v1.0/me/notes/notebooks');
    Logger.log(response.getContentText());
  } else {
    var authorizationUrl = onenote.getAuthorizationUrl();
    Logger.log('Please visit the following URL and then rerun the script: ' + authorizationUrl);
  }
}

function authCallbackOneNote(request){
  var onenote = getServiceOneNote();
  var isAuthorized = onenote.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this page.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this page.');
  }
}
