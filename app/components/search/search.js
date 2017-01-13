import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles from './styles';

import imgBackButton from '../../resources/back.png';
import imgSearchButton from '../../resources/search.png';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: undefined,
      count: 0
    };
  }

  onChangeSearch(message) {
    this.setState({
      message: message
    });
  }

  searchBook() {
    let baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
    if (this.state.message !== undefined) {
      baseURL += encodeURIComponent('intitle:' + this.state.message);
    }

    fetch(baseURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          count: responseData.totalItems
        });
      })
      .catch(error =>
        console.log(error)
      ).done();
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
        <Text style={Styles.resultText}>{this.state.count} result of {this.state.message}</Text>
          <TouchableOpacity onPress={() => this.searchBook()}>
            <Image
              source={imgSearchButton}
              style={Styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <StatusBar hidden={true}/>
      </Modal>
    );
  }
}

export default Search;
