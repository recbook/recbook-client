import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  PanResponder,
  LayoutAnimation
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles, { HEIGHT, WIDTH } from './styles';
import Footer from '../../footer';

const compareLists = (a, b) => {
  if (a && b) {
    return (a.toString() !== b.toString());
  }
  return (a || b);
};

export default class LibraryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      onPressedBookIndex: undefined,
      fadeAnimRow: new Animated.Value(0),
      offset: 0,
      direction: undefined,
      pan: new Animated.ValueXY()
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {console.log('touched');},
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease : (e, gesture) => {}
    });
    this.renderAbsoluteRow = this.renderAbsoluteRow.bind(this);
  }

  static propTypes = {
    user: PropTypes.object,
    libraryList: PropTypes.any,
    prevScene: PropTypes.string,
    coordinate: PropTypes.array,
    initialBookColor: PropTypes.array,
    sortRows: PropTypes.func
  };

  shouldComponentUpdate(nextState) {
    let {
      dataSource,
      direction,
      fadeAnimRow,
      offset
    } = this.state;
    return (
    (fadeAnimRow !== nextState.fadeAnimRow) ||
    (offset !== nextState.offset) ||
    (direction !== nextState.direction) ||
    (compareLists(dataSource, nextState.dataSource)) ||
    (compareLists(refs, nextState.refs)));
  }

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

  handleOnPressBookTransition(bookInfo) {
    // todo: implement scene transition on book press here
    Actions.detailView({prevScene: this.props.prevScene, bookInfo: bookInfo.node});
  }

  renderRow(content, index, col) {
    const color = this.state.fadeAnimRow.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(236, 236, 236, 1)']
    });
    const { node } = content.data;
    return (
      <Animated.View
        style={[
          Styles.row,
          {
            backgroundColor: (this.state.onPressedBookIndex === index && this.state.onPressedColumn === col) ? color : 'white'
          }
        ]}
        key={node.id}
      >
        <TouchableOpacity
          style={Styles.row}
          onPressIn={() => this.handleOnPressBookStyle(index, col)}
          onPress={() => this.handleOnPressBookTransition(content.data)}
          activeOpacity={1}
        >
          {(node.thumbnail) ?
            <Image
              source={{uri: node.thumbnail}}
              style={Styles.book}
            />
            :
            <View style={[Styles.book, {backgroundColor: content.color}]}/>
          }
          <View style={Styles.textContainerTitle}>
            <Text style={Styles.textBookTitle}>BOOK{'\n'}{node.title}</Text>
            <View style={Styles.snippetCountContainer}>
              <View style={Styles.snippetCountBox}>
                <Text style={Styles.textSnippetCount}>11</Text>
              </View>
            </View>
          </View>
          <View style={Styles.textContainerInfo}>
            <Text style={Styles.textBookInfo}>author: {node.author} bibbid vav sust reandsaf asdf lkdasdfas kds</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderRowContent(node, i) {
    const { initialBookColor } = this.props;
    return (
      <View style={[Styles.row, {backgroundColor: 'transparent'}]}>
        <TouchableOpacity
          style={Styles.row}
          onPress={this.handleOnPressBookTransition.bind(this)}
          onLongPress={this.handleOnLongPress.bind(this)}
          activeOpacity={0.8}
        >
          {(node.thumbnail) ?
            <Image
              source={{uri: node.thumbnail}}
              style={Styles.book}
            />
            :
            <View style={[Styles.book, {backgroundColor: initialBookColor[i]}]}/>
          }
          <View style={Styles.textContainerTitle}>
            <Text style={Styles.textBookTitle}>BOOK{'\n'}Example #{i}</Text>
            <View style={Styles.snippetCountContainer}>
              <View style={Styles.snippetCountBox}>
                <Text style={Styles.textSnippetCount}>{i}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.textContainerInfo}>
            <Text style={Styles.textBookInfo}>author: {i} bibbid vav sust reandsaf asdf lkdasdfas kds</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderAbsoluteRow(node, i) {
    const { coordinate } = this.props;
    return (
      <View
        key={i}
        style={[{
          top: coordinate[i].top,
          left: coordinate[i].left,
          height: HEIGHT * 0.477,
          width: WIDTH * 0.433,
          position: 'absolute',
          borderRadius: 7,
          zIndex: 10
        }]}>
        {this.renderRowContent(node, i)}
      </View>
    );
  }

  handleOnLongPress() {
    this.props.sortRows();
  }

  renderAbsoluteBoxes() {
    const { libraryList } = this.props;
    const height = HEIGHT * 0.477;
    return (
      <View
        style={{
          width: WIDTH,
          height: (libraryList.length - 1) * height / 2 + height + HEIGHT * 0.096,
          marginLeft: WIDTH * 0.064,
          flexDirection: 'column'
        }}
      >
        {libraryList.map((content, index) => this.renderAbsoluteRow(content.node, index))}
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
          <View style={Styles.myLibraryContainer}>
            {this.renderAbsoluteBoxes()}
          </View>
        </ScrollView>
        <Footer status={this.state.direction}/>
      </View>
    );
  }
}
