// establishment queries
var models = require('../config/db.js');
var estabs = models.Establishments;

// get establishments in a certain zone
//zoneLat, zoneLong
var getEstabsInZones = function(zones) {
  estabs.findAll({where:{zone:{$in:zones}}})
    .then(function(estabsInZones){
      return estabsInZones;
    });
};

module.exports = {
  getEstabs: getEstablishments
};
