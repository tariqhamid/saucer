//
// https://ctrlq.org/code/19710-social-share-counts
//


function testSocialShares() {
  var url = "http://www.labnol.org/";
  getSocialCounts(url);
}
 
/* Credit: https://gist.github.com/tomcritchlow/904203 */
function getSocialCounts(url) {
  
  var json, response;
  
  var json = UrlFetchApp.fetch("http://graph.facebook.com/"+url);
  var response = Utilities.jsonParse(json.getContentText());
  Logger.log("Facebook Likes :: " + response.likes);
  
  json = UrlFetchApp.fetch("https://graph.facebook.com/fql?q=SELECT%20share_count%20FROM%20link_stat%20WHERE%20url%20=%22" + url + "%22");
  response = Utilities.jsonParse(json.getContentText());
  Logger.log("Facebook Shares :: " + response.data[0].share_count);
  
  json = UrlFetchApp.fetch("http://urls.api.twitter.com/1/urls/count.json?url="+url);
  response = Utilities.jsonParse(json.getContentText());
  Logger.log("Twitter Shares :: " + response.count);
  
  json = UrlFetchApp.fetch("http://www.linkedin.com/countserv/count/share?format=json&url="+url);
  response = Utilities.jsonParse(json.getContentText());
  Logger.log("LinkedIn Shares :: " + response.count);
  
  json = UrlFetchApp.fetch("http://www.stumbleupon.com/services/1.01/badge.getinfo?url="+url);
  response = Utilities.jsonParse(json.getContentText());
  Logger.log("SU :: " + response.result.views);
 
 
}

