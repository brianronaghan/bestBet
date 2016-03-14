// zoneHandler services
var _ = require('underscore');
// these variables  represent the width/height of the theoretical zone Matrix
var zoneH = 10; // not sure I actually ever need the height for any purpose
var ZONE_WIDTH = 10;

// calulates the nature of the move based on the relation between the zone numbers
var getNewZonesOnMove = function (oldZone, newZone) {
  // set an array to hold the newZone numbers
  var newZones = [];
  // if the zone is in the same row
  if(Math.abs(newZone-oldZone) <2) {
    //if the newZone is left
      if (newZone < oldZone) {
        // get the col to left of boundary
        return getALineOfZones(newZone, "w");
      } else { // if the zone is right
        // get the col right of boundary
        return getALineOfZones(newZone, "e");
      }
  } else {// if the newZone is NOT in the same row
    // if it's above to oldZone
    if (newZone < oldZone) {
      // get the row above
      newZones = getALineOfZones(newZone, "n");
      // if it's in the same column
      if(isACorner() === false) {
        return newZones;
      } else if (isACorner === 'e') {
        // add the east row to the north row
        return _uniq(_flatten(newZones.concat(getALineOfZones(newZone, "e"))));
      } else {
        return _uniq(_flatten(newZones.concat(getALineOfZones(newZone, "w"))));
      }
    } else { // if the zone is below oldZone
      // get the row below the boundary
      newZones = getALineOfZones(newZone, "s");
      if(isACorner === false) {
        return newZones;
      } else if (isACorner === 'e') {
        // add the east row to the south row
        return _uniq(_flatten(newZones.concat(getALineOfZones(newZone, "e"))));
      } else {
        // add the west row to the south row
        return _uniq(_flatten(newZones.concat(getALineOfZones(newZone, "w"))));
      }
    }
  } //
  function isACorner (){
    if(newZone % oldZone === 0) { // if it's in the same col, it's not a corner
      return false;
    } else if (newZone % oldZone === 1) { // if it's in the right column
      return "e";
    } else { // else means it's left
      return "w";
    }
  }
};

var getALineOfZones = function (zoneNumber, dir) {
  var line = [];
  switch(dir) {
    case 'n':
      for (var x = -1; x <=1; x++) {
        zoneArr.push(zoneNumber - ZONE_WIDTH + x);
      }
      break;
    case 'w':
      for (var x = -1; x <=1; x++) {
        zoneArr.push(zoneNumber - ZONE_WIDTH*x -1);
      }
      break;
    case 's':
    for (var x = -1; x <=1; x++) {
      zoneArr.push(zoneNumber + ZONE_WIDTH + x);
    }
      break;
    case 'e':
      for (var x = -1; x <=1; x++) {
        zoneArr.push(zoneNumber + ZONE_WIDTH*x -1);
      }
      break;
  }
  return line;
};

// RECEIVES a zone number
// RETURNS and array containing that zone number and the 8 surrounding zones
var getSurroundingZones = function (zoneNumber) {
  var zoneArr = [];
  for (var x = -1; x <=1; x++) {
    for (var y = -1; y <=1; y++) {
      zoneArr.push(zoneNumber + x * ZONE_WIDTH + y);
    }
  }
  return zoneArr;
};

// not sure if we'll need other controllers to have this, maybe not
var calculateZoneNumber = function (long, lat) {
  // calculate zone name based on mutliplying and flooring... of longs and lats
  // TBD when we find the zone system
};

module.exports = {
  getSurroundingZones: getSurroundingZones,
  getNewZonesOnMove: getNewZonesOnMove
};
