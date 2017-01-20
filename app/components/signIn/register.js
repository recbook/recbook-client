import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Styles from './styles';
import * as Auth from './auth';
import { Actions } from 'react-native-router-flux';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerEmail: undefined,
      registerUserName: undefined,
      registerPassword: undefined
    };
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
        <TextInput
          style={Styles.emailTextInput}
          placeholder="Email"
          onChangeText={this.handleRegisterEmail.bind(this)}
        />
        <TextInput
          style={Styles.nameTextInput}
          placeholder="Name"
          onChangeText={this.handleRegisterUserName.bind(this)}
        />
        <TextInput
          style={Styles.passwordTextInput}
          placeholder=" Password"
          onChangeText={this.handleRegisterPassword.bind(this)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => this.registerUser()}
        >
          <Text style={Styles.signInButton}>SignIn</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Register;
