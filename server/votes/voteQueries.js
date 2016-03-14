// vote queries
var models = require('../config/db.js');
var votes = models.Votes;

// add vote
var addVote = function (vote) {
  votes.create({
    establishmentId: voteId,
    traitId: vote.traitId,
    userId: vote.userId,
    voteValue: vote.value,
    time: vote.time,
    zone: vote.zone
  })
  .then(function (vote){
    return;
    })
    .catch(function(err){
      error.log(err);
    });
};
// get all votes in a set of zones
var getVotesInZones = function (zones) {
  votes.findAll({where:{zone: {$in:zones}}})
    .then(function(votesInZones){
      return votesInZones;
    });
};

module.exports = {
  addVote: addVote,
  getVotesInZone: getVotesInZone
};
//
// var Votes = db.define('Votes', {
//     id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     establishmentId: {type: Sequelize.INTEGER, notNull: true},
//     traitId: {type: Sequelize.INTEGER, notNull: true},
//     userId: {type: Sequelize.INTEGER, notNull: true},
//     voteValue: {type: Sequelize.BOOLEAN, notNull: true},
//     time: {type: Sequelize.DATE, notNull: true},
//     zoneLat: {type: Sequelize.INTEGER, notNull: true},
//     zoneLon: {type: Sequelize.INTEGER, notNull: true}
//   }, { timestamps: false });
