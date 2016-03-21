// user marker
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = React;
var styles = require('../assets/styles.js').markerStyles;

var OutlineMarker = React.createClass({
  getDefaultProps() {
    return {
      fontSize: 13,
    };
  },
  render() {
    return (
      <View style={styles.outline}/>
    );
  },
});

module.exports = OutlineMarker;