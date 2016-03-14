// user queries
var models = require('../config/db.js');
var users = models.Users;
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
// add user
var addUser = function (user) {
  // CREATE USER IF DOESN'T EXIST
  hashPass(user.password)
    .then(function (hashed){
      users
      // this isn't quite right - i only want to check the username,
      // i want to add the other stuff after - because this might create a new user account if anything
      // but the username is different.
        .findOrCreate({where:
          {userName: user.userName,
          name: user.name,
          email: user.email,
          password: hashed}
        })
        .spread(function(user, created) {
          if(created) {
            return user;
          } else {
            return "account already exists, should redirect to login";
          }
      });
    });
// get if attampted password is correct for userName ...
var checkPass = function (userName, attPass) {
  return function() {
    users.findOne({where: {userName: userName}}).then(function(user) {
      if (!user) {
        return false;
      }
      bcrypt.compare(attPass, user.password, function(err, match) {
        if(err) {
          return "error";
        } else {
          return match;
        }
      });
    });
  };
// returns the info for that user
var getUserInfo = function (userName) {
  users.findOne(
    {where:{userName:userName}})
    .then(function(user){
      return user;
    });
};

// functions used only here:
var hashPass = function(pass){
  var cipher = Q.Promise(bcrypt.hash);
  return cipher(pass, null, null);
};


};


module.exports = {
  getUserInfo: getUserInfo,
  addUser: addUser,
  checkPass: checkPass
};
