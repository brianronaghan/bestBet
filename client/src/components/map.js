import React, { Component } from 'react-native';
import Menu from './menu';  

var Dimensions = require('Dimensions');   
var windowSize = Dimensions.get('window');    
const SideMenu = require('./sideMenu');   

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
var RestaurantMarkerView = require('./restaurantMarker.js');
var UserMarkerView = require('./userMarker.js');
var OutlineMarkerView = require('./outlineMarker.js');
var UserVotedView = require('./userVoted.js');

var InfoCallout = require('./infoCallout');
var zoneCalculator = require('../actions/zoneHandler.js').zoneCalculator;
var styles = require('../assets/styles.js').mapStyles;

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

// a unique var for mapping user votes in callout
let uniqueId = 0;

// var addVotes = function (establishments) {
//   _.each(establishments, function (establishment) {
//     _.each(traitNames, function (trait, i) {
//       establishment.traits[i].pos += Math.floor(Math.random()*2);
//       establishment.traits[i].votes += 1;
//     });
//   });
//   return establishments;
// };

// processVoteData();





class Button extends Component {    
  handlePress(e) {    
    if (this.props.onPress) {   
      this.props.onPress(e);    
    }   
  }   
  render() {    
    return (    
      <TouchableOpacity   
        onPress={this.handlePress.bind(this)}   
        style={this.props.style}>   
        <Text>{this.props.children}</Text>    
      </TouchableOpacity>   
    );    
  }   
}

//THE ACTUAL map deal
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      establishments: [],
      isOpen: false,
      intervalId: -1,
      selectedEstab: -1,
      showSummary: false

    }
  }
  
  toggle() {    
    this.setState({   
      isOpen: !this.state.isOpen,   
    });   
  }

  updateMenuState(isOpen) {   
    this.setState({ isOpen, });   
  }

  show() {
        this.refs.m1.showCallout();
      }

  hide() {
    this.refs.m1.hideCallout();
  }

  onRegionChange(region) {
    console.log("R->",region);
    this.setState({ zone: this.calcZone()});
    this.setState({ userId: this.props.user.id });

    var userId = this.props.user.id;
    var socket = this.props.socket;
    var oldUserZone = this.props.user.userZone;
    //Update userZone in store, get new Establishments, join/leave zones
    var liveLOC ={};
    function gotLocation(position){
      // console.log("CUR LIVE POS --->",position);
      liveLOC = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.setState({ myLocation: {latitude: position.coords.latitude, longitude: position.coords.longitude} });
      this.setState({ region:liveLOC });
      // console.log("NEW STATE IN REGION --- > ",this.state.region);
      return liveLOC;

    };
    function logError(error) {
      console.log('Navigator \'getCurrentPosition\' error:', error);
    };
    navigator.geolocation.getCurrentPosition(position => gotLocation.call(this,position), logError);

    // this.props.userMoves(userId, socket, oldUserZone, this.state.region.latitude, this.state.region.longitude);
  
  }

  calcZone() {
    var curRegion = this.state.region;
    return zoneCalculator(curRegion.latitude, curRegion.longitude);
  }

  changeTrait() {
    // console.log(estabId);
    // this.setState({selectedEstab:estabId});
    // this.setState({showSummary:true});
    
    console.log("USE PROPS  --- ", this.props.user, "user");
    // this.setState({ uPrefs: uP });
    // this.setState({ establishments: this.props.establishments});
  }

  addVotesLive() {
    this.setState({establishments: addVotes(this.state.establishments)});
    this.calculateUserScores();
  }

  turnOnVoteFlux () {
    // this.setState({intervalId:window.setInterval(addVotesLive, 500)});
  }

  turnOffVoteFlux () {
    // clearInterval(this.state.intervalId);
  }
