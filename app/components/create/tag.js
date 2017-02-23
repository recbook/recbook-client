import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from './styles';

export class Tag extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={Styles.tagContainer}>
        <Text style={Styles.tagText}>{this.props.text}</Text>
        <TouchableOpacity
          onPress={() => {this.props.onCancelTag(this.props.text);}}
          activeOpacity={1}
          style={Styles.tagCancelButton}
        >
          <Text style={{color:'white'}}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
