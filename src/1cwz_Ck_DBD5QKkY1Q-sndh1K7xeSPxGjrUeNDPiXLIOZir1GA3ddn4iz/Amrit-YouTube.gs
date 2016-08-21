//
// https://ctrlq.org/code/19561-youtube-google-apps-script
//


function youtubePlaylist(playlistID){
  
  var oAuthConfig, options, videos = [], result, json, i, start=1, title="";
  
  oAuthConfig = UrlFetchApp.addOAuthService("youtube");
  oAuthConfig.setAccessTokenUrl("https://www.google.com/accounts/OAuthGetAccessToken");
  oAuthConfig.setRequestTokenUrl("https://www.google.com/accounts/OAuthGetRequestToken?scope=http%3A%2F%2Fgdata.youtube.com%2F");
  oAuthConfig.setAuthorizationUrl("https://www.google.com/accounts/OAuthAuthorizeToken");
  oAuthConfig.setConsumerKey("anonymous");
  oAuthConfig.setConsumerSecret("anonymous");
  
  options = {
    "oAuthServiceName" : "youtube",
    "oAuthUseToken" : "always"
  };
 
  do {
 
    // Run in a loop since YouTube Data API only returns 50 videos in a batch
    result = UrlFetchApp.fetch("http://gdata.youtube.com/feeds/api/playlists/" + playlistID
                               + "?v=2&max-results=50&alt=json&start-index="+start, options);
    
    json = Utilities.jsonParse(result.getContentText());
        
    if (!json.feed.entry) 
      break;
    
    if (start==1) {
      videos.push(json.feed.title.$t);
    }
    
    for (i=0; i<json.feed.entry.length; i++) {
      videos.push(json.feed.entry[i].media$group.yt$videoid.$t);
    }
    
    start = start + 50;
    
  } while (start < json.feed.openSearch$totalResults.$t);
  
  Logger.log(videos);
 
}