// MOVE THIS OUT?
  calculateHistScores (estabId) {
    if (this.props.establishments[estabId] === undefined) {
      return 0;
    } else {
      var cume = 0;
      var total = 0;
      for (var x = 0; x < this.props.user.traitCombo.length; x++) {
        cume += ((this.props.establishments[estabId]['trait'+this.props.user.traitCombo[x]+'Pos'])/
          (this.props.establishments[estabId]['trait'+this.props.user.traitCombo[x]+'Tot']));
          total++;
      } 
    }
    return Math.round(cume/total*10);   
  }
  openModal (estabId) {
    // console.log(estabId);
    this.setState({selectedEstab:estabId});
    this.setState({showSummary:true});
  }

  calculateLiveScores (estabId) {
    var pos = 0;
    var total = 0;
    if(this.props.user.traitCombo) {
      var traits = this.props.user.traitCombo;
      this.props.establishments[estabId].Votes.forEach(function(vote){
        if(traits.indexOf(vote.traitId) > -1) {
          total++;
          if (vote.voteValue === true) {
            pos++;
          }
        }
      });
      if(total === 0) {
        return 0;
      } else {
        return Math.round(pos/total*10);
      }
    } else {
      return 0;
    }
  }

  calculateUserVoted (estabId) {
    if(this.props.establishments[estabId].userVotes.length === 0) {
      return 2;
    } else {
      var pos = 0;
      var total = 0;
      this.props.establishments[estabId].userVotes.forEach(function(vote){
        total++;
        if(vote.voteValue === true) pos++;
      });
      return (Math.round(pos/total));
    }
  }

  inView (coords) {
    return (LATITUDE - LATITUDE_DELTA > coords.latitude < LATITUDE + LATITUDE_DELTA 
      && LONGITUDE - LONGITUDE_DELTA > coords.longitude < LONGITUDE + LONGITUDE_DELTA 
      )
  }

  render() {
    const menu = <Menu user = {this.props.user.id} socket = {this.props.socket} reactNavigator = {this.props.navigator} logOut = {this.props.logOut.bind(this)} resetTraits = {this.props.resetTraits} toggle = {this.toggle.bind(this)}/>;
    return (
      <SideMenu   
      menu={menu}   
      isOpen={this.state.isOpen}    
      onChange={(isOpen) => this.updateMenuState(isOpen)}>
      <View style={{height: windowSize.height, backgroundColor: '#f7f6f3'}}>

      <View style={styles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
        <MapView.Marker coordinate={this.state.myLocation}>
          <UserMarkerView/>
        </MapView.Marker>
        <MapView.Marker coordinate={this.state.myLocation}>
          <OutlineMarkerView/>
        </MapView.Marker>
       
        {_.map(this.props.establishments, (establishment) => (
          <MapView.Marker key={establishment.id} 
            coordinate={{latitude:establishment.latitude, longitude: establishment.longitude}}
            centerOffset={{x:0,y:0}}
            calloutOffset={{ x: 0, y: 0 }}
            calloutAnchor={{ x: 0, y: 0}}
            ref="m1">
            <View style={liveStyles[this.calculateLiveScores.call(this, establishment.id)]}>
              <View style={histStyles[this.calculateHistScores.call(this, establishment.id)]}>
                <View style={userDot[this.calculateUserVoted.call(this, establishment.id)]}/>
              </View>
            </View>
              <MapView.Callout tooltip>
                <InfoCallout>
                  <Text style={{ fontWeight:'bold', fontSize: 12, color: 'white' }}>{establishment.id}:{establishment.name}</Text>
                  <Text style={{ fontWeight:'bold', color: 'white' }}>
                    {this.props.user.traitCombo[0]}:{establishment['trait' + this.props.user.traitCombo[0] + 'Pos']}/{establishment['trait'+ this.props.user.traitCombo[0] +'Tot']}
                  </Text>
                  <Text style={{ fontWeight:'bold', color: 'white' }}>
                    {this.props.user.traitCombo[1]}:{establishment['trait' + this.props.user.traitCombo[1] + 'Pos']}/{establishment['trait'+ this.props.user.traitCombo[1] +'Tot']}
                  </Text>
                  <Text style={{ fontWeight:'bold', color: 'white' }}>
                    {this.props.user.traitCombo[2]}:{establishment['trait' + this.props.user.traitCombo[2] + 'Pos']}/{establishment['trait' + this.props.user.traitCombo[2] + 'Tot']}
                  </Text>
                    {_.map(establishment.userVotes, (vote) => 
                      (
                        <Text key={uniqueId++} style={{ fontWeight:'bold', color: 'white' }}>
                          {vote.traitId}:{vote.voteValue.toString()}
                        </Text>
                      )
                    )}
                </InfoCallout>
              </MapView.Callout>

              <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{establishment.name}</Text>
              <Text style={{ fontWeight:'bold', fontSize: 10, color: 'black' }}>LV:{this.calculateLiveScores.bind(this, establishment.id)()}/10 HS: {this.calculateHistScores.bind(this, establishment.id)()}/10</Text>
          </MapView.Marker>

        ))}
        </MapView>
        <TouchableOpacity style={styles.bubble} onPress={this.openModal.call(this,13)}>
          <Text>Open</Text>  
        </TouchableOpacity>
        <View style={{backgroundColor: 'black'}}>
          {this.state.showSummary ? <Summary establishment={this.props.establishments[this.state.selectedEstab]} /> : null }          
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.changeTrait.bind(this)} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Trait</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addVotesLive.bind(this)} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>voteOnce</Text>
          </TouchableOpacity>
        </View>
          <View style={[styles.bubble, styles.latlng]}>
            <Text style={{ textAlign: 'center'}}>
              {`${this.props.user.traitCombo},${this.state.region.latitude}, ${this.state.region.longitude}, ${this.state.zone}`}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 20}}></View>
          <Button style={styles.button} onPress={() => this.toggle()}>
            <Image source={{ uri: 'http://i.imgur.com/vKRaKDX.png', width: windowSize.height/20, height: windowSize.height/20, }} />   
          </Button>
        </View>
      </SideMenu>

    );
  }

};

