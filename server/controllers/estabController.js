var Establishments = require('../config/db').Establishments;
var Votes = require('../config/db').Votes;
var EstablishmentHistories = require('../config/db').EstablishmentHistories;
var voteController = require('./voteController.js')

// get all relevant establishment info in these zones
// receives a userId, and a number of zones
// returns a lot of stuff

var getEstabsInZones = function(userId, zones, callback) {
  // Find all establishmenents in zones, and include last 24 hours of votes for each trait,
  // plus lifetime votes by this user
  voteController.getAllUserVotesInZones(userId, zones)
  .then(function (userVotes) {
    var restaurantData = {}; 
    var restaurantHistories = {};
    var restaurantVotes = {};
    restaurantData.userVotes = userVotes;
    Establishments.findAll({raw: true,where:{zoneNumber:{$in:zones}}})
      .then(function (estabs) {
        var x = 0;
        var finished = false;
        
        while (!finished) {
          if(x === estabs.length) {
              finished = true;
            }
          x++;
          if(estabs[x] !== undefined) {
             
            var estab = estabs[x];
            
            restaurantData[estab.id] = {};
            restaurantData[estab.id].info = estab;

            EstablishmentHistories.findOne({raw:true,where:{establishmentId: estab.id}})
              .then(function (estabHist){
                restaurantHistories[estabHist.id] = estabHist;
                // get recent votes for that restaurant
               
                voteController.getVotesInZones(zones, 24*60*60*1000)
                  .then(function(estabVotes){
                    restaurantVotes = estabVotes;
                    if(finished) {
                      callback(restaurantData, restaurantHistories, restaurantVotes);
                    }
                   
                  });
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        }
        
      })        
  });
};

module.exports = {
  getEstabsInZones: getEstabsInZones
};

/*
return Establishments.findAll({raw: true,
                                 where:{zoneNumber:{$in:zones}},
                                 include: [{model: Votes,
                                            required: false,
                                            where: {$or: [{$and: [{traitId: 1},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 2},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 3},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 4},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 5},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 6},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 7},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 8},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 9},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {userId: userId}
                                                         ]}}]});
                                                        */
// };