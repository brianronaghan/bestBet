// auth controller
var userQueries = require('../userQueries.js');

function signup (req, res) {
  userQueries.addUser(req.body.user);
};

function signin (req, res) {
  userQueries.checkPass(req.body.userName, req.body.attPass)
    .then(function (result){
      if(result) {
        userQueries.getUserInfo(userName)
          .then(function (userDetails) {
            // something with JWOT
            // create connection?
            // call zone handler?
            // emit?
          });
      } else {
        return "bad password";
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
