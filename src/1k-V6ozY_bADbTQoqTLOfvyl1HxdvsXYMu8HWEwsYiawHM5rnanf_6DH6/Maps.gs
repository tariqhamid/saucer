function distanceBetweenPoints(start_point, end_point) {
  // get the directions
  var directions = Maps.newDirectionFinder()
     .setOrigin(start_point)
     .setDestination(end_point)
     .setMode(Maps.DirectionFinder.Mode.DRIVING)
     .getDirections();
  
  // get the first route and return the distance
  var route = directions.routes[0];
  var distance = route.legs[0].distance.text;
  return distance;
}