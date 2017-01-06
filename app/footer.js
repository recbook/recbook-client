import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  bottomNavigationBar: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#605C56',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0.3
    },
    justifyContent: 'flex-start'
  },
  profileContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: WIDTH * 0.067,
    marginRight: WIDTH * 0.18,
    alignSelf: 'center'
  },
  profileText: {
    fontSize: 12,
    color: '#D20058',
    fontWeight: 'bold',
    letterSpacing: 1
  },
  cameraContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  cameraImage: {
    width: HEIGHT * 0.074,
    height: HEIGHT * 0.074,
    backgroundColor: 'transparent',
    resizeMode: 'contain'
  }
});

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomTabHeight: HEIGHT * 0.096
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'down') {
      this.setState({bottomTabHeight: 0});
    } else {
      this.setState({bottomTabHeight: HEIGHT * 0.096});
    }
  }

  renderMyProfile() {
    return (
      <TouchableOpacity style={styles.profileContainer}>
        <Text style={styles.profileText}>
          REC
          <Text style={{color: 'white'}}>
            BOOK
          </Text>
        </Text>
      </TouchableOpacity>
    );
  }

  renderCamera() {
    return (
        <TouchableOpacity style={styles.cameraContainer}>
          <Image
              style={styles.cameraImage}
              source={require("./resources/camera.png")}
          />
        </TouchableOpacity>
    );
  }

  render() {
    return (
        <Animated.View style={[styles.bottomNavigationBar, {height: this.state.bottomTabHeight}]}>
          {this.renderMyProfile()}
          {this.renderCamera()}
        </Animated.View>
    );
  }
}

export default Footer;
