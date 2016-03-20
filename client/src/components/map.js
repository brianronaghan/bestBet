var React = require('react-native');
var {
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} = React;
var _ = require('underscore');

var MapView = require('react-native-maps');
var restaurants = require('./dummyEstablishments.js').dummyData;
var RestaurantMarkerView = require('./restaurantMarker.js');
var UserMarkerView = require('./userMarker.js');
var OutlineMarkerView = require('./outlineMarker.js');
var UserVotedView = require('./userVoted.js');

var votes = require('./dummyVotes.js').dummyVotes;
var InfoCallout = require('./infoCallout');
var zoneCalculator = require('./zoneCalculator.js').zoneCalculator;
var styles = require('../assets/styles.js').mapStyles;

// SAMPLE DATA:
var user = {id: 123, name: 'bribri', token:'abfe45'};
var uPrefs = [2,5,4];

var traitNames = {
  1:'Good Food', 
  2:'Good Drinks', 
  3:'Good Deal', 
  4:'Not Noisy', 
  5:'Not Crowded', 
  6:'No Wait',
  7:'Good Service',
  8:'Upscale', 
  9:'Veggie Friendly'
};


var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.7832096;
const LONGITUDE = -122.4091516;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Functions that will be moved:
var processVoteData = function () {
  votes.forEach(function(vote){
    restaurants[vote.establishmentId].traits[vote.traitId].votes++;
    if (vote.voteValue === true) {
      restaurants[vote.establishmentId].traits[vote.traitId].pos++;
    }
    if(vote.voteValue.userId === 123) {
      restaurants[vote.establishmentId].userVoted = true;
    }
  });
};

var addVotes = function (establishments) {
  _.each(establishments, function (establishment) {
    _.each(traitNames, function (trait, i) {
      establishment.traits[i].pos += Math.floor(Math.random()*2);
      establishment.traits[i].votes += 1;
    });
  });
  return establishments;
};

processVoteData();


//THE ACTUAL map deal

var DisplayLatLng = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      myLocation: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      zone: zoneCalculator(37.7832096, -122.4091516),
      establishments: restaurants,
      userId:user.id,
      uPrefs: uPrefs,
      intervalId: -1
    };
  },
  show() {
        this.refs.m1.showCallout();
      },

  hide() {
    this.refs.m1.hideCallout();
  },

  onRegionChange(region) {
    this.setState({ region });
    this.setState({ zone: this.calcZone()});
  },
  calcZone() {
    var curRegion = this.state.region;
    return zoneCalculator(curRegion.latitude, curRegion.longitude);
  },

  changeTrait() {
    this.setState({ uPrefs: [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)] });
  },

  addVotesLive() {
    this.setState({establishments: addVotes(this.state.establishments)});
    this.calculateUserScores();
  },
  turnOnVoteFlux () {
    this.setState({intervalId:window.setInterval(this.addVotesLive, 500)});
  },
  turnOffVoteFlux () {
    clearInterval(this.state.intervalId);
  },
  calculateUserScores (estabId) {
    // console.log(estabId);
    // console.log(this.state.establishments[estabId]);
    // return 8;
    if (this.state.establishments[estabId] === undefined) {
      return 0;
    } else {
      var cume = 0.0;
      var totes = 0;
       for (var x = 0; x < 3; x++) {
        if (this.state.establishments[estabId].traits[this.state.uPrefs[x]].votes>0) {
          console.log("ind ",this.state.establishments[estabId].traits[this.state.uPrefs[x]].pos/
            this.state.establishments[estabId].traits[this.state.uPrefs[x]].votes);
          cume += 
          this.state.establishments[estabId].traits[this.state.uPrefs[x]].pos/
            this.state.establishments[estabId].traits[this.state.uPrefs[x]].votes
          totes++;
        } 
       }
    }
     return Math.floor(10*(cume/totes));   
  },
  inView (coords) {
    return (LATITUDE - LATITUDE_DELTA > coords.latitude < LATITUDE + LATITUDE_DELTA 
      && LONGITUDE - LONGITUDE_DELTA > coords.longitude < LONGITUDE + LONGITUDE_DELTA 
      )
  },
  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          initialRegion={this.state.region}

          onRegionChange={this.onRegionChange}
        >
        <MapView.Marker coordinate={this.state.myLocation}>
          <UserMarkerView/>
        </MapView.Marker>
        <MapView.Marker coordinate={this.state.myLocation}>
          <OutlineMarkerView/>
        </MapView.Marker>
        {_.map(this.state.establishments, (establishment) => (
          
          <MapView.Marker key={establishment.id} coordinate={establishment.coordinate}
          centerOffset={{x:0,y:0}}
            calloutOffset={{ x: 0, y: 0 }}
            calloutAnchor={{ x: 0, y: 0 }}
            ref="m1"
            style={this.calculateUserScores(establishment.id)}>

          <MapView.Marker coordinate={this.state.myLocation}>
            <UserVotedView/>
          </MapView.Marker>

            <RestaurantMarkerView 
              coordinate={establishment.coordinate}
              centerOffset={{x:0,y:0}}
              calloutOffset={{ x: 0, y: 0 }}
              calloutAnchor={{ x: 0, y: 0}}
              ref="m1"
              style={dotStyles[this.calculateUserScores(establishment.id)]}/>

            <MapView.Callout tooltip>
              <InfoCallout>
                <Text style={{ fontWeight:'bold', color: 'white' }}>
                  {this.state.uPrefs[0]}:{establishment.traits[this.state.uPrefs[0]].pos}/{establishment.traits[this.state.uPrefs[0]].votes}
                </Text>
                <Text style={{ fontWeight:'bold', color: 'white' }}>
                  {this.state.uPrefs[1]}:{establishment.traits[this.state.uPrefs[1]].pos}/{establishment.traits[this.state.uPrefs[1]].votes}
                </Text>
                <Text style={{ fontWeight:'bold', color: 'white' }}>
                  {this.state.uPrefs[2]}:{establishment.traits[this.state.uPrefs[2]].pos}/{establishment.traits[this.state.uPrefs[2]].votes}
                </Text>
              </InfoCallout>
            </MapView.Callout>
          <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{establishment.id}:{establishment.name}</Text>

        </MapView.Marker>

          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.changeTrait} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Trait</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addVotesLive} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>voteOnce</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.turnOnVoteFlux} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>fluxVotes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.turnOffVoteFlux} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>stop</Text>
          </TouchableOpacity>
          </View>
          <View style={[styles.bubble, styles.latlng]}>
            <Text style={{ textAlign: 'center'}}>
              {`${this.state.uPrefs},${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}, ${this.state.zone}`}
            </Text>
          </View>
        </View>
    );
  },
});

module.exports = DisplayLatLng;


var dotStyles = {
  0:{
    backgroundColor: 'black ',
    opacity:.5,
    justifyContent: 'center',
    height:12,
    width:12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  1:{
    backgroundColor: 'red',
    opacity:.3,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  2:{
    backgroundColor: 'red',
    opacity:.7,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  3:{
    backgroundColor: 'red',
    opacity:1,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  4:{
    backgroundColor: 'green',
    opacity:.7,
    justifyContent: 'center',
    height:12,
    width:12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  5:{
    backgroundColor: 'green',
    opacity:.7,
    justifyContent: 'center',
    height:18,
    width:18,
    borderRadius: 9,
    alignSelf: 'flex-start'
  },
  6:{
    backgroundColor: 'green',
    opacity:.7,
    justifyContent: 'center',
    height:24,
    width:24,
    borderRadius: 12,
    alignSelf: 'flex-start'
  }
};
  
