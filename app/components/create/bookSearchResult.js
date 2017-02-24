import React, { Component, PropTypes } from 'react';
import { View, Text, ListView } from 'react-native';
import BooksUtil from '../../utils/books.util';
import { Book } from './book';
import Styles from './styles';

export class BookSearchResult extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      results: [],
      dataSource: ds.cloneWithRows([])
    };

    this.createRow = this.createRow.bind(this);
    this.updateData = this.updateData.bind(this);
    this.props.searchInput$.subscribe(() => { this.setState({results:[], dataSource : ds.cloneWithRows([])}); });
    this.props.searchInput$.subscribe(
      text => BooksUtil.searchBook$(text)
        .subscribe(
          books => {
            let results = this.state.results;
            results = results.concat(books);
            this.updateData({results, dataSource: ds.cloneWithRows(results)});
          }
        )
    );
  }

  updateData(data) {
    this.setState(data);
  }

  createRow(data) {
    return (
      <Book onBookSelected={this.props.onBookSelected} onpressBook={this.props.onpressBook} book = {data} />
    )
  }

  render() {

    return (
      <View style={Styles.searchResultContainer}>
        <ListView
          enableEmptySections={true}
          horizontal={true}
          dataSource={this.state.dataSource}
          renderRow={this.createRow}
        >
        </ListView>
      </View>
    );
  }
}
