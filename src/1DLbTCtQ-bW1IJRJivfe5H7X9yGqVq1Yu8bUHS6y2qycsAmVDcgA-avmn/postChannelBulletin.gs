// https://developers.google.com/youtube/v3/code_samples/apps-script

/**
 * This function creates and posts a new channel bulletin, adding a video and message. Note that this
 * will also accept a playlist ID. After completing the API call, logs the output to the log.
 */
function postChannelBulletin() {
  var message = 'Thanks for subscribing to my channel!  This posting is from Google Apps Script';
  var videoId = 'qZRsVqOIWms';
  var resource = {
    snippet: {
      description: message
    },
    contentDetails: {
      bulletin: {
        resourceId: {
          kind: 'youtube#video',
          videoId: videoId
        }
      }
    }
  };

  var response = YouTube.Activities.insert(resource, 'snippet,contentDetails');
  Logger.log(response);
}