import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles from './styles';

import imgBackButton from '../../resources/back.png';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: undefined,
      messageLength: 0
    };
  }

  onChangeSearch(message) {
    this.setState({
      message: message,
      messageLength: message.length
    });
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        style={Styles.container}
      >
        <View style={Styles.searchBarContainer}>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Image
            source={imgBackButton}
            style={Styles.backButton}
          />
        </TouchableOpacity>
        <TextInput
          style={Styles.searchBar}
          underlineColorAndroid="transparent"
          onChangeText={this.onChangeSearch.bind(this)}
          placeholder="Search snippets, books"
        />
      </View>
        <View style={Styles.resultContainer}>
        <Text style={Styles.resultText}>{this.state.messageLength} result of 'Facebook'</Text>
        </View>
        <StatusBar hidden={true}/>
      </Modal>
    );
  }
}

export default Search;
