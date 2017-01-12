import {
  Dimensions,
  StyleSheet
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  window: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: HEIGHT * 0.73,
    width: WIDTH
  },
  captureButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: HEIGHT * 0.07
  },
  captureButton: {
    alignSelf: 'center',
    width: WIDTH * 0.228,
    height: WIDTH * 0.228
  },
  cancelButton: {
    position: 'absolute',
    left: WIDTH * 0.04,
    top: HEIGHT * 0.035,
    width: WIDTH * 0.06,
    height: WIDTH * 0.06,
    zIndex: 1
  },
  retakeButtonContainer: {
    justifyContent: 'center',
    marginRight: WIDTH * 0.117
  },
  retakeButton: {
    color: '#605C56',
    fontSize: 20
  },
  nextButtonContainer: {
    justifyContent: 'center',
    marginLeft: WIDTH * 0.117
  },
  nextButton: {
    color: '#605C56',
    fontSize: 20
  },
  cropButton: {
    position: 'absolute',
    left: WIDTH * 0.39,
    top: HEIGHT * 0.31,
    width: 54,
    height: 54,
    zIndex: 1
  }
});

export default styles;
