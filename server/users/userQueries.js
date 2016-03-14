// user queries
var models = require('../config/db.js');
var users = models.Users;
var jwt = require( 'jwt-simple' );
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
// add user
var addUser = function (userDetails) {
  // CREATE USER IF DOESN'T EXIST
  hashPass(userDetails.password)
    .then(function (hashed){
      users
        .findOne({where:
          {userName: userDetails.userName}
        })
        .then(function(user){
          if (user) {
            response.send("account already exists, should redirect to login");
          } else {
            users.create({userName: user.userName,
              name: user.name,
              email: user.email,
              salt: 153, // forgot how to salt
              password: hashed,
            })
            .then(function (newUser) {
              // add userDefaults to user_traits
              updateUserInfo(newUser.userName, userDetails.traits)
                .then(function (user) {
                  return user;
                });
            });
          }
        });
      });
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
            {where:{id:trait.id}}
        })
        .then(function(){
          console.log("great!");
        });
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
  updateUserInfo: updateUserInfo,
  addUser: addUser,
  checkPass: checkPass
};
