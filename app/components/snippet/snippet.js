import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SCENE_CONSTANT } from './../../app';
import Styles, { HEIGHT, WIDTH } from './styles';
import Footer from '../../footer';

export default class Snippet extends Component {
  static propTypes = {
    libraryList: PropTypes.any
  };
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = [];
    Object.keys(this.props.libraryList).map((key) => {
      if (this.props.libraryList[key].node.mySnippets !== undefined
        && this.props.libraryList[key].node.mySnippets.length !== 0) {
        dataSource.push(this.props.libraryList[key]);
      }
    });
    this.state = {
      dataSource: ds.cloneWithRows(dataSource),
      offset: 0,
      direction: undefined
    };
  }

  // todo: refactor this duplicated one from myLibrary
  onScroll(event) {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let direction = currentOffset > this.state.offset ? 'down' : 'up';
    this.setState({
      offset: currentOffset,
      direction: direction
    });
  }
  
  handleOnPressBookTransition(bookInfo) {
    // todo: implement scene transition on book press here
    Actions.detailView({
      prevScene: SCENE_CONSTANT.MY_LIBRARY,
      bookInfo: bookInfo.node
    });
  }

  renderRow(rowData) {
    const { node } = rowData;
    return (
      <View style={Styles.snippetContainer}>
        <View style={[Styles.snippetSlide, {left: 0}]}>
          <TouchableOpacity
            style={Styles.snippetSlideInnerContainer}
            onPress={() => this.handleOnPressBookTransition(rowData)}
          >
            <View style={{flexDirection: 'row'}}>
              <View style={Styles.snippetSlideBookThumbnail}>
                {node.thumbnail ?
                  <Image
                    style={Styles.book}
                    source={{uri: node.thumbnail}}/> : null}
              </View>
              <View style={Styles.snippetSlideTitleContainer}>
                <Text style={Styles.textSnippetSlideTitle}>{node.title}</Text>
                <View style={Styles.snippetSlideCntBox}>
                  <Text style={Styles.textSnippetSlideCnt}>{node.mySnippets.length}</Text>
                </View>
              </View>
            </View>
            <View style={Styles.snippet}>
              <Text
                style={Styles.textSnippetSlide}
                numberOfLines={10}
                ellipsizeMode='tail'>
                {node.mySnippets[0].contents}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.snippetBottom}>
            <View style={Styles.snippetBottomText}>
              <Text style={Styles.textSnippetSlideDate}>{node.mySnippets[0].createdDate}</Text>
              <Text style={Styles.textSnippetSlidePageNum}>p.{node.mySnippets[0].page}</Text>
            </View>
            <View style={Styles.snippetBottomComponents}/>
            <View style={{marginTop: 20}}>
              <Image
                source={require('./../../resources/originalImg.png')}
              />
            </View>
          </View>
        </View>
        {(node.mySnippets.length > 1) ?
          <View style={[Styles.snippetSlide, {left: WIDTH * 5 / 375, top: WIDTH * 15 / 375}]}/> : null}
        {(node.mySnippets.length > 1) ?
          <View style={[Styles.snippetSlide, {left: WIDTH * 10 / 375, top: WIDTH * 30 / 375}]}/> : null}
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={this.onScroll.bind(this)}
          style={{flex: 1, marginTop: HEIGHT * 0.14}}
        >
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            style={{backgroundColor: '#fdfdfd'}}
            contentContainerStyle={{alignItems: 'center'}}
          />
        </ScrollView>
        <Footer status={this.state.direction}/>
      </View>
    );
  }
}
