// https://gist.github.com/greenido/9f8882fada71adbcbed7

/**
* YouTube Analytics API Example
* Fetch views and 'estimated view time' on videos you have in your channel.
*
* @Author: Ido Green
* @Date: Aug 2014
*
*/
function getVideoEstimatedMinutesWatched(videoId) {
  var myChannels = YouTube.Channels.list('id', {mine: true});
  var channel = myChannels.items[0];
  var channelId = channel.id;
  
  if (channelId) {
    var today = new Date();
    var monthAgo = new Date();
    monthAgo.setMonth(today.getMonth() - 1);
    var todayFormatted = Utilities.formatDate(today, 'UTC', 'yyyy-MM-dd')
    var MonthAgoFormatted = Utilities.formatDate(monthAgo12, 'UTC', 'yyyy-MM-dd');

    var analyticsResponse = YouTubeAnalytics.Reports.query(
      'channel==' + channelId,
       MonthAgoFormatted,
       todayFormatted,
      'views,estimatedMinutesWatched',
      {
        dimensions: 'video',
        filters: 'video==' + videoId
      });
    
    Logger.log("Analytics for " + videoId + ": \n " + analyticsResponse.rows)[0];
    return analyticsResponse.rows[0];
  }
  else {
    return "N/A Please check the video ID";
  }
}
