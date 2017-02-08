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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: undefined,
      loginPassword: undefined
    };
  }

  loginUser() {
    Auth.login(this.state.loginEmail, this.state.loginPassword)
      .then((result) => {
        let loggedInUser = {
          authToken: result.getToken.accessToken
        };
        const options = {};
        options.headers = {
          Authorization: loggedInUser.authToken
        };

        App.setNetworkLayer(options);

        AsyncStorage.setItem("currentUser", JSON.stringify(loggedInUser), () => {
          Actions.myLibrary();
        });
    }).catch((error) => {
      Alert.alert('Login error', error);
    });
  }

  handleRegisterEmail(text) {
    this.setState({ loginEmail: text });
  }

  handleRegisterPassword(text) {
    this.setState({ loginPassword: text });
  }

  render() {
    return (
      <View style={Styles.container}>
        <Image
          style={Styles.loginLogoImage}
          source={imgLogo}
        />
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
          onPress={() => this.loginUser()}
        >
          <Text style={Styles.signUpButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.createButtonContainer}
          onPress={() => Actions.register()}
        >
          <Text style={Styles.createButtonText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
