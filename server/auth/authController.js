// auth controller
var voteQueries = require('../votes/voteQueries.js');
var userQueries = require('../user/userQueries.js');
var zoneHandler = require('../services/zoneHandler.js');
var jwt = require( 'jwt-simple' );
var userCtrl = require('../users/userController.js');

function signup (req, res) {
  userQueries.addUser(req.body.user)
    .then(user){
      // get the zoneNumber based on the user's lat and long
      // sets user zones needed and sends the data back to the user
      userCtrl.setUserZone(null, req.body.zone);
    });
};

function signin (req, res) {
  userQueries.checkPass(req.body.userName, req.body.attPass)
  .then(function (result){
    if(result === true) {
      userQueries.getUserInfo(userName)
        .then(function (userDetails) {
          var token = jwt.encode(user, 'secret');
          response.json({token: token});
          // sets user zones needed and sends the data back to the user
          userCtrl.setUserZone(null, req.bodyzone);
        });
    } else if (result === false){
      res.redirect('/signin');
    } else {
      res.redirect('/signup');
    }
  });
};

function signout (req, res) {
  // destroy token deal
};

module.exports = {
  signup: signup,
  signin: signin,
  signout: signout,
};

// user signs up
// body is name, password, location, default TRAIT list...
  // if username doesn't exist,
    //we add user to the user database, add Users_Traits connections to Users_Traits Join table
    // GO TO SIGN USER IN FUNC

// user signs in
// body is user name password, location
  // if user exists && password is correct
    // SIGN_USER_IN_FUNC:
      // CREATE JWOT
      // calls zoneHandler_service_FUNC
        // zoneHandler service DELETES socketId from old zone, adds socketId to new zone
      // <calls> GET_RELEVANT_DATA_FUNC:
        // LOAD establishment data (from establishment table in DB) for appropriate zones
        // LOAD vote data (from vote table in DB) for appropriate establishments
        // send back JWOT and relevant establishment data and relevant vote data

// user signs OUT
