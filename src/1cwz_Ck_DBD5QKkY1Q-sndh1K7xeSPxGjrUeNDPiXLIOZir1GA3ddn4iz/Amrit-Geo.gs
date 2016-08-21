function geocode_Addresses() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var locationInfo = sheet.getRange(1, 1, sheet.getLastRow() - 1, 1).getValues();
  var geoResults, lat, lng;
 
  for (var i = 0; i < locationInfo.length; i++) {
    geoResults = Maps.newGeocoder().geocode(locationInfo[i]);
 
    // Get the latitude and longitude
    lat = geoResults.results[0].geometry.location.lat;
    lng = geoResults.results[0].geometry.location.lng;
    sheet.getRange(i+1, 2, 1, 1).setValue(lat + "," + lng);    
    Utilities.sleep(1000);    
  }
}
 