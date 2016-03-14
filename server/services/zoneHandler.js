// zoneHandler services
var _ = require('underscore');
// these variables  represent the width/height of the theoretical zone Matrix
var ZONE_HEIGHT = 10; // not sure I actually ever need the height for any purpose
var ZONE_WIDTH = 10;

// calulates the nature of the move based on the relation between the zone numbers
var getNewZonesOnMove = function (oldZone, newZone) {
  // set an array to hold the oldZone numbers and newZone numbers
  var zonesToUpdate = [[],[]];
  // if the zone is in the same row
  if(Math.abs(newZone-oldZone) <2) {
    //if the newZone is left
      if (newZone < oldZone) {
        // add the col left of boundary to new, right of bound to old
        zonesToUpdate[1] = getALineOfZones(newZone, "w");
        zonesToUpdate[0] = getALineOfZones(newZone, "e");
      } else { // if the zone is right
        // add the col right of boundary to new, left of bound to old
        zonesToUpdate[1] = getALineOfZones(newZone, "e");
        zonesToUpdate[0] = getALineOfZones(newZone, "w");
      }
  } else {// if the newZone is NOT in the same row
    // if it's above to oldZone
    if (newZone < oldZone) {
      // add the row above of boundary to new, below of bound to old
      zonesToUpdate[1] = getALineOfZones(newZone, "n");
      zonesToUpdate[0] = getALineOfZones(newZone, "s");

      // if it's in the same column
      if(isACorner() === false) {
        return zonesToUpdate;
      } else if (isACorner === 'e') {
        // add the east row to the north row
        _uniq(zonesToUpdate[1].concat(getALineOfZones(newZone, "e")));
        _uniq(zonesToUpdate[0].concat(getALineOfZones(newZone, "w")));
        return zonesToUpdate;

      } else {
        _uniq(zonesToUpdate[1].concat(getALineOfZones(newZone, "w")));
        _uniq(zonesToUpdate[0].concat(getALineOfZones(newZone, "e")));
        return zonesToUpdate;
      }
    } else { // if the zone is below oldZone
      // get the row below the boundary
      zonesToUpdate[1] = getALineOfZones(newZone, "n");
      zonesToUpdate[0] = getALineOfZones(newZone, "s");
      if(isACorner === false) {
        return zonesToUpdate;
      } else if (isACorner === 'e') {
        // add the east row to the south row
        _uniq(zonesToUpdate[1].concat(getALineOfZones(newZone, "e")));
        _uniq(zonesToUpdate[0].concat(getALineOfZones(newZone, "w")));
        return zonesToUpdate;
      } else {
        // add the west row to the south row
        _uniq(zonesToUpdate[1].concat(getALineOfZones(newZone, "w")));
        _uniq(zonesToUpdate[0].concat(getALineOfZones(newZone, "e")));
        return zonesToUpdate;
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
  var zoneArr = [[],[]];
  for (var x = -1; x <=1; x++) {
    for (var y = -1; y <=1; y++) {
      zoneArr[1].push(zoneNumber + x * ZONE_WIDTH + y);
    }
  }
  return zoneArr;
};

// not sure if we'll need this since the CLIENT will calc this and store it and send it
// var calculateZoneNumber = function (long, lat) {
//   // calculate zone name based on mutliplying and flooring... of longs and lats
//   // TBD when we find the zone system
// };

module.exports = {
  getSurroundingZones: getSurroundingZones,
  getNewZonesOnMove: getNewZonesOnMove
};
