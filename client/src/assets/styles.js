// EACH STYLE SHEET represents the styles for that particular component
var React = require('react-native');
var {StyleSheet} = React;
var signupStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 55,
    padding: 15,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 3
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 32,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 3,
    margin: 3,
    width: 85,
    height: 85,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 50,
    height: 50
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
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
     alignItems: 'center',
     justifyContent: 'center'

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
    backgroundColor:'transparent',
    borderColor: 'black',
    borderWidth:2,
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
  bubble: {
     width:100,
     height:100,
      flexDirection: 'row',
    alignSelf: 'flex-end',
      backgroundColor: 'black',
      opacity:.5,
     paddingHorizontal: 0,
     paddingVertical: 0,
     borderRadius: 50,
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
  container: {
    flexDirection: 'row',
  },
  bubble: {
    width:100,
    height:100,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: 'black',
    opacity:.5,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 50,
  },
  dollar: {

    //color: '#FFFFFF',
    //fontSize: 10,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'black',
    alignSelf: 'center',
    marginTop: -9,
  }



});

module.exports = {
  appStyles: appStyles,
  mapStyles: mapStyles,
  markerStyles: markerStyles,
  signupStyles: signupStyles,
  calloutStyles, calloutStyles
};
