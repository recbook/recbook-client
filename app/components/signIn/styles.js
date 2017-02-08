import {
  Dimensions,
  StyleSheet
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  firstContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center'
  },
  logoImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: WIDTH * 0.261,
    height: HEIGHT * 0.168,
    marginTop: HEIGHT * 0.162,
    marginBottom: HEIGHT * 0.048
  },
  loginLogoImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: WIDTH * 0.261,
    height: HEIGHT * 0.168,
    marginTop: HEIGHT * 0.162,
    marginBottom: HEIGHT * 0.162
  },
  registerLogoImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: WIDTH * 0.261,
    height: HEIGHT * 0.168,
    marginTop: HEIGHT * 0.096,
    marginBottom: HEIGHT * 0.096
  },
  descriptionTextContainer: {
    marginBottom: HEIGHT * 0.32
  },
  descriptionText: {
    color: '#605C56',
    fontSize: 16
  },
  loginButtonContainer: {
    width: WIDTH * 0.786,
    height: HEIGHT * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#605C56'
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0.5
  },
  createButtonContainer: {
    marginTop: HEIGHT * 0.019,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createButtonText: {
    fontWeight: 'bold',
    color: '#605C56',
    fontSize: 16
  },
  nameTextInput: {
    height: 30
  },
  emailTextInput: {
    height: 30
  },
  passwordTextInput: {
    height: 30
  },
  signUpButtonContainer: {
    width: WIDTH * 0.786,
    height: HEIGHT * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#605C56',
    alignSelf: 'center',
    marginTop: HEIGHT * 0.05
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0.5
  },
  returnButtonContainer: {
    marginTop: HEIGHT * 0.019,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  returnButtonText: {
    fontWeight: 'bold',
    color: '#605C56',
    fontSize: 16
  },
  textInputContainer: {
    marginLeft: WIDTH * 0.106,
    marginRight: WIDTH * 0.106,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    marginBottom: HEIGHT * 0.05
  },
  inputTextTitle: {
    color: '#B2B2B2',
    fontSize: 12,
    marginBottom: HEIGHT * 0.01
  }
});

export default styles;
