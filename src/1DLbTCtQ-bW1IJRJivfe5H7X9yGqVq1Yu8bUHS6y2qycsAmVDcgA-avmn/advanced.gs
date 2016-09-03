// https://developers.google.com/apps-script/advanced/youtube

function searchByKeyword() {
  var results = YouTube.Search.list('id,snippet', {
    q: 'dogs',
    maxResults: 25
  });

  for (var i = 0; i < results.items.length; i++) {
    var item = results.items[i];
    Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
  }
}
