import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Styles from './styles';
import * as Auth from './auth';
import * as App from '../../app';
import { Actions } from 'react-native-router-flux';

import imgLogo from '../../resources/splash_logo_new.png';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerEmail: undefined,
      registerUserName: undefined,
      registerPassword: undefined
    };
  }

  componentDidMount() {
    App.getCurrentUser()
      .then((authToken) => {
        const options = {};
        if (authToken) {
          options.headers = {
            Authorization: authToken
          };
        }
        App.setNetworkLayer(options);
        return authToken;
      })
      .then((authToken) => {
        if (authToken) {
          Actions.myLibrary();
        } else {
          Actions.first();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  registerUser() {
    Auth.register(this.state.registerEmail, this.state.registerUserName, this.state.registerPassword)
      .then((result) => {
        let loggedInUser = {
          authToken: result.getToken.accessToken
        };

        AsyncStorage.setItem("currentUser", JSON.stringify(loggedInUser), () => {
          Actions.login();
        });
      }).catch((error) => {
      Alert.alert('Register error', error);
    });
  }

  handleRegisterEmail(text) {
    this.setState({ registerEmail: text });
  }

  handleRegisterUserName(text) {
    this.setState({ registerUserName: text });
  }

  handleRegisterPassword(text) {
    this.setState({ registerPassword: text});
  }

  render() {
    return (
      <View style={Styles.container}>
        <Image
          style={Styles.registerLogoImage}
          source={imgLogo}
        />
        <View style={Styles.textInputContainer}>
          <Text style={Styles.inputTextTitle}>NAME</Text>
          <TextInput
            style={Styles.nameTextInput}
            autoCapitalize="none"
            autoFocus={true}
            onChangeText={this.handleRegisterUserName.bind(this)}
          />
        </View>
        <View style={Styles.textInputContainer}>
          <Text style={Styles.inputTextTitle}>E-MAIL</Text>
          <TextInput
            style={Styles.emailTextInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={this.handleRegisterEmail.bind(this)}
          />
        </View>
        <View style={Styles.textInputContainer}>
          <Text style={Styles.inputTextTitle}>PASSWORD</Text>
          <TextInput
            style={Styles.passwordTextInput}
            autoCapitalize="none"
            onChangeText={this.handleRegisterPassword.bind(this)}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={Styles.signUpButtonContainer}
          onPress={() => this.registerUser()}
        >
          <Text style={Styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.returnButtonContainer}
          onPress={() => Actions.login()}
        >
          <Text style={Styles.returnButtonText}>Return to Log in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Register;
