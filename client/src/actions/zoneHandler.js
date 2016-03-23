// zoneHandler services
var _ = require('underscore');
// these variables  represent the width/height of the theoretical zone Matrix
var NUM_OF_ROWS = 13;
var NUM_OF_COLS = 22;

var zoneCalculator = function(lat,long){
  var northLimit = 37.827747, //Northernmost latitude of SF
      southLimit = 37.700643, //Southernmost latitude of SF
      westLimit = -122.517591, //Westernmost longitude of SF
      eastLimit = -122.356817, //Easternmost longitude of SF
      zoneVertical = 0.7, //Vertical size of the zone in miles
      zoneHorizontal = 0.4, //Horizontal size of the zone in miles
      verticalLength = 8.78, //Total vertical length of SF
      horizontalLength = 8.79; //Total horizontal length of SF

  if(lat < southLimit || lat > northLimit || long < westLimit || long > eastLimit){
    console.log('User is outside San Francisco');
    return "outside service zone"; //User is outside San Francisco
  }

  var verticalZones = Math.ceil(verticalLength / zoneVertical)-1; //13 vertical zones, zero indexed (0 to 12)
  var horizontalZones = Math.ceil(horizontalLength / zoneHorizontal)-1; //22 horizontal zones, zero indexed (0 to 21)
  var verticalStep = (southLimit - northLimit) / verticalZones;
  var horizontalStep = (westLimit - eastLimit) / horizontalZones;
  //Zones are numbered from top-left to bottom-right
  var userX = Math.floor(Math.abs((long - eastLimit) / horizontalStep));
  var userY = Math.floor(Math.abs((lat - northLimit) / verticalStep));
  var zoneNumber = userY * 1000 + userX; //Convert to YYYXXX, where YYY - vertical zone, XXX - horizontal zone
  return zoneNumber;
};

// RECEIVES an Old zone number and the new zone number
// RETURNS and array of two arrays:
  // first array is the zones to unsub from
  // second array is the new zones to sub to
var getNewZonesOnMove = function (oldZoneNumber, newZoneNumber) {
  var oldZones = getSurroundingZones(oldZoneNumber);
  var newZones = getSurroundingZones(newZoneNumber);
  var zonesToUpdate = [[],[]];
  zonesToUpdate[0] = _.difference(oldZones, newZones);
  zonesToUpdate[1] = _.difference(newZones, oldZones);
  return zonesToUpdate;
};

// RECEIVES a zone number
// RETURNS and array containing that zone number and the 8 surrounding zones
var getSurroundingZones = function (zoneNumber) {
  var zoneArr = [];
  for (var x = -1; x <=1; x++) {
    for (var y = -1; y <=1; y++) {
      var zone = zoneNumber + y * 1000 + x;
      if(isAZone(zone)) {
        zoneArr.push(zone);
      }
    }
  }
  return zoneArr;
};

var isAZone = function (zoneNumber) {
  if(zoneNumber >= 0 &&
    zoneNumber % 1000 < NUM_OF_COLS &&
    zoneNumber < (NUM_OF_ROWS-1)*1000+(NUM_OF_COLS) &&
    (zoneNumber+1) % 1000 > 0) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  zoneCalculator: zoneCalculator,
  getSurroundingZones: getSurroundingZones,
  getNewZonesOnMove: getNewZonesOnMove
};