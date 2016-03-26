// EACH STYLE SHEET represents the styles for that particular component
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var {StyleSheet} = React;
var signupStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingLeft: windowSize.height/40,
    paddingRight: windowSize.height/40,
    marginTop: windowSize.height/45,
    backgroundColor: '#f7f6f3',
  },
  topSpace: {
    marginTop: windowSize.height/20,
    backgroundColor: '#f7f6f3',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: windowSize.height/15,
    padding: windowSize.height/45
  },
  title: {
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 3
  },
  button: {
    position: 'absolute',
    top: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  twoButtons: {
    flexDirection: 'row',
    height: windowSize.height/15, 
    paddingLeft: windowSize.height/20,
    paddingRight: windowSize.height/20

  },
  button1: {
    flex:1,
    height: windowSize.height/20,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 2,
    borderRadius: 5,
    margin: windowSize.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  button2: {
    height: windowSize.height/16,
    backgroundColor: '#09a5ff',
    borderColor: '#007dc1',
    borderWidth: 2,
    borderRadius: 10,
    margin: windowSize.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  error: {
    fontSize: 12,
    color: 'red',
  }
});

var mapStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    marginTop: windowSize.height/20,
    position: 'absolute',
    top: 10,
    padding: 10,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

var appStyles = StyleSheet.create({
 container: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 scrollview: {
   alignItems: 'center',
   paddingVertical: 40,
 },
 button: {
   flex: 1,
   marginTop: 10,
   backgroundColor: 'rgba(220,220,220,0.7)',
   paddingHorizontal: 18,
   paddingVertical: 12,
   borderRadius: 20,
 },
 buttonIntro: {
  padding:10, 
  height:45, 
  overflow:'hidden', 
  borderRadius:4,
  margin: 10,
  backgroundColor: 'white'
 },
 back: {
   position: 'absolute',
   top: 20,
   left: 12,
   backgroundColor: 'rgba(255,255,255,0.6)',
   padding: 12,
   borderRadius: 20,
   width: 80,
   alignItems: 'center',
   justifyContent: 'center',
 },
});

var markerStyles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    justifyContent: 'center',
     height:18,
     width:18,
     borderRadius: 9,
    alignSelf: 'flex-start',
  },
  me: {
    height:12,
    width:12,
    borderRadius: 6,
    backgroundColor:'blue',
    borderColor: 'white',
    borderWidth:2,
  },
  voted: {
    height:12,
    width:12,
    borderRadius: 6,
    backgroundColor:'white',
    borderColor: 'black',
    borderWidth:1,
  },
   outline: {
    height:30,
    width:30,
    borderRadius: 15,
    backgroundColor:'blue',
    opacity:.3,
  },
  dot: {
    flex: 0,
    height:3,
    width:3,
    borderRadius: 1.5,
    backgroundColor:'black',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  score: {
    backgroundColor: 'red',
    height:24,
    width:24,
    opacity:.3,
    borderRadius: 12
  },
  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'black',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#D23F44',
    alignSelf: 'center',
    marginTop: 0,
  },
});

var calloutStyles = StyleSheet.create({
  bubble: {
    width: windowSize.width,
    height: windowSize.height/9, 
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'black',
    opacity:.5,
    paddingHorizontal: 0,
    paddingVertical: 0,
  }
});

var menuStyles = StyleSheet.create({
  nineButtons: {
    flexDirection: 'column',
    height: window.height, 
    paddingLeft: window.width/100,
    paddingRight: window.width/100,
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  menu: {
    flex: 1,
    backgroundColor: '#f3f5f4',
    padding: 10,
  },
  avatarContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  avatar: {
    width: window.height/20,
    height: window.height/20,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  item: {
    fontSize: 14,
    paddingTop: 5,
  },
  button1: {
    height: windowSize.height/20,
    width: windowSize.width/3.5,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 2,
    borderRadius: 5,
    margin: windowSize.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  button2: {
    height: windowSize.height/16,
    width: windowSize.width/3.5,
    backgroundColor: '#09a5ff',
    borderColor: '#007dc1',
    borderWidth: 2,
    borderRadius: 10,
    margin: windowSize.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  buttonLogout: {
    height: windowSize.height/16,
    width: windowSize.width/3.5,
    backgroundColor: '#ff5050',
    borderColor: '#007dc1',
    borderWidth: 2,
    borderRadius: 10,
    margin: windowSize.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  }
});

module.exports = {
  appStyles: appStyles,
  mapStyles: mapStyles,
  markerStyles: markerStyles,
  signupStyles: signupStyles,
  calloutStyles: calloutStyles,
  menuStyles: menuStyles
};
