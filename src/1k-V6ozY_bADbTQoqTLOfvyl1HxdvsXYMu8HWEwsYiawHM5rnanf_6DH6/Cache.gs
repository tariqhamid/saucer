 
Synergy = {}


Synergy.cookie = function(newCookie)
{
  var cache = CacheService.getDocumentCache()
  if (newCookie)
      cache.put("cookie", newCookie, 600); // cache for 10 minutes

  var cached = cache.get("cookie");
  if (cached != null) {
    return cached;
  }

  return newCookie;
}


Synergy.url

