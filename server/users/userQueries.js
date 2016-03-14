// user queries
var models = require('../config/db.js');
var users = models.Users;
var jwt = require( 'jwt-simple' );
var Q = require('q');
var bcrypt = require('bcrypt');
// add user
var addUser = function (userDetails) {
  // CREATE USER IF DOESN'T EXIST
  // console.log(userDetails);
  hashPass(userDetails.password)
    .then(function (hashed){
      users
        .findOrCreate({where:{
          userName:userDetails.userName},
          defaults:{name: userDetails.name,
          email: userDetails.email,
          salt: '1',
          password: 'fun'
        }})
        .spread(function(user, created){
          if (!created) {
            console.log("already exists");
            // response.send("account already exists, should redirect to login");
          } else {
            console.log("in else?");
              // add userDefaults to user_traits
              updateUserInfo(newUser.id, userDetails.traits)
                .then(function (user) {
                  return user;
                });
          }
        })
        .catch(function(err){
          console.error(err);
        });
      }); // closes hash
};
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
};
// returns the info for that user
var getUserInfo = function (userName) {
  users.findOne(
    {where:{userName:userName}})
    .then(function(user){
      return user;
    });
};

var updateUserInfo = function (userId, newTraits) {
  user_traits.findAll(
    {where:{userId:userId}})
      .then(function(traits){
        traits.forEach(function(trait, index){
          user_traits.update(
            {traitId:newTraits[index]},
            {where:{id:trait.id}
        });
      });
    });
  };

var getAllUsers = function () {
  users.findAll()
    .then(function(users){
      return users;
    });
};

// functions used only here:
var hashPass = function(pass){
  var cipher = Q.Promise(bcrypt.hash);
  return cipher;
};

u

module.exports = {
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo,
  addUser: addUser,
  checkPass: checkPass,
  getAllUsers: getAllUsers
};
