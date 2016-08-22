// speed-up !

function getRssFeed() {
  var cache = CacheService.getPublicCache();
  var cached = cache.get("rss-feed-contents");
  if (cached != null) {
    return cached;
  }
  var result = UrlFetchApp.fetch("http://example.com/my-slow-rss-feed.xml"); //takes 20 seconds to get
  var contents = result.getContentText();
  cache.put("rss-feed-contents", contents, 1500); // cache for 25 minutes
  return contents;
}


function urlContents(url) 
{
  var cache = CacheService.getPublicCache();
  var cached = cache.get(url);
  if (cached != null) {
    return cached;
  }
  var result = UrlFetchApp.fetch(url); //takes 20 seconds to get
  var contents = result.getContentText();
  cache.put(url, contents, 1500); // cache for 25 minutes
  return contents;
}