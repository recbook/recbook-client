import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import imgCameraButton from './resources/rec_btn.png';

const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  cameraContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderColor: '#ff5722',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    right: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  cameraImage: {
    width: HEIGHT * 0.074,
    height: HEIGHT * 0.074,
    resizeMode: 'contain'
  }
});

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottomTabHeight: HEIGHT * 0.096,
      myPage: false,
      image: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'down') {
      this.setState({bottomTabHeight: 0});
    } else {
      this.setState({bottomTabHeight: HEIGHT * 0.096});
    }

    if (nextProps.isOpen) {
      this.setState({myPage: true});
    } else {
      this.setState({myPage: false});
    }
  }

  renderCamera() {
    return (
      <View style={styles.cameraContainer}>
        <TouchableOpacity onPress={()=>Actions.camera()}>
          <Image
              style={styles.cameraImage}
              source={imgCameraButton}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.state.myPage) {
      return null;
    }

    return this.renderCamera();
  }
}

export default Footer;