var Summary = React.createClass({
    render: function() {
        return (
            <View>
              <Text> HI?</Text>
            </View>
        );
    }
});

// {this.props.establishment.name}

var userHW = 8;
var userDot = {
  0: {
    height:userHW,
    width:userHW,
    borderRadius: userHW/2,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderColor: 'blue',
    borderWidth:1
  },
  1: {
    height:userHW,
    width:userHW,
    borderRadius: userHW/2,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'lime',
    borderColor: 'blue',
    borderWidth:1,
  },
  2: {
    height:userHW,
    width:userHW,
    borderRadius: userHW/2,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderColor: 'black',
    borderWidth:1.5,
  }
};

var histHW = 25;

var histStyles = {
  0:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor:'rgba(0, 0, 0, 0.3)'
  },
  1:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(255, 0, 0, 0.5)',

  },
  2:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(255, 0, 0, 0.5)',
  },
  3:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(209, 0, 0, 0.2)',
  },
  4:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(209, 0, 0, 0.2)',
  
  },
  5:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(245, 241, 0, 0.2)',
    
  },
  6:{
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(163, 245, 0, 0.3)',
  },
  7:{
   justifyContent: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    alignSelf:'center',
    borderColor: 'rgba(34, 224, 0, 0.5)',
  },
  8:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.5)',
  },
  9:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.6)',
  },
  10:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.7)',
  }
  
};

var liveHW = 40;

var liveStyles = {
  0:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor:'rgba(0, 0, 0, 0.3)'
  },
  1:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(255, 0, 0, 0.5)',

  },
  2:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(255, 0, 0, 0.5)',
  },
  3:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(209, 0, 0, 0.2)',
  },
  4:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(209, 0, 0, 0.2)',
  
  },
  5:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(245, 241, 0, 0.2)',
    
  },
  6:{
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(163, 245, 0, 0.3)',
  },
  7:{
   justifyContent: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    alignSelf:'center',
    borderColor: 'rgba(34, 224, 0, 0.5)',
  },
  8:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.5)',
  },
  9:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.6)',
  },
  10:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.7)',
  }
  
};

/*
<TouchableOpacity onPress={this.turnOnVoteFlux.bind(this)} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>fluxVotes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.turnOffVoteFlux.bind(this)} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>stop</Text>
          </TouchableOpacity>




                 


 // <MapView.Marker key={this.props.establishments[0].id}> 
        //   coordinate={{latitude:this.props.establishments[0].latitude, longitude: this.props.establishments[0].longitude}}
        //       centerOffset={{x:0,y:0}}
        //       calloutOffset={{ x: 0, y: 0 }}
        //       calloutAnchor={{ x: 0, y: 0 }}
        //       ref="m1">
        //         <View style={scoreStyles[4]}>
        //           <View style={userDot[2]}/>
        //         </View>
        // </MapView.Marker>


*/
  
