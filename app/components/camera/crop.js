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

import Cropping from './cropping';
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
    Actions.cropping({cropTop: 50, cropLeft: 50, width: 200, height: 300});
  }

  renderCropButton() {
    return (
      <View style={Styles.cropButtonContainer}>
        <TouchableOpacity
          onPress={()=>Actions.cropping({cropTop: 50, cropLeft: 50, width: 200, height: 300})}
        >
          <Image
            style={Styles.cropButton}
            source={imgCropButton}/>
        </TouchableOpacity>
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
        {this.state.crop ?
          <Cropping
            cropTop={50}
            cropLeft={50}
            width={200}
            height={300}
            style={{
              borderRadius: 5
            }}>
            <Image
              source={{uri: this.props.imgPath}}
              style={{
                width: 350,
                height: 526
              }}
              resizeMode="contain" />
          </Cropping>
          : <Image
          style={Styles.window}
          source={{uri: this.props.imgPath}}/>}
        {this.renderCropButton()}
        {this.renderBottom()}
      </View>
    );
  }

  render() {
    return this.renderCrop();
  }
}

export default Crop;
