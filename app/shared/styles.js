import {
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  navBar: {
    ...Platform.select({
      ios: {
        height: HEIGHT * 0.11
      },
      android: {
        height: HEIGHT * 0.08
      }
    }),
    backgroundColor: '#F9F9F9',
    borderBottomColor: '#F9F9F9',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0.3
    }
  },
  navBarButtonContainer: {
    width: WIDTH,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  dropDownButtonContainer: {
    width: 150,
    height: 25,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginLeft: 30,
    marginRight: 120
  },
  dropDownText: {
    color: '#6F6F6F',
    fontSize: 17,
    marginRight: 5,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  dropDownArrowImage: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    resizeMode: 'contain'
  },
  changeButton: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    marginRight: 20
  },
  changeImage: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    resizeMode: 'contain'
  },
  searchButton: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent'
  },
  searchImage: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    resizeMode: 'contain'
  },
  dropDown: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: 20,
    left: 100,
    backgroundColor: 'white',
    flexDirection: 'column'
  }
});

export default styles;
