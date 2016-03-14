// VOTE POPULATOR

/*
This code
1) Creates "35 fake users" record with
2) Give users default traits
2) Creates "10 votes per user per establishment

// for now everyone is in the same zone

To run, uncomment code below and restart server. Once database is updated, comment out code

*/

var db        = require('../config/db');
var userQueries = require('./userQueries.js');
var voteQueries = require('./voteQueries.js');

var createFakeVotes = function (numPerUser) {
  userQueries.getAllUsers()
    .then(function(users){
      users.forEach(function(user){

      });
    });

};
// var populateEstablishements = require('./establishments/populateEstablishments');
// var populateUsers = require('./users/populateUsers');

createFakeVotes(5);
