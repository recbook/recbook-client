import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Relay from 'react-relay';

const COLUMN_CONSTANT = {
  LEFT: 'left',
  RIGHT: 'right'
};

const HEIGHT = Dimensions.get('window').height;
const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    margin: 10,
    flexDirection: 'column',
    borderRadius: 7
  },
  leftColumn: {
    paddingBottom: 100
  },
  rightColumn: {
    paddingTop: 50
  },
  book: {
    margin: 10,
    height: 200,
    borderRadius: 7
  },
  textBookTitle: {
    fontWeight: 'bold'
  },
  textBookInfo: {
    color: '#8e8e8e',
    fontSize: 10
  },
  textContainer: {
    marginLeft: 10,
    flex: 1
  }
};

const generateRandomColor = () => {
  // eslint-disable-next-line
  return '#' + (function co(lor){ return (lor +=
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
    && (lor.length === 6) ? lor : co(lor); })('');
};

export class MyLibrary extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      onPressedBookIndex: undefined,
      onPressedColumn: undefined,
      initialBookColor: []
    };
    for (let i = 0; i < this.state.dataSource.length; i = i + 1) {
      this.state.initialBookColor.push(generateRandomColor());
    }
  }

  static propTypes = {
    user: PropTypes.object
  };

  handleOnPressBook(index, col) {
    // todo: implement this.
    this.setState({
      onPressedBookIndex: index,
      onPressedColumn: col
    });
  }

  renderRow(content, index, col) {
    return (
      <TouchableOpacity
        style={[
          styles.row,
          {backgroundColor: (this.state.onPressedBookIndex === index && this.state.onPressedColumn === col) ? '#ececec' : 'white'}]}
        onPress={() => this.handleOnPressBook(index, col)}
        activeOpacity={1}
      >
        <View style={[styles.book, {backgroundColor: content.color}]}/>
        <View style={styles.textContainer}>
          <Text style={styles.textBookTitle}>BOOK #{content.data}</Text>
        </View>
        <View style={[styles.textContainer, {marginBottom: 10}]}>
          <Text style={styles.textBookInfo}>author: {content.data} bibbid vav sust reandsaf asdf lkdasdfas kds</Text>
        </View>
      </TouchableOpacity>
    );
  }

  filterDataSourceUponColumn(start) {
    let dataSource = [];
    for (let i = start; i < this.state.dataSource.length; i = i + 2) {
      dataSource.push({data: this.state.dataSource[i], color: this.state.initialBookColor[i]});
    }
    return dataSource;
  }

  renderLeftColumn() {
    const leftDataSource = this.filterDataSourceUponColumn(0);
    return (
      <View style={[styles.leftColumn, {width: Dimensions.get('window').width / 2}]}>
        {leftDataSource.map((t, i) => this.renderRow(t, i, COLUMN_CONSTANT.LEFT))}
      </View>
    );
  }

  renderRightColumn() {
    const rightDataSource = this.filterDataSourceUponColumn(1);
    return (
      <View style={[styles.rightColumn, {width: Dimensions.get('window').width / 2}]}>
        {rightDataSource.map((t, i) => this.renderRow(t, i, COLUMN_CONSTANT.RIGHT))}
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{flex: 1, marginTop: HEIGHT * 0.11}}>
        <View style={styles.container}>
          {this.renderLeftColumn()}
          {this.renderRightColumn()}
        </View>
      </ScrollView>
    );
  }
}

export default Relay.createContainer(MyLibrary, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    user: () => {
      return Relay.QL `          
          fragment on User {
              _id,
              email,
              name,
              createdAt
          }
      `;
    }
  }
});

