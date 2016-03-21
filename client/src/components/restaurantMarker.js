// rest marker view

var React = require('react-native');
var {
  View,
  Text,
  Dimensions,
  requireNativeComponent,
  PropTypes,
} = React;

var styles = require('../assets/styles.js').markerStyles;

var { width, height } = Dimensions.get('window');

var RestaurantMarkerView = React.createClass({

  viewConfig: {
    uiViewClassName: 'AIRMapMarker',
    validAttributes: {
      coordinate: true,
    },
  },

  getDefaultProps() {
    return {
      fontSize: 13,
    };
  },
  propTypes: {
    ...View.propTypes,

    // TODO(lmr): get rid of these?
    identifier: PropTypes.string,
    reuseIdentifier: PropTypes.string,

    /**
     * The title of the marker. This is only used if the <Marker /> component has no children that
     * are an `<MapView.Callout />`, in which case the default callout behavior will be used, which
     * will show both the `title` and the `description`, if provided.
     */
    title: PropTypes.string,

    /**
     * The description of the marker. This is only used if the <Marker /> component has no children
     * that are an `<MapView.Callout />`, in which case the default callout behavior will be used,
     * which will show both the `title` and the `description`, if provided.
     */
    description: PropTypes.string,

    /**
     * A custom image to be used as the marker's icon. Only local image resources are allowed to be
     * used.
     */
    image: PropTypes.any,

    /**
     * If no custom marker view or custom image is provided, the platform default pin will be used,
     * which can be customized by this color. Ignored if a custom marker is being used.
     */
    pinColor: PropTypes.string,

    /**
     * The coordinate for the marker.
     */
    coordinate: PropTypes.shape({
      /**
       * Coordinates for the anchor point of the marker.
       */
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,

    /**
     * The offset (in points) at which to display the view.
     *
     * By default, the center point of an annotation view is placed at the coordinate point of the
     * associated annotation. You can use this property to reposition the annotation view as
     * needed. This x and y offset values are measured in points. Positive offset values move the
     * annotation view down and to the right, while negative values move it up and to the left.
     *
     * For android, see the `anchor` prop.
     *
     * @platform ios
     */
    centerOffset: PropTypes.shape({
      /**
       * Offset from the anchor point
       */
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),

    /**
     * The offset (in points) at which to place the callout bubble.
     *
     * This property determines the additional distance by which to move the callout bubble. When
     * this property is set to (0, 0), the anchor point of the callout bubble is placed on the
     * top-center point of the marker view’s frame. Specifying positive offset values moves the
     * callout bubble down and to the right, while specifying negative values moves it up and to
     * the left.
     *
     * For android, see the `calloutAnchor` prop.
     *
     * @platform ios
     */
    calloutOffset: PropTypes.shape({
      /**
       * Offset to the callout
       */
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),

    /**
     * Sets the anchor point for the marker.
     *
     * The anchor specifies the point in the icon image that is anchored to the marker's position
     * on the Earth's surface.
     *
     * The anchor point is specified in the continuous space [0.0, 1.0] x [0.0, 1.0], where (0, 0)
     * is the top-left corner of the image, and (1, 1) is the bottom-right corner. The anchoring
     * point in a W x H image is the nearest discrete grid point in a (W + 1) x (H + 1) grid,
     * obtained by scaling the then rounding. For example, in a 4 x 2 image, the anchor point
     * (0.7, 0.6) resolves to the grid point at (3, 1).
     *
     * For ios, see the `centerOffset` prop.
     *
     * @platform android
     */
    anchor: PropTypes.shape({
      /**
       * Offset to the callout
       */
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),

    /**
     * Specifies the point in the marker image at which to anchor the callout when it is displayed.
     * This is specified in the same coordinate system as the anchor. See the `andor` prop for more
     * details.
     *
     * The default is the top middle of the image.
     *
     * For ios, see the `calloutOffset` prop.
     *
     * @platform android
     */
    calloutAnchor: PropTypes.shape({
      /**
       * Offset to the callout
       */
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),

    /**
     * Sets whether this marker should be flat against the map true or a billboard facing the
     * camera false.
     *
     * @platform android
     */
    flat: PropTypes.bool,

    draggable: PropTypes.bool,

    /**
     * Callback that is called when the user presses on the marker
     */
    onPress: PropTypes.func,

    /**
     * Callback that is called when the user selects the marker, before the callout is shown.
     *
     * @platform ios
     */
    onSelect: PropTypes.func,

    /**
     * Callback that is called when the marker is deselected, before the callout is hidden.
     */
    onDeselect: PropTypes.func,

    /**
     * Callback that is called when the user taps the callout view.
     */
    onCalloutPress: PropTypes.func,

    /**
     * Callback that is called when the user initiates a drag on this marker (if it is draggable)
     */
    onDragStart: PropTypes.func,

    /**
     * Callback called continuously as the marker is dragged
     */
    onDrag: PropTypes.func,

    /**
     * Callback that is called when a drag on this marker finishes. This is usually the point you
     * will want to setState on the marker's coordinate again
     */
    onDragEnd: PropTypes.func,

  },
   _runCommand: function (name, args) {
    switch (Platform.OS) {
      case 'android':
        NativeModules.UIManager.dispatchViewManagerCommand(
          this._getHandle(),
          NativeModules.UIManager.AIRMapMarker.Commands[name],
          args
        );
        break;

      case 'ios':
        NativeModules.AIRMapMarkerManager[name].apply(
          NativeModules.AIRMapMarkerManager[name],
          [this._getHandle(), ...args]
        );
        break;
    }
  },
  showCallout: function() {
    this._runCommand('showCallout', []);
  },

  hideCallout: function() {
    this._runCommand('hideCallout', []);
  },
   _onPress: function(e) {
    console.log("press working?");
    this.props.onPress && this.props.onPress(e);
  },

  render() {
    return (
      <AIRMapMarker 
        onPress={this._onPress}
        ref="marker"
        {...this.props}>
          <View style={testSurroundStyles['container']}>
                <View style={testSurroundStyles[3]}>
                  <View style = {testSurroundStyles[5]}>
                  <View style = {testSurroundStyles[2]}>
                  <View style = {dotStyles[0]}/>
                  </View>
                  </View>
                  </View>

                </View>
      </AIRMapMarker>
    );
  },
});
var AIRMapMarker = requireNativeComponent('AIRMapMarker', RestaurantMarkerView);

module.exports = RestaurantMarkerView;

// <AIRMapMarker
//         ref="marker"
//         {...this.props}
//         image={image}
//         style={[styles.marker, this.props.style]}
//         onPress={this._onPress}
//       />

var dotStyles = {
  'container':{
    justifyContent:'center',
    alignContent: 'center'

  },
  0:{
    backgroundColor: 'black',
    opacity:1,
    height:8,
    width:8,
    borderRadius: 4,
    alignSelf: 'center'

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
    height:8,
    width:8,
    borderRadius: 4,
        alignSelf: 'center'

  },
  3:{
    backgroundColor: 'orange',
    opacity:1,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
    alignSelf: 'f'
  },
  4:{
    backgroundColor: 'green',
    opacity:1,
    justifyContent: 'center',
    height:12,
    width:12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  5:{
    backgroundColor: 'transparent',
    opacity:1,
    justifyContent: 'center',
    height:18,
    width:18,
    borderRadius: 9,
    alignSelf: 'center'
  }
};

var testSurroundStyles = {
  'container': {
     justifyContent:'center',
    alignContent: 'center'
  },  

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
    height:150,
    width:150,
    borderRadius: 75,
    backgroundColor:'transparent',
    borderWidth:20,
    alignSelf:'center',
        justifyContent:'center',
    alignContent: 'center',

    borderColor: 'rgba(209, 0, 0, 0.2)',
  },
  3:{
    height:90,
    width:90,
    borderRadius: 45,
    justifyContent:'center',
    alignContent: 'center',
    backgroundColor:'transparent',
    borderColor: 'rgba(194, 113, 0, 0.3)',
    borderWidth:20,
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
    justifyContent: 'center',
    height:30,
    width:30,
    backgroundColor:'transparent',
    borderColor: 'rgba(34, 204, 0, 0.4)',
    borderWidth:11,
    borderRadius: 15,
    alignSelf:'center'
  }
};
