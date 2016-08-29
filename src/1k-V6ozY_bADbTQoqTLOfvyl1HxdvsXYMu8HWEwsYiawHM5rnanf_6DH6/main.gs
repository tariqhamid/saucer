/*
Client ID	6c8c008f935e4ea57609
Client Secret	25b5a5f098e66c91ea845f8d060e7782f006c800

MikEQHX9sr8MV3Tpsauv0Gg_JiAr4mIiA
*/

var GitHub_CLIENT_ID = '6c8c008f935e4ea57609',
    GitHub_CLIENT_SECRET = '25b5a5f098e66c91ea845f8d060e7782f006c800',
    USERNAME = 'tariqhamid';

var ISSUE_PROPERTIES = ['number', 'title', 'url'];

/*
function onOpenGitHub() {
  SpreadsheetApp.getUi()
    .createMenu('GitHub')
    .addItem('Authorize', 'openAuthDialog')
    .addItem('Export', 'openExportDialog')
    .addToUi();
}
*/

function openAuthDialog() {
  var gitHubService = getGitHubService();
  if (gitHubService.hasAccess()) {
    Browser.msgBox('Already autherized');
  } else {
    var authorizationUrl = gitHubService.getAuthorizationUrl();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();

    SpreadsheetApp.getUi()
      .showModalDialog(page, 'Authorize');
  }
}

function openExportDialog() {
  var repos = getRepos();

  var template = HtmlService.createTemplateFromFile('exportDialog');
  template.repos = repos;
  var page = template.evaluate();

  SpreadsheetApp.getUi()
    .showModalDialog(page, 'Export');
}

//////////////////////////////////////////////////////////////

function getGitHubService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('GitHub')
      // Set the endpoint URLs, which are the same for all GitHub services.
      .setAuthorizationBaseUrl('https://github.com/login/oauth/authorize')
      .setTokenUrl('https://github.com/login/oauth/access_token')

      // Set the client ID and secret, from
      //   GitHub Settings > Applications > Developer applications
      .setClientId(GitHub_CLIENT_ID)
      .setClientSecret(GitHub_CLIENT_SECRET)

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('gitAuthCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())
}

//function authCallback(request) {
function gitAuthCallback(request) {
  var gitHubService = getGitHubService();
  var isAuthorized = gitHubService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

function clearService() {
  OAuth2.createService('GitHub')
  .setPropertyStore(PropertiesService.getUserProperties())
  .reset();
}

// Reusable function to generate a callback URL, assuming the script has been published as a
// web app (necessary to obtain the URL programmatically). If the script has not been published
// as a web app, set `var url` in the first line to the URL of your script project (which
// cannot be obtained programmatically).
function getCallbackURL(callbackFunction)
{
  //Logger.log(ScriptApp.getScriptId())
  var url = ScriptApp.getService().getUrl();      // Ends in /exec (for a web app)
  url = url.slice(0, -4) + 'usercallback?state='; // Change /exec to /usercallback
  var stateToken = ScriptApp.newStateToken()
    .withMethod(callbackFunction)
    .withTimeout(120)
    .createToken();
  Logger.log(url + stateToken);
}

////////////////////////////////////////////////////

function getRepos() {
  var gitHubService = getGitHubService();
  var response = UrlFetchApp.fetch('https://api.github.com/users/' + USERNAME + '/repos?per_page=200', {
    headers: {
      Authorization: 'Bearer ' + gitHubService.getAccessToken()
    }
  });
  var repos = [];
  response = JSON.parse(response);
  for (var i = 0; i < response.length; i++) {
    repos.push(response[i].name);
  }
  return repos;
}

function export(form) {
  var issues = getIssues(form.repos);
  var values = [];
  for (var i = 0; i < issues.length; i++) {
    var issue = issues[i];
    var value = [];
    for (var j = 0; j < ISSUE_PROPERTIES.length; j++) {
      value.push(issue[ISSUE_PROPERTIES[j]]);
    }
    values.push(value);
  }
  Logger.log(values);
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
}

function getIssues(repo) {
  var gitHubService = getGitHubService();
  var response = UrlFetchApp.fetch('https://api.github.com/repos/' + USERNAME + '/' + repo + '/issues?per_page=200', {
    headers: {
      Authorization: 'Bearer ' + gitHubService.getAccessToken()
    }
  });
  return JSON.parse(response);
}
