import io from 'socket.io-client/socket.io';
import socket from './utils.js';

import zones from './zoneHandler.js';
import zoneCalc from '../components/zoneCalculator.js';

//Change to real user location once it's implemented
const LATITUDE = 37.7832096; 
const LONGITUDE = -122.4091516;

const SERVER_ADDRESS = 'http://localhost:3000';

export function connectSocket(){
  const socket = io.connect(SERVER_ADDRESS, { jsonp: false });

  // Emit an event to server
  socket.on('connect',function(){
    //To receive establishment data, uncomment this line
    let userZone = zoneCalc.zoneCalculator(LATITUDE,LONGITUDE);
    let mapZones = zones.getSurroundingZones(userZone);

    socket.emit('Get establishments',{zones: mapZones});  
  });

  socket.on('New Establishments', function({establishments,votes}){
    var state = {};
    establishments.forEach(function(est){
      state[est.id] = est;
      var estVotes = votes.filter(function(vote){return vote.establishmentId === est.id});
      state[est.id].votes = {1: estVotes.filter(function(vote){return vote.traitId === 1})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}}),
                             2: estVotes.filter(function(vote){return vote.traitId === 2})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}}),
                             3: estVotes.filter(function(vote){return vote.traitId === 3})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}}),
                             4: estVotes.filter(function(vote){return vote.traitId === 4})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}}),
                             5: estVotes.filter(function(vote){return vote.traitId === 5})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}}),
                             6: estVotes.filter(function(vote){return vote.traitId === 6})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}}),
                             7: estVotes.filter(function(vote){return vote.traitId === 7})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}}),
                             8: estVotes.filter(function(vote){return vote.traitId === 8})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}}),
                             9: estVotes.filter(function(vote){return vote.traitId === 9})
                                     .map(function(vote){return {voteValue: vote.voteValue, time: vote.time}})}
    });
    
    return {
      type: UPDATE_ALL,
      payload: state
    }

    // [ { id: 376,
       // name: 'Chim',
       // imageUrl: 'https://s3-media1.fl.yelpcdn.com/bphoto/ahurHkuuNdoeCg89Fl_H2g/ms.jpg',
       // yelpUrl: 'http://www.yelp.com/biz/chim-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=FW8Mc7pREwM4wb6tDXCqQQ',
       // yelpId: 'chim-san-francisco',
       // yelpCategory: 'thai',
       // yelpRating: 4,
       // yelpReviewCount: 33,
       // latitude: 37.7943192,
       // longitude: -122.4039612,
       // address: '653 Clay St, San Francisco, CA 94111',
       // phoneNumber: '+1-415-433-2222',
       // industryId: 1,
       // zoneNumber: 3006 },

   //  votes: 
   // [ { id: 422,
       // establishmentId: 8,
       // traitId: 3,
       // userId: 17,
       // voteValue: true,
       // time: '2016-03-19T04:45:57.992Z',
       // zoneNumber: 4005 },

  })
};