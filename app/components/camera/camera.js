import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import Styles from './styles';
import CustomCamera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

import imgCameraButton from '../../resources/camera BTN_active.png';
import imgCancelButton from '../../resources/x btn.png';

class Camera extends Component {
  takePicture() {
    this.camera.capture()
      .then((data) => {
      Actions.crop({imgPath: data.path});
    }).catch(err => console.error(err));
  }

  renderBottom() {
    return (
      <TouchableOpacity
        style={Styles.captureButtonContainer}
        onPress={this.takePicture.bind(this)}
      >
        <Image style={Styles.captureButton} source={imgCameraButton}/>
      </TouchableOpacity>
    );
  }

  renderCamera() {
    return (
      <View style={Styles.container}>
        <TouchableOpacity
          style={Styles.cancelButton}
          onPress={()=>Actions.pop()}
        >
          <Image
            style={Styles.cancelButton}
            source={imgCancelButton}/>
        </TouchableOpacity>
        <CustomCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={Styles.window}
          defaultOnFocusComponent={true}
          captureTarget={CustomCamera.constants.CaptureTarget.temp}
          aspect={CustomCamera.constants.Aspect.fill}/>
        {this.renderBottom()}
        <StatusBar hidden={true}/>
      </View>
    );
  }

  render() {
    return this.renderCamera();
  }
}

export default Camera;
