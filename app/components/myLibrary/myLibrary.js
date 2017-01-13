import React, { Component, PropTypes } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  PanResponder
} from 'react-native';
import Relay from 'react-relay';
import { Actions } from 'react-native-router-flux';
import Styles, { HEIGHT, WIDTH, generateRandomColor } from './styles';
import Footer from '../../footer';

const compareLists = (a, b) => {
  if (a && b) {
    return (a.toString() !== b.toString());
  }
  return (a || b);
};

export class MyLibrary extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      onPressedBookIndex: undefined,
      onPressedColumn: undefined,
      initialBookColor: [],
      coordinate: [],
      fadeAnimRow: new Animated.Value(0),
      offset: 0,
      direction: undefined,
      refs: [],
      pan: new Animated.ValueXY()
    };
    const height = HEIGHT * 0.477;
    const width = WIDTH * 0.433;
    for (let i = 0; i < this.state.dataSource.length; i = i + 1) {
      this.state.initialBookColor.push(generateRandomColor());
      const left = (i % 2 === 0) ? 0 : width;
      const top = 0.5 * i * height;
      this.state.coordinate.push({left, top});
    }
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {console.log('touched');},
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease : (e, gesture) => {}
    });
  }

  static propTypes = {
    user: PropTypes.object
  };

  shouldComponentUpdate(nextState) {
    let {
      dataSource,
      onPressedBookIndex,
      onPressedColumn,
      initialBookColor,
      fadeAnimRow,
      offset,
      direction,
      coordinate,
      refs} = this.state;
    return (
      (onPressedBookIndex !== nextState.onPressedBookIndex) ||
      (onPressedColumn !== nextState.onPressedColumn) ||
      (fadeAnimRow !== nextState.fadeAnimRow) ||
      (offset !== nextState.offset) ||
      (direction !== nextState.direction) ||
      (compareLists(initialBookColor, nextState.initialBookColor)) ||
      (compareLists(dataSource, nextState.dataSource)) ||
      (compareLists(coordinate, nextState.coordinate))
      (compareLists(refs, nextState.refs)));
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

  handleOnLongPress(i) {
    console.log(i);
    console.log(this.state.refs[i]);
  }

  // todo: resolve issue on onLongPress not being invoked properly when there is onPressIn
  renderRowContent(i) {
    const { initialBookColor } = this.state;
    return (
      <View style={[Styles.row, {backgroundColor: (this.state.onPressedBookIndex === i) ? '#ececec' : 'transparent'}]}>
        <TouchableOpacity
          style={Styles.row}
          onPress={this.handleOnPressBookTransition.bind(this)}
          onLongPress={() => {
            this.sortRows();
            this.handleOnLongPress(i);
          }}
          activeOpacity={0.8}
        >
          <View style={[Styles.book, {backgroundColor: initialBookColor[i]}]}/>
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

  onScroll(event) {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let direction = currentOffset > this.state.offset ? 'down' : 'up';
    this.setState({
      offset: currentOffset,
      direction: direction
    });
  }

  sortRows() {
    const immutableList = this.state.coordinate.concat();
    immutableList[0] = JSON.parse(JSON.stringify(this.state.coordinate[3]));
    immutableList[1] = JSON.parse(JSON.stringify(this.state.coordinate[0]));
    immutableList[2] = JSON.parse(JSON.stringify(this.state.coordinate[1]));
    immutableList[3] = JSON.parse(JSON.stringify(this.state.coordinate[2]));
    LayoutAnimation.easeInEaseOut();
    this.setState({coordinate: immutableList});
  }

  renderAbsoluteRow(i) {
    const { coordinate } = this.state;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        ref={component => this.state.refs.push(component)} // eslint-disable-line
        key={i}
        style={[{
          top: coordinate[i].top,
          left: coordinate[i].left,
          height: HEIGHT * 0.477,
          width: WIDTH * 0.433,
          position: 'absolute',
          borderRadius: 7,
          zIndex: 10}]}>
        {this.renderRowContent(i)}
      </Animated.View>
    );
  }

  renderAbsoluteBoxes() {
    const { dataSource } = this.state;
    const height = HEIGHT * 0.477;
    return (
      <View
        style={{
          width: WIDTH,
          height: (dataSource.length - 1) * height / 2 + height + HEIGHT * 0.096,
          marginLeft: WIDTH * 0.064,
          flexDirection: 'column'}}
      >
          {dataSource.map((t, i) => {
            return this.renderAbsoluteRow(i);
          })}
      </View>
    );
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

export default Relay.createContainer(MyLibrary, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    user: () => {
      return Relay.QL `
          fragment on User {
              id,
              email,
              name,
              createdAt
          }
      `;
    }
  }
});
