var http = require('./config/routes.js');

var port = process.env.PORT || 3000;
http.listen(port);
console.log('Server listening on port ' + port);

// These modules populates the db:

// UNCOMMENT THESE NEXT THREE TO POPULATE YOUR DATABASE, THEN COMMENT IT OUT AGAIN:

// var populateEstablishements = require('./populateData/populateEstablishments');
// var populateUsers           = require('./populateData/populateUsers');
// var populateVotes           = require('./populateData/populateVotes');

var getRevs = require('./populateData/smartVoter.js');

