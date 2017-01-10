import {
  Dimensions,
  StyleSheet
} from 'react-native';
import { HEADER_HEIGHT, STATUSBAR_HEIGHT } from './../../shared/styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  detailViewMarginTop: {
    height: HEADER_HEIGHT + STATUSBAR_HEIGHT
  },
  detailViewTopContainer: {
    height: HEIGHT * 132 / 667,
    backgroundColor: '#fff'
  },
  detailViewBottomContainer: {
    height: HEIGHT * (667 - 201) / 667,
    backgroundColor: '#605C56'
  },
  detailViewBookContainer: {
    height: HEIGHT * 165 / 667,
    width: WIDTH * 112 / 376,
    backgroundColor: 'yellow',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    },
    zIndex: 5,
    position: 'absolute',
    top: HEADER_HEIGHT + STATUSBAR_HEIGHT,
    marginTop: 0.5,
    left: WIDTH * 38 / 376,
    borderRadius: 7
  },
  detailViewTopTextContainer: {
    backgroundColor: 'green',
    left: WIDTH * (38 + 14 + 112) / 376,
    flex: 1
  },
  textDetailViewTopTitle: {
    fontSize: 28
  }
});

export default styles;
