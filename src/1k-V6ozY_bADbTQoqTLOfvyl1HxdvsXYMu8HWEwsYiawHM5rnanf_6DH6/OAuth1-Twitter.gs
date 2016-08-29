// https://libraries.io/github/googlesamples/apps-script-oauth1

function getTwitterService0() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth1.createService('twitter')
      // Set the endpoint URLs.
      .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
      .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
      .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')

      // Set the consumer key and secret.
      .setConsumerKey('...')
      .setConsumerSecret('...')

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties());
}


function showSidebar() {
  var twitterService = getTwitterService();
  if (!twitterService.hasAccess()) {
    var authorizationUrl = twitterService.authorize();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    DocumentApp.getUi().showSidebar(page);
  } else {
    // ...
  }
}


function authCallback(request) {
  var twitterService = getTwitterService();
  var isAuthorized = twitterService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

function makeRequest() {
  var twitterService = getTwitterService();
  var response = twitterService.fetch('https://api.twitter.com/1.1/statuses/user_timeline.json');
  //...
}

function clearService(){
  OAuth1.createService('twitter')
      .setPropertyStore(PropertiesService.getUserProperties())
      .reset();
}


