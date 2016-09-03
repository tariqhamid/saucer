function updateAssetOwnership() {
  var onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  var assetId = 'replaceWithYourAssetID';
  // The new ownership here would replace your existing ownership on the asset.
  var myAssetOwnership = {
    'general': [
      {
        'ratio': 100,
        'owner': onBehalfOfContentOwner,
        'type': 'include',
        'territories': [
          'US',
          'CA'
        ]
      }
    ]
  };
  try {
    var updatedOwnership = YoutubeContentId.Ownership.update(myAssetOwnership,
        assetId, {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    Logger.log('Ownership updated on asset %s: %s', assetId, updatedOwnership);
  } catch (e) {
    Logger.log('Ownership update failed on asset %s, error: %s',
               assetId, e.message);
  }
}