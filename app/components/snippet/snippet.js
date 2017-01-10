import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import Styles, { HEIGHT, WIDTH } from './styles';
import Footer from '../../footer';

export default class Snippet extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
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

  renderRow(rowData) {
    return (
      <View style={Styles.snippetContainer}>
        <View style={[Styles.snippetSlide, {zIndex: 3, left: 0}]}>
          <View style={Styles.snippetSlideInnerContainer}>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={Styles.textSnippetSlideDate}>26 Oct 2016</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={Styles.snippetSlideBookThumbnail}/>
              <View style={Styles.snippetSlideTitleContainer}>
                <Text style={Styles.textSnippetSlideTitle}>Danish Architecture</Text>
                <View style={Styles.snippetSlideCntBox}>
                  <Text style={Styles.textSnippetSlideCnt}>11</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={Styles.textSnippetSlide}>
                The success of one design, however, does not suggest that the others are less useful or not as good. Des
                ign can have diversity in its solution to problems without compromising the success of any of them
              </Text>
            </View>
            <View style={{alignItems: 'flex-end', marginTop: 2}}>
              <Text style={Styles.textSnippetSlidePageNum}>P.102</Text>
            </View>
            <View style={{borderBottomWidth: 1, borderColor: '#dadada', marginTop: 6}}/>
            <View style={{marginTop: 20}}>
              <Image
                source={require('./../../resources/originalImg.png')}
              />
            </View>
          </View>
        </View>
        <View style={[Styles.snippetSlide, {zIndex: 2, left: WIDTH * 4 / 375, top: WIDTH * 4 / 375}]}/>
        <View style={[Styles.snippetSlide, {zIndex: 1, left: WIDTH * 8 / 375, top: WIDTH * 8 / 375}]}/>
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
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            style={{backgroundColor: '#fdfdfd'}}
            contentContainerStyle={{alignItems: 'center'}}
          />
        </ScrollView>
        <Footer status={this.state.direction}/>
      </View>
    );
  }
}
