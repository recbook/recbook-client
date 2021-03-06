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
import Rx from 'rx';
import EventEmitter from 'EventEmitter';
import BooksUtil from '../../utils/books.util';
import { Actions, ActionConst } from 'react-native-router-flux';
import { SCENE_CONSTANT } from './../../app';
import Styles from './styles';
import LibraryView from '../myLibrary/libraryView';
import { PropTypes } from 'react';
import Relay from 'react-relay';

import imgBackButton from '../../resources/back.png';
import imgSearchButton from '../../resources/search.png';

class Search extends Component {
  static propTypes = {
    user: PropTypes.object,
    libraryList: PropTypes.any,
    prevScene: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      message: undefined,
      count: 0,
      bookList: this.props.user.recommendedBooks.edges
    };

    this.updateBookList = this.updateBookList.bind(this);

    this.searchInputEventEmitter = new EventEmitter();
    this.searchInput$ = Rx.Observable.fromEvent(this.searchInputEventEmitter, 'searchInput')
      .filter((text) => text.length > 2)
      .debounce(750)  /* Pause for 750ms */
      .distinctUntilChanged();

    this.searchInput$.subscribe(() => { this.updateBookList([]); });
    this.searchInput$.subscribe(
      text => BooksUtil.searchBook$(text)
        .subscribe(
          books => {
            books = books.map(book => {
              book.mySnippets = [];
              book.snippets = [];
              return { node: book}
            });
            this.updateBookList(this.state.bookList.concat(books));
          }
        )
    );
  }

  updateBookList(bookList) {
    this.setState({ bookList });
  }

  onChangeSearch(message) {
    this.setState({
      message: message
    });
    this.searchInputEventEmitter.emit('searchInput', message);
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
      <View
        animationType={"fade"}
        style={Styles.container}
      >
        <View style={Styles.searchBarContainer}>
        <TouchableOpacity onPress={() => Actions.myLibrary({type: ActionConst.POP_AND_REPLACE})}>
          <Image
            source={imgBackButton}
            style={Styles.backButton}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <TextInput
            style={Styles.searchBar}
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeSearch.bind(this)}
            placeholder="        Search snippets, books"
          >
            {(this.state.message === ""
            || this.state.message === undefined) ?
              <Image
                source={imgSearchButton}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 12,
                  marginRight: 10,
                  opacity: 0.4
                }}
              /> : null}
          </TextInput>
        </TouchableOpacity>
      </View>
        <View style={Styles.resultContainer}>
        <Text style={Styles.resultText}>

        </Text>
        </View>
        <StatusBar hidden={true}/>
        <View style={{flex: 1}}>
          <LibraryView
            libraryList={this.state.bookList}
            prevScene={SCENE_CONSTANT.RECOMMENDED}
          />
        </View>
      </View>
    );
  }
}

export default Relay.createContainer(Search, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    user: () => {
      return Relay.QL `
          fragment on User {
              recommendedBooks(first: 20) {
                  edges{
                      node {
                          id
                          title
                          author
                          isbn
                          thumbnail
                          publisher
                          publishedDate
                          snippets
                          isSaved
                          mySnippets {
                              id
                              contents
                              page
                              createdDate
                          }
                      }
                  }
              }
          }
      `;
    }
  }
});
