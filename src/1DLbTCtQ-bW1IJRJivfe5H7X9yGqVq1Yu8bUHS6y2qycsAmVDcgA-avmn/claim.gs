// https://developers.google.com/apps-script/advanced/youtube-content-id

function releaseClaim() {
  var onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  // The ID of the claim to be released.
  var claimId = 'replaceWithYourClaimID';
  // To release the claim, change the resource's status to inactive.
  var claimToBeReleased = {
    'status': 'inactive'
  };
  try {
    var claimReleased = YoutubeContentId.Claims.patch(claimToBeReleased,
        claimId, {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    Logger.log('Claim %s was released: %s', claimId, claimReleased);
  } catch (e) {
    Logger.log('Failed to release claim %s, error: %s', claimId, e.message);
  }
}