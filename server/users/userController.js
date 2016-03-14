// user controller
var zoneHandler = require('../services/zoneHandler.js');
var estabQueries = require('../establishments/establishmentQueries.js');
var voteQueries = require('../votes/voteQueries.js');

// sets the users current zone and sends back the relevant establishments
var setUserZone = function (user) {
  var zones = [];
  // if the user has just logged in, we need to get all 9 relevant zones
  if(user.OldZone === null) {
    zoneHandler.getSurroundingZones(user.NewZone);
  } else {// if there was an old zone though, we only need to send a certain group of new ones
    zoneHandler.getNewZonesOnMove(user.OldZone, user.NewZone);
  }
  sendData(zones);
  // remember, WHEN WE GET TO THE CLIENT SIDE:
    // the client must delete the data from old zones AND leave those "rooms" AND join the newRooms
};

// gets the currently surrounding establishments and emits back to client...
var sendData = function (zones) {
  // LOAD establishment data (from establishment table in DB) for appropriate zones
  estabQueries.getEstabsInZones(zones)
    .then(function(zoneEstabs){
      voteQueries.getVotesInZones(zones)
        .then(function(zoneVotes){
          // TODO:
          // then emit that to the that socketID
          // QUES: FILTER vote data for traits that are TIME SENSITIVE -- only send back the
          // send back JWOT and relevant establishment data and relevant vote data andZone
          // --
        });
    });

};

// changes the user's stored default traits in the DB -- doesn't send anything back
function changeDefaultTraits (user) {
  //TODO:
  // note - the client will also reset them locally, and we WON'T send these back to the client
  // the client will only reference them on next login
};
module.exports = {
  setUserZone: setUserZone,
  sendSurroundingEstablishments: sendEstablishments,
  changeDefaultTraits: changeDefaultTraits
};
