function addSubscription() {
  // Replace this channel ID with the channel ID you want to subscribe to
  var channelId = 'UC9gFih9rw0zNCK3ZtoKQQyA';

  var resource = {
    snippet: {
      resourceId: {
        kind: 'youtube#channel',
        channelId: channelId
      }
    }
  };

  try {
    var response = YouTube.Subscriptions.insert(resource, 'snippet');
    Logger.log(response);
  } catch (e) {
    if (e.message.match('subscriptionDuplicate')) {
      Logger.log('Cannot subscribe; already subscribed to channel: ' +
          channelId);
    } else {
      Logger.log('Error adding subscription: ' + e.message);
    }
  }
}