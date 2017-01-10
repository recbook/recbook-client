import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Relay from 'react-relay';
import { Actions } from 'react-native-router-flux';
import Styles from './styles';
import Footer from '../../footer';

const COLUMN_CONSTANT = {
  LEFT: 'left',
  RIGHT: 'right'
};

const HEIGHT = Dimensions.get('window').height;

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
      initialBookColor: [],
      fadeAnimRow: new Animated.Value(0),
      offset: 0,
      direction: undefined
    };
    for (let i = 0; i < this.state.dataSource.length; i = i + 1) {
      this.state.initialBookColor.push(generateRandomColor());
    }
  }

  static propTypes = {
    user: PropTypes.object
  };

  animateFadeRow() {
    Animated.sequence([
      Animated.timing(
        this.state.fadeAnimRow,
        {
          toValue: 0,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.fadeAnimRow,
        {
          toValue: 1,
          duration: 300
        }
      )
    ]).start();
  }

  handleOnPressBookStyle(index, col) {
    // todo: implement this.
    this.setState({
      onPressedBookIndex: index,
      onPressedColumn: col
    });
    this.animateFadeRow();
  }

  handleOnPressBookTransition() {
    // todo: implement scene transition on book press here
    Actions.detailView();
  }

  renderRow(content, index, col) {
    const color = this.state.fadeAnimRow.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(236, 236, 236, 1)']
    });
    return (
      <Animated.View
        style={[
          Styles.row,
          {
            backgroundColor: (this.state.onPressedBookIndex === index && this.state.onPressedColumn === col) ? color : 'white'
          }
        ]}
        key={content.data}
      >
        <TouchableOpacity
          style={Styles.row}
          onPressIn={() => this.handleOnPressBookStyle(index, col)}
          onPress={() => this.handleOnPressBookTransition()}
          activeOpacity={1}
        >
          <View style={[Styles.book, {backgroundColor: content.color}]}/>
          <View style={Styles.textContainerTitle}>
            <Text style={Styles.textBookTitle}>BOOK{'\n'}Example #{content.data}</Text>
            <View style={Styles.snippetCountContainer}>
              <View style={Styles.snippetCountBox}>
              <Text style={Styles.textSnippetCount}>{content.data}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.textContainerInfo}>
            <Text style={Styles.textBookInfo}>author: {content.data} bibbid vav sust reandsaf asdf lkdasdfas kds</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
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
      <View style={Styles.leftColumn}>
        {leftDataSource.map((t, i) => this.renderRow(t, i, COLUMN_CONSTANT.LEFT))}
      </View>
    );
  }

  renderRightColumn() {
    const rightDataSource = this.filterDataSourceUponColumn(1);
    return (
      <View style={Styles.rightColumn}>
        {rightDataSource.map((t, i) => this.renderRow(t, i, COLUMN_CONSTANT.RIGHT))}
      </View>
    );
  }

  onScroll(event) {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let direction = currentOffset > this.state.offset ? 'down' : 'up';
    this.setState({
      offset: currentOffset,
      direction: direction
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={this.onScroll.bind(this)}
          style={{flex: 1, marginTop: HEIGHT * 0.11}}
        >
          <View style={Styles.container}>
            {this.renderLeftColumn()}
            {this.renderRightColumn()}
          </View>
        </ScrollView>
        <Footer status={this.state.direction}/>
      </View>
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
