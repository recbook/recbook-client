import {
  Dimensions,
  Platform,
  StyleSheet,
  NativeModules
} from 'react-native';

const { StatusBarManager } = NativeModules;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export const HEADER_HEIGHT = 75;

const styles = StyleSheet.create({
  navBar: {
    ...Platform.select({
      ios: {
        height: HEADER_HEIGHT + STATUSBAR_HEIGHT
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
  navBarSceneDetailView: {
    ...Platform.select({
      ios: {
        height: HEADER_HEIGHT + STATUSBAR_HEIGHT
      },
      android: {
        height: HEIGHT * 0.08
      }
    }),
    backgroundColor: '#fff',
    borderBottomColor: '#fff'
  },
  navBarButtonContainer: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    top: 10 // eslint-disable-line todo: change magic num 10 to relative value
  },
  drawerContainer: {
    width: WIDTH * 28 / 375,
    height: HEIGHT * 28 / 667,
    marginLeft: WIDTH * 12 / 375
  },
  drawerButton: {
    width: WIDTH * 28 / 375,
    height: HEIGHT * 28 / 667,
    marginLeft: WIDTH * 24 / 375,
    backgroundColor: 'transparent'
  },
  dropDownButtonContainer: {
    width: 150,
    height: 25,
    marginRight: WIDTH * 20 / 375,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  dropDownText: {
    color: '#212121',
    fontSize: 22,
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
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    left: WIDTH * 30 / 375,
    marginTop: 5
  },
  changeImage: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    resizeMode: 'contain'
  },
  searchButton: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    marginTop: 5
  },
  searchImage: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    resizeMode: 'contain'
  },
  dropDown: {
    height: HEIGHT * 0.254,
    width: WIDTH * 0.415,
    position: 'absolute',
    top: 20,
    left: 133 - WIDTH * 0.415 / 2, // eslint-disable-line todo: change magic num 133 to relative value
    flexDirection: 'column'
  },
  dropDownOuterContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: WIDTH,
    height: HEIGHT
  },
  dropDownContainer: {
    backgroundColor: 'transparent',
    flex: 1
  },
  textDropdown: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    marginLeft: 14,
    color: '#AAAAAA',
    fontWeight: 'bold'
  },
  textDropdownContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  textDropdownInnerContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

// font family names:
// Calibri-BoldItalic
// Calibri-Italic
// Calibri-LightItalic
// Calibri-Light
// Calibri
// Calibri-Bold

export default styles;
