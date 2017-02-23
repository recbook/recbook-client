import React, { Component, PropTypes } from 'react';
import { View, TextInput } from 'react-native';
import Styles from './styles';

export class BookSearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View
        style={Styles.searchBarContainer}
      >
        <TextInput
          style={Styles.searchBarInput}
          placeholder = 'Search your book'
          placeholderTextColor= '#ffffffaa'
          onChangeText={(text) => {
            this.props.searchInputEventEmitter.emit('searchInput', text);}
          }
        />
      </View>
    );
  }
}
