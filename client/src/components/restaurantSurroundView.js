// restaurant Surround View

// user marker
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = React;
var styles = require('../assets/styles.js').markerStyles;

var RestaurantSurroundView = React.createClass({
  getDefaultProps() {
    return {
      fontSize: 13,
    };
  },
  render() {
    return (
      <View>
        <View style={surroundStyles[3]}/>
      </View>
    );
  },
});

module.exports = RestaurantSurroundView;
var dotStyles = {
  0:{
    backgroundColor: 'black',
    opacity:1,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
  },
  1:{
    backgroundColor: 'red',
    opacity:1,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
  },
  2:{
    backgroundColor: 'red',
    opacity:1,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
  },
  3:{
    backgroundColor: 'orange',
    opacity:1,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
  },
  4:{
    backgroundColor: 'green',
    opacity:1,
    justifyContent: 'center',
    height:12,
    width:12,
    borderRadius: 6,
  },
  5:{
    backgroundColor: 'green',
    opacity:1,
    justifyContent: 'center',
    height:18,
    width:18,
    borderRadius: 9,
  }
};
var surroundStyles = {
  0:{
    backgroundColor: 'black',
    opacity:.3,
    justifyContent: 'center',
    height:16,
    width:16,
    borderRadius: 8,
  },
  1:{
  },
  2:{
    backgroundColor: 'red',
    opacity:.3,
    justifyContent: 'center',
    height:30,
    width:30,
    borderRadius: 10,
  },
  3:{
    backgroundColor: 'orange',
    opacity:.3,
    justifyContent: 'center',
    height:100,
    width:100,
    borderRadius: 50,
  },
  4:{
    backgroundColor: 'green',
    opacity:.3,
    justifyContent: 'center',
    height:20,
    width:20,
    borderRadius: 10,
  },
  5:{
    backgroundColor: 'green',
    opacity:.3,
    justifyContent: 'center',
    height:30,
    width:30,
    borderRadius: 15,
    alignSelf:'center'
  }
};