var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Animated,
  Dimensions
} = React;

var {
  height: deviceHeight
} = Dimensions.get('window');


var detailModal = React.createClass({
  getInitialState: function() {
    return { offset: new Animated.Value(deviceHeight) }
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: 0
    }).start();
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  },
  render: function() {
    return (
        <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={{color: '#FFF'}}>Close Menu</Text>
          </TouchableOpacity>
        </Animated.View>
    )
  }
});