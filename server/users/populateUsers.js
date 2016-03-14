// query and controller testers

/*
This code
1) Creates "10 fake users" record with
2) Give users default traits
2) Creates "10 votes per user per establishment

// for now everyone is in the same zone

To run, uncomment code below and restart server. Once database is updated, comment out code

*/

var db        = require('../config/db');
var authCtrl  = require('../auth/authController.js');
var userQueries = require('../user/userQueries.js');


var firstNames = ['joe','bob','jon','al','kim','joan','julie','bee','ann','beth'];
var lastNames = ['a','b','c','d','e','f','g','h','i','j'];
var createFakeUsers = function(num) {
  var theUsers = [];
  var y = num-1;
  for (var x = 0; x < num; x++) {
    theUsers[x] = {};
    theUsers[x].userName = 'user' + x;
    theUsers[x].name = firstNames[x%10] + lastNames[y%10];
    theUsers[x].password = '1';
    y--;
    userQueries.addUser(theUsers[x]);
  }
};
