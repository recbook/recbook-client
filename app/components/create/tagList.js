import React, { Component, PropTypes } from 'react';
import { View, Text, ListView } from 'react-native';
import {Tag} from './tag';
import Styles from './styles';

export class TagList extends Component {

  constructor(props) {
    super(props);
    this.createTag = this.createTag.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.data)
    };
  }

  createTag(data) {
    return (
      <Tag onCancelTag={this.props.onCancelTag} text={data.text}/>
    )
  }

  render() {
    return (
      <View style={Styles.tagListContainer}>
        <ListView
          enableEmptySections={true}
          horizontal={true}
          dataSource={this.state.dataSource}
          renderRow={this.createTag}
        >
        </ListView>
      </View>
    );
  }
}
