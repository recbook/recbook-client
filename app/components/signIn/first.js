import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Styles from './styles';
import { Actions } from 'react-native-router-flux';

import imgLogo from '../../resources/splash_logo_new.png';

class First extends Component {
  render() {
    return (
      <View style={Styles.firstContainer}>
        <Image
          style={Styles.logoImage}
          source={imgLogo}
        />
        <View style={Styles.descriptionTextContainer}>
          <Text style={Styles.descriptionText}>
            Fully enjoy reading experience {"\n"}with a printed book companion
          </Text>
        </View>
        <TouchableOpacity
          style={Styles.loginButtonContainer}
          onPress={() => Actions.login()}>
          <Text style={Styles.loginButtonText}>LOG IN</Text>
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

export default First;
