/**
 * This function retrieves the current script user's uploaded videos. To execute,
 * it requires the OAuth read/write scope for YouTube as well as user authorization.
 * In Apps Script's runtime environment, the first time a user runs a script, Apps
 * Script will prompt the user for permission to access the services called by the
 * script. After permissions are granted, they are cached for some periodF of time.
 * The user running the script will be prompted for permission again once the
 * permissions required change, or when they are invalidated by the
 * ScriptApp.invalidateAuth() function.
 *
 * This script takes the following steps to retrieve the active user's uploaded videos:
 *    1. Fetches the user's channels
 *    2. Fetches the user's 'uploads' playlist
 *    3. Iterates through this playlist and logs the video IDs and titles
 *    4. Fetches a next page token (if any). If there is one, fetches the next page. GOTO Step 3
 */
function retrieveMyUploads() {
  var results = YouTube.Channels.list('contentDetails', {mine: true});
  for(var i in results.items) {
    var item = results.items[i];
    // Get the playlist ID, which is nested in contentDetails, as described in the
    // Channel resource: https://developers.google.com/youtube/v3/docs/channels
    var playlistId = item.contentDetails.relatedPlaylists.uploads;

    var nextPageToken = '';

    // This loop retrieves a set of playlist items and checks the nextPageToken in the
    // response to determine whether the list contains additional items. It repeats that process
    // until it has retrieved all of the items in the list.
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