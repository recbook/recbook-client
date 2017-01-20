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
  emailTextInput: {
    marginTop: 100,
    height: 30
  },
  nameTextInput: {
    height: 30
  },
  passwordTextInput: {
    height: 30
  },
  signInButton: {
    fontSize: 20
  }
});

export default styles;
