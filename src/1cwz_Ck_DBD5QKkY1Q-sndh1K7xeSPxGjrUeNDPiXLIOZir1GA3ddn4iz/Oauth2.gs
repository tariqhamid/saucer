//
// https://developers.google.com/apps-script/migration/oauth-config
//

/*
    public class Twitter
    {
        public string OAuthConsumerSecret { get; set; }
        public string OAuthConsumerKey { get; set; }

        #region get hashtags 
        // GET /1.1/search/tweets.json?q=%23smalltalk HTTP/1.1
        public async Task<string> GetTweets(string query, int count, string accessToken = null)
        //public async Task<IEnumerable<string>> GetTweets(string query, int count, string accessToken = null)
        {
            if (accessToken == null)
            {
                accessToken = GetAccessToken();
            }

            var requestTweets = new HttpRequestMessage(HttpMethod.Get,
                string.Format("https://api.twitter.com/1.1/search/tweets.json?q={0}&count={1}", query, count));
            requestTweets.Headers.Add("Authorization", "Bearer " + accessToken);
            var httpClient = new HttpClient();
            HttpResponseMessage responseUserTweets = httpClient.SendAsync(requestTweets).Result;
            var serializer = new JavaScriptSerializer();
            string json = await responseUserTweets.Content.ReadAsStringAsync();

            return json;
        }
        #endregion


        public async Task<IEnumerable<string>> GetTwitts(string userName, int count, string accessToken = null)
        {
            if (accessToken == null)
            {
                accessToken = GetAccessToken();
            }

            var requestUserTimeline = new HttpRequestMessage(HttpMethod.Get, string.Format("https://api.twitter.com/1.1/statuses/user_timeline.json?count={0}&screen_name={1}&trim_user=1&exclude_replies=1", count, userName));
            requestUserTimeline.Headers.Add("Authorization", "Bearer " + accessToken);
            var httpClient = new HttpClient();
            HttpResponseMessage responseUserTimeLine = await httpClient.SendAsync(requestUserTimeline);
            var serializer = new JavaScriptSerializer();
            dynamic json = serializer.Deserialize<object>(await responseUserTimeLine.Content.ReadAsStringAsync());
            var enumerableTwitts = (json as IEnumerable<dynamic>);

            if (enumerableTwitts == null)
            {
                return null;
            }
            return enumerableTwitts.Select(t => (string)(t["text"].ToString()));
        }

        public string GetAccessToken()
        {
            var httpClient = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.twitter.com/oauth2/token ");
            var customerInfo = Convert.ToBase64String(new UTF8Encoding().GetBytes(OAuthConsumerKey + ":" + OAuthConsumerSecret));
            request.Headers.Add("Authorization", "Basic " + customerInfo);
            request.Content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

            // HttpResponseMessage response = await httpClient.SendAsync(request);
            HttpResponseMessage response = httpClient.SendAsync(request).Result;

            string json = response.Content.ReadAsStringAsync().Result;
            var serializer = new JavaScriptSerializer();
            dynamic item = serializer.Deserialize<object>(json);
            return item["access_token"];
        }
    }

*/
/*
/*
            var twitter = new Twitter.Twitter
            {
                OAuthConsumerKey = "388ZwPWX13pUFYdxrzc1LHzwt",
                OAuthConsumerSecret = "NULdfHaej7f97Jw28EBibUX5lMdG1DtvoJQ5ev0jmNAlaeC6H2"
            };
*/

var CONSUMER_KEY = 'hZZ39Wus5hsXLfQ3O1ayFclms';
var CONSUMER_SECRET = 'Sjn3QWlez5N3VstoXNIPxO3HrxxzRf5BGz4POnL65VJJGmN34k';
//var PROJECT_KEY = '...';

function listTweets() {
  var service = getTwitterService();
  if (service.hasAccess()) {
    var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    var response = service.fetch(url);
    var tweets = JSON.parse(response.getContentText());
    for (var i = 0; i < tweets.length; i++) {
      Logger.log(tweets[i].text);
    }
  } else {
    var authorizationUrl = service.authorize();
    Logger.log('Please visit the following URL and then re-run the script: ' + authorizationUrl);
  }
}

function getTwitterService() {
/*
  var service = OAuth1.createService('twitter');
  service.setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
  service.setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
  service.setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
  service.setConsumerKey(CONSUMER_KEY);
  service.setConsumerSecret(CONSUMER_SECRET);
  //service.setProjectKey(PROJECT_KEY);
  service.setCallbackFunction('authCallback');
  service.setPropertyStore(PropertiesService.getScriptProperties());
*/

   // App-only authentication https://api.twitter.com/oauth2/token
   // Request token URL https://api.twitter.com/oauth/request_token
   // Authorize URL https://api.twitter.com/oauth/authorize
   // Access token URL https://api.twitter.com/oauth/access_token 
  


    return OAuth2.createService('Twitter')
        // Set the endpoint URLs.
        .setAccessTokenUrl("https://api.twitter.com/oauth/access_token")
        .setRequestTokenUrl("https://api.twitter.com/oauth/request_token")
        .setAuthorizationUrl("https://api.twitter.com/oauth/authorize")

      // Set the client ID and secret.
      .setClientId(CONSUMER_KEY)
      .setClientSecret(CONSUMER_SECRET)

      // Set the name of the callback function that should be invoked to complete
      // the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())
}

function authCallback(request) {
  var service = getTwitterService();
  var isAuthorized = service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this page.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this page');
  }
}


// https://dev.twitter.com/web/sign-in/implementing
//
// Step 1.
function authorizeTwitter() {
  var service = getTwitterService();
  if (!service.hasAccess()) {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL to authorize: %s',
               authorizationUrl);
  } else {
    Logger.log('Your account is already authorized');
  }
}

//------------------------
/*
function main()
{
    var TWITTER_CONSUMER_KEY     = "MYKEY";
    var TWITTER_CONSUMER_SECRET  = "MYSECRET";
 
    ScriptProperties.setProperty("TWITTER_CONSUMER_KEY",    TWITTER_CONSUMER_KEY);
    ScriptProperties.setProperty("TWITTER_CONSUMER_SECRET", TWITTER_CONSUMER_SECRET);
    login();
    tweet("hi there");
}
 
 
function login()
{
    var loginConfig = UrlFetchApp.addOAuthService("twitter");
    loginConfig.setAccessTokenUrl("https://api.twitter.com/oauth/access_token");
    loginConfig.setRequestTokenUrl("https://api.twitter.com/oauth/request_token");
    loginConfig.setAuthorizationUrl("https://api.twitter.com/oauth/authorize");
    loginConfig.setConsumerKey(ScriptProperties.getProperty("TWITTER_CONSUMER_KEY"));
    loginConfig.setConsumerSecret(ScriptProperties.getProperty("TWITTER_CONSUMER_SECRET"));
}
 
function tweet(text)
{
    var params =
    {
        "method": "POST",
        "oAuthServiceName":"twitter",
        "oAuthUseToken":"always"        
    };
    var status =  "https://api.twitter.com/1.1/statuses/update.json";
    status = status + "?status=" + text;
    try
    {
        var success = UrlFetchApp.fetch(status, params);
        Logger.log(success.getContentText());
    }
    catch(ex)
    {
       Logger.log(ex.toString()); 
    }
}
*/

