function retrieveMyUploads() {
  var results = YouTube.Channels.list('contentDetails', {
    mine: true
  });

  for (var i = 0; i < results.items.length; i++) {
    var item = results.items[i];
    // Get the channel ID - it's nested in contentDetails, as described in the
    // Channel resource:
    //    https://developers.google.com/youtube/v3/docs/channels
    var playlistId = item.contentDetails.relatedPlaylists.uploads;

    var nextPageToken;
    while (nextPageToken != null) {
      var playlistResponse = YouTube.PlaylistItems.list('snippet', {
        playlistId: playlistId,
        maxResults: 25,
        pageToken: nextPageToken
      });

      for (var j = 0; j < playlistResponse.items.length; j++) {
        var playlistItem = playlistResponse.items[j];
        Logger.log('[%s] Title: %s',
                   playlistItem.snippet.resourceId.videoId,
                   playlistItem.snippet.title);

      }
      nextPageToken = playlistResponse.nextPageToken;
    }
  }
}
