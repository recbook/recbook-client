import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  PanResponder
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles from './styles';
import Footer from '../../footer';
import emptyImg from './../../resources/Empty Library Img.png';

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

export default class LibraryView extends Component {
  static propTypes = {
    user: PropTypes.object,
    libraryList: PropTypes.any,
    prevScene: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.libraryList,
      onPressedBookIndex: undefined,
      onPressedColumn: undefined,
      initialBookColor: [],
      offset: 0,
      direction: undefined
    };
    for (let i = 0; i < this.props.libraryList.length; i = i + 1) {
      this.state.initialBookColor.push(generateRandomColor());
    }
    this.resetBookBackgroundColor = this.resetBookBackgroundColor.bind(this);
  }

  handleOnPressBookStyle(index, col) {
    // todo: implement this.
    this.setState({
      onPressedBookIndex: index,
      onPressedColumn: col
    });
  }

  handleOnPressBookTransition(bookInfo) {
    // todo: implement scene transition on book press here
    Actions.detailView({
      prevScene: this.props.prevScene,
      bookInfo: bookInfo.data.node,
      color: bookInfo.color
    });
    // this changing the color back to white after transition animation is done
    setTimeout(()=>{this.resetBookBackgroundColor()}, 800);
  }

  resetBookBackgroundColor() {
    this.setState({
      onPressedBookIndex: undefined,
      onPressedColumn: undefined
    });
  }

  renderRow(content, index, col) {
    const { node } = content.data;
    return (
      <Animated.View
        style={[
          Styles.row,
          {
            backgroundColor: (this.state.onPressedBookIndex === index && this.state.onPressedColumn === col) ?
              'rgba(236, 236, 236, 1)' : 'white'
          }
        ]}
        key={index}
      >
        <TouchableOpacity
          style={Styles.row}
          onPressIn={() => this.handleOnPressBookStyle(index, col)}
          onPress={() => this.handleOnPressBookTransition(content)}
          onPressOut={this.resetBookBackgroundColor}
          activeOpacity={1}
        >
          <View style={[Styles.bookContainer, {backgroundColor: content.color}]}>
            {(node.thumbnail) ?
              <Image
                source={{uri: node.thumbnail}}
                style={Styles.book}/> : null}
          </View>
          <View style={Styles.textContainerInfo}>
            <View style={Styles.textContainerTitle}>
              <Text style={Styles.textBookTitle}
                    numberOfLines={3}
                    ellipsizeMode='tail'>
                {node.title}
              </Text>
              <View style={Styles.snippetCountContainer}>
                {(this.props.prevScene) === 'Recommended' ? null :
                  <View style={Styles.snippetCountBox}>
                    <Text style={Styles.textSnippetCount}>{node.mySnippets.length || 0}</Text>
                  </View>
                }
              </View>
            </View>
            <View style={Styles.textContainerDetail}>
              <Text style={Styles.textBookInfo}>by {node.author} ({node.publishedDate ? node.publishedDate.substring(0,4) : ''})
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  filterDataSourceUponColumn(start) {
    let dataSource = [];
    for (let i = start; i < this.props.libraryList.length; i = i + 2) {
      dataSource.push({data: this.props.libraryList[i], color: this.state.initialBookColor[i]});
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
          style={{
            flex: 1,
            marginTop: (this.props.prevScene) === 'Recommended' ? -20 : HEIGHT * 0.125}}
        >
          <View style={Styles.container}>
            {(this.props.libraryList.length === 0) ?
              <Image
                source={emptyImg}
                style={Styles.empty}/> : null}
            {this.renderLeftColumn()}
            {this.renderRightColumn()}
          </View>
        </ScrollView>
        <Footer status={this.state.direction}/>
      </View>
    );
  }
}
