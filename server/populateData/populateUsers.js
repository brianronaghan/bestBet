// query and controller testers

/*
This code
1) Creates "50 fake users" records
2) Give users default traits
// for now everyone is in the same zone
*/

var db       = require('../config/db');
var userCtrl = require('../controllers/userController.js');

var firstNames = ['joe','bob','jon','al','kim','joan','julie','bee','ann','beth'];
var lastNames = ['a','b','c','d','e','f','g','h','i','j'];

var createFakeUsers = function(num) {
  var y = num-1;
  for (var x = 0; x < num; x++) {
    var user = {};
    user.name = firstNames[x%10] +' '+ lastNames[y%10];
    user.userName = 'user' + x;
    user.password = firstNames[x%10];
    user.traitCombo = [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)].join('');
    userCtrl.addUser(user);
      // userCtrl.setUserTraits(user);

    y--;
    }
  };


createFakeUsers(20);
