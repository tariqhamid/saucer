//
// https://ctrlq.org/code/19992-google-maps-functions-for-google-script
//

 
/* Get the Google Maps Link */
/* The longitude and latitude are passed as a comma separated string */
function getGoogleMapsLink(longLat) {
  return "https://maps.google.com/maps?q="+longLat;
}
 
/* Get the Postal Address from geo location */
function getStreetAddress(longLat) {
  var longLat = longLat.split(',');
  var response = Maps.newGeocoder().reverseGeocode(longLat[0], longLat[1]);
  if(response.status === "OK") {
    return response.results[0].formatted_address;
  }
  return null;
}
 
/* Get the latitude, longitude from the postal address */
function geocode(address) {
    var response = Maps.newGeocoder().setRegion('com').geocode(address);
    var longLat = {};
    var l;
    Logger.log("address: " + address);
    if (response.status === "OK") {
      Logger.log("response " + JSON.stringify(response));
      if((l = response.results[0].geometry.location)) {
        longLat.lng = l.lng;
        longLat.lat = l.lat;
        return longLat;
      }
    }
    else {
      return "error";
    }
}
