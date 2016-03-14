voteQueries = require('./voteQueries.js');
// vote controller

// does what it has to do when some fool votes
function registerVote (vote) {
  // vote controller adds to vote table (with estabId, zone, etc.)
  voteQueries.addVote(vote)
    .then(function(nothing){
      //TODO:
      //emit to vote zone room
      // vote controller would have to ZOEN ROOM to the appropriate socketIds that a new vote happened and send that info
    });
};

module.exports = {
  registerVote: registerVote
};

// sends vote
