import React, { Component } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles from './styles';

import imgXBtn from './../../resources/x btn.png';
import imgDelete from './../../resources/delete.png';
import imgDeletePressed from './../../resources/delete_pressed.png';
import imgEdit from './../../resources/edit.png';
import imgEditPressed from './../../resources/edit_pressed.png';
import imgShare from './../../resources/share.png';
import imgSharePressed from './../../resources/share_pressed.png';

const PRESSED_CONSTANT = {
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  SHARE: 'SHARE'
};

export default class Expanded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMyLibrary: this.props.viewMyLibrary,
      data: this.props.data,
      onScrollcontentOffsetY: 0,
      pressed: undefined
    };
  }

  shouldComponentUpdate(nextState) {
    if (this.state.onScrollcontentOffsetY !== nextState.onScrollcontentOffsetY) {
      return true;
    }
    return false;
  }

  onScroll(event) {
    let currentOffset = event.nativeEvent.contentOffset.y;
    this.setState({onScrollcontentOffsetY: currentOffset});
    const ratio = 0.03;
    if (currentOffset <= 8 && currentOffset >= 0) {
      this.changeNativeShadowOpacity(currentOffset * ratio);
    } else if (currentOffset > 8) {
      this.changeNativeShadowOpacity(8 * 0.03);
    } else if (currentOffset < 0) {
      this.changeNativeShadowOpacity(0);
    }
  }

  changeNativeShadowOpacity(opacity) {
    this.refHeader.setNativeProps({style: {shadowOpacity: opacity}});
  }

  render() {
    let { pressed } = this.state;
    return (
      <View style={{flex: 1}}>
      <Animated.View
        style={[Styles.expandedHeaderButtonContainer]}
        ref={component => this.refHeader = component} // eslint-disable-line
      >
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Image
            style={Styles.imgExpandedHeaderXBtn}
            source={imgXBtn}
          />
        </TouchableOpacity>
        {(!this.props.viewMyLibrary) ?
          <Text style={Styles.textExpandedHeaderSave}>Edit</Text> : null}
      </Animated.View>
      <View style={{
        paddingTop: 83.5,
        flex: 1
      }}>
        <ScrollView
          style={{flex: 1, backgroundColor: 'white'}}
          onScroll={this.onScroll.bind(this)}
          scrollEventThrottle={16}
        >
          <Text style={Styles.textExpandedContent}>
            {(!this.props.viewMyLibrary) ?
              this.state.data.contents :
            "A sunflower seed and a solar system are the same thing;" +
            " they both are whole systems. I find it easier to pay attention" +
            " to the complexities of the smaller than to pay attention to the" +
            " complexities of the larger. That, as much as anything, is why I'm a craftsman." +
            " It's a small discipline, but you can put an awful lot into it.{'\n'}ADAM SMITH, KNIFEMAKER"
            }
          </Text>
        </ScrollView>
      </View>
      <View style={Styles.expandedFooterContainer}>
        <TouchableOpacity
          style={{marginLeft: 32}}
          onPress={() => this.setState({pressed: PRESSED_CONSTANT.EDIT})}
          activeOpacity={1}
        >
          <Image
            style={Styles.imgExpandedFooterBtn}
            source={(pressed === PRESSED_CONSTANT.EDIT) ? imgEditPressed : imgEdit}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 32}}
          onPress={() => this.setState({pressed: PRESSED_CONSTANT.SHARE})}
          activeOpacity={1}
        >
          <Image
            style={Styles.imgExpandedFooterBtn}
            source={(pressed === PRESSED_CONSTANT.SHARE) ? imgSharePressed : imgShare}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 32}}
          onPress={() => this.setState({pressed: PRESSED_CONSTANT.DELETE})}
          activeOpacity={1}
        >
          <Image
            style={Styles.imgExpandedFooterBtn}
            source={(pressed === PRESSED_CONSTANT.DELETE) ? imgDeletePressed : imgDelete}
          />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
