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
        <TextInput
          style={Styles.emailTextInput}
          placeholder=" Email"
          onChangeText={this.handleRegisterEmail.bind(this)}
        />
        <TextInput
          style={Styles.passwordTextInput}
          placeholder=" Password"
          onChangeText={this.handleRegisterPassword.bind(this)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => this.loginUser()}
        >
          <Text>LogIn</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;