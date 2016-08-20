//
// https://ctrlq.org/code/19735-find-distance-in-google-sheets
//

 
/* Credit: http://webapps.stackexchange.com/questions/16757 */
function getDirection(city1, city2) {
 
 var directions = Maps.newDirectionFinder()
    .setOrigin(city1).setDestination(city2)
    .setMode(Maps.DirectionFinder.Mode.DRIVING)
    .getDirections();
 
 var d = directions.routes[0].legs[0].distance.text;
  
  return parseInt(d.split(" ")[0].replace(",", ""));;
}
 
function getMileage(city1, city2) {
  var p1 = Maps.newGeocoder().geocode(city1);
  var p2 = Maps.newGeocoder().geocode(city2);
  
  return getDistance(getCoordinates(p1), getCoordinates(p2), opt);
}
 
function getCoordinates(point) {
  var result = point.results[0].geometry.location;
  
  return {"lng": result.lng, "lat": result.lat} 
}
 
function getDistance(c1, c2, opt) {
  var lat1 = rad(c1.lat), lat2 = rad(c2.lat);
  var lng1 = rad(c1.lng), lng2 = rad(c2.lng);
  var dLng = (lng2-lng1), dLat = (lat2-lat1);
  var R = 6371/1.6;
  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
    Math.sin(dLng/2) * Math.sin(dLng/2) * 
    Math.cos(lat1) *  Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      
  return parseInt(R * c);
}
 
function rad(degrees) {
  return degrees * Math.PI/180;
}