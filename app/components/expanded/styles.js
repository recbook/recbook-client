import {
  Dimensions,
  StyleSheet
} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  expandedHeaderButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 83.5,
    width: WIDTH,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0.3
    }
  },
  expandedFooterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: HEIGHT * 64 / 667,
    width: WIDTH,
    backgroundColor: 'white',
    zIndex: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0.3
    },
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 24
  },
  imgExpandedHeaderXBtn: {
    marginLeft: 24,
    height: 27,
    width: 27,
    marginTop: 10
  },
  imgExpandedFooterBtn: {
    height: 27,
    width: 27
  },
  textExpandedHeaderSave: {
    fontSize: 20,
    fontFamily: 'Calibri',
    marginTop: 13,
    right: 24,
    color: '#605C56'
  },
  textExpandedContent: {
    fontSize: 25,
    fontFamily: 'Calibri',
    paddingTop: 20,
    paddingLeft: 24,
    paddingRight: 24
  },
  textDetailSlide: {
    fontSize: 14,
    fontFamily: 'Calibri',
    color: '#929292'
  }
});

export default styles;
