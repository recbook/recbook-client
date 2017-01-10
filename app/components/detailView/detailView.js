import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Styles from './styles';

export default class DetailView extends Component {
  constructor() {
    super();
    this.state = {
      // TBD
    };
  }

  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'yellow'}}>
        <View style={Styles.detailViewMarginTop}/>
        <View style={Styles.detailViewTopContainer}>
          <View style={Styles.detailViewTopTextContainer}>
            <Text style={Styles.textDetailViewTopTitle}>Danish Architecture</Text>
          </View>
        </View>
        <View style={Styles.detailViewBookContainer}>

        </View>
        <View style={Styles.detailViewBottomContainer}>

        </View>
      </View>
    );
  }
}
