import React, { Component, PropTypes} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import Styles from './styles';
import { Actions, ActionConst } from 'react-native-router-flux';
import RNFS from 'react-native-fs';

import imgCameraButton from '../../resources/camera BTN_deactive.png';
import imgCancelButton from '../../resources/x btn.png';
import imgCropButton from '../../resources/crop.png';

class Crop extends Component {
  static propTypes = {
    imgPath: PropTypes.string,
    crop: PropTypes.boolean
  };

  constructor(props) {
    super(props);

    this.state = {
      imagePath: undefined,
      crop: false
    };

    this.encodeBase64(props);
  }

  encodeBase64(props) {
    RNFS.readFile(props.imgPath, 'base64')
      .then(res => {
        this.setState({
          imagePath: res
        });
      })
      .catch(error => console.log(error.message));
  }
  
  setCropView() {
    this.state.crop = true;
  }

  renderCropButton() {
    return (
      <View style={Styles.cropButtonContainer}>
        <Image
          style={Styles.cropButton}
          source={imgCropButton}/>
      </View>
    );
  }

  renderBottom() {
    return (
      <View style={Styles.captureButtonContainer}>
        <TouchableOpacity
          onPress={()=>Actions.pop()}
          style={Styles.retakeButtonContainer}
        >
          <Text style={Styles.retakeButton}>Retake</Text>
        </TouchableOpacity>
        <Image style={Styles.captureButton} source={imgCameraButton}/>
        <TouchableOpacity
          onPress={()=>Actions.createSnippet({
            imgPath: this.props.imgPath
          })}
          style={Styles.nextButtonContainer}
        >
          <Text style={Styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderCrop() {
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
      </View>
    );
  }

  render() {
    return this.renderCrop();
  }
}

export default Crop;
