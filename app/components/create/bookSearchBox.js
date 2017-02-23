import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Rx from 'rx';
import EventEmitter from 'EventEmitter';
import { BookSearchBar } from './bookSearchBar';
import { BookSearchResult } from './bookSearchResult';
import { TagList } from './tagList';
import Styles from './styles';

export class BookSearchBox extends Component {

  constructor(props) {
    super(props);
    this.onBookSelected = this.onBookSelected.bind(this);
    this.onCancelTag = this.onCancelTag.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.searchInputEventEmitter = new EventEmitter();
    this.searchInput$ = Rx.Observable.fromEvent(this.searchInputEventEmitter, 'searchInput')
      .map(data => {
        this.updateSearchValue(data);
        return data;
      })
      .filter((text) => text.length > 2)
      .debounce(750)  /* Pause for 750ms */
      .distinctUntilChanged();

    this.state = {
      results:[],
      searchValue:undefined,
      tagList:[{text:'test1'}],
      isSelected: false,
    };

  }

  updateSearchValue(text) {
    this.setState({
      searchValue: text
    })
  }

  onCancelTag(tagText) {
    this.setState({
      isSelected: false,
      searchValue: tagText,
    });
  }

  onBookSelected(book) {
    this.setState({
      book,
      tagList:[{text:book.title}],
      isSelected: true
    });
  }

  render() {
    return (
      <View>
        {this.state.isSelected && <TagList onCancelTag={this.onCancelTag} data={this.state.tagList}></TagList>}
        {!this.state.isSelected && <BookSearchBar searchInputEventEmitter={this.searchInputEventEmitter} /> }
        {!this.state.isSelected &&
          <BookSearchResult
            onBookSelected={this.onBookSelected}
            onpressBook={this.props.onpressBook}
            searchInput$={this.searchInput$} />
        }
      </View>
    );
  }
}
