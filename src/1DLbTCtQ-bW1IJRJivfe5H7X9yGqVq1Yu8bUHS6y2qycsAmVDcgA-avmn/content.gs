function claimYourVideoWithMonetizePolicy() {
  // The ID of the content owner that you are acting on behalf of.
  var onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  // A YouTube video ID to claim. In this example, the video must be uploaded
  // to one of your onBehalfOfContentOwner's linked channels.
  var videoId = 'replaceWithYourVideoID';
  var assetId = 'replaceWithYourAssetID';
  var claimToInsert = {
    'videoId': videoId,
    'assetId': assetId,
    'contentType': 'audiovisual',
    // Set the claim policy to monetize. You can also specify a policy ID here
    // instead of policy rules.
    // For details, please refer to the YouTube Content ID API Policies
    // documentation:
    // https://developers.google.com/youtube/partner/docs/v1/policies
    'policy': {'rules': [{'action': 'monetize'}]},
  };
  try {
    var claimInserted = YoutubeContentId.Claims.insert(claimToInsert,
        {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    Logger.log('Claim created on video %s: %s', videoId, claimInserted);
  } catch (e) {
    Logger.log('Failed to create claim on video %s, error: %s',
               videoId, e.message);
  }
}