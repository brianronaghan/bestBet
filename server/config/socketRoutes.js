// requirements
var http      = require('http').Server(app);
var io        = require('socket.io')(http);

var userCtrl  = require('../users/userController.js');
var voteCtrl  = require('../votes/voteController.js');
var authCtrl  = require('../auth/authController.js');
var app       = require('../server.js')();

// auth routes (only thing we're using routes for is auth)

app.post('/api/signup', authCtrl.signup );
app.post('/api/signin', authCtrl.signin );
app.post('/api/signout', authCtrl.signout);

// socket listeners
io.on( 'connection' , function(socket){
  console.log('connection estab' );
  // WHEN user moves to a new zone:
  socket.on('userMoved', function(userDetails) {
    // listener recieves new zone # in userDetails(and knows socketId)
    console.log('a user moved ', userDetails);
    // WE call the move function, with the details, which will handle updating and sending back the info:
    userCtrl.setUserZone(socket,userDetails);
  });
  // WHEN user changes their default traits:
  socket.on('userChangedTraits', function (userDetails){
    // listener recieves userId and newTraits...
    // we call the user change traits func:
    userCtrl.changeDefaultTraits(userDetails);
  });
  // WHEN user votes on on and establishment:
  socket.on('userVoted', function (voteDetails){
    // listener recieves userId, establishmentId, a set of tupals representing "Trait" and "voteValue"
    // we call the register vote func:
    voteCtrl.registerVote(voteDetails);
  });
  // WHEN a user disconnects:
  socket.on('disconnect', function() {
    console.log( 'a user left' );
  });

});

// NOTES on client-side events we don't need to listen for and why:

  // user changes current trait combination
    // nothing happens server side, this is handled on the client side

  // user changes genre (cuisine)
    // nothing happens server -- this is handled in how the map displays...
    // on the client side map filters which establishments to show data about based on the user's chosen "genre" (cuisine)

  // user checks into establishment (do we need this? should be automatic, not a user action)
    // nothing happens on serverside -
    // on client side, we allow the user to vote only on things they're close to (maybeee)
    // also on client side, I guess proximity to establishment will determine which estab the user is voting on

// STRETCH GOALS for after MVP:

  // user selects a new industry
    // This, we have to reload a whole new set of establishments --
      // DIFFERENT INDUSTRIES WILL NOT BE AVAILABLE IN MVP

  // stretch: user adds a new category set (i.e. weekday lunch, datenight, saturday night with boys)
