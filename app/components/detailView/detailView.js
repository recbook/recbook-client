import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles from './styles';
import { save } from './../../mutations/save';

import imgJump from './../../resources/jump.png';
import imgMediaShown from './../../resources/media shown.png';
import imgBack from './../../resources/backDetail.png';
import imgBookmarked from './../../resources/bookmark_selected.png';
import imgUnBookmarked from './../../resources/bookmark.png';
import Footer from '../../footer';

import { SCENE_CONSTANT } from './../../app';

const SORT_CONSTANT = {
  RECENT: 'Recent',
  POPULAR: 'Popular',
  PAGE: 'Page'
};

export default class DetailView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const pages = this.props.bookInfo.snippets;
    const snippets = this.props.bookInfo.mySnippets;
    this.state = {
      dataSourceOtherSnippets: ds.cloneWithRows(pages === null ? [''] : pages),
      dataSourceMySnippets: ds.cloneWithRows(snippets.length === 0 ? [''] : snippets),
      currentSort: SORT_CONSTANT.RECENT
    };
  }

  static propTypes = {
    viewOthers: PropTypes.bool,
    handleSwitch: PropTypes.func,
    prevScene: PropTypes.string,
    bookInfo: PropTypes.any
  };

  handleBtnViewOther() {
    this.props.handleSwitch();
  }

  renderHeader() {
    const { prevScene, bookInfo } = this.props;
    const { MY_LIBRARY, SAVED, RECOMMENDED } = SCENE_CONSTANT;
    return (
      <View style={[Styles.detailViewHeaderContainer,
        {justifyContent: (prevScene === MY_LIBRARY) ? 'flex-start' : 'space-between'}]}>
        <TouchableOpacity
          style={Styles.detailViewHeaderBtnContainer}
          onPress={() => Actions.pop()}
          activeOpacity={0.9}
        >
          <Image
            style={{height: 27, width: 15}}
            source={imgBack}
          />
        </TouchableOpacity>
        {(prevScene === MY_LIBRARY) ? null :
          <TouchableOpacity
            style={Styles.detailViewHeaderBtnContainer}
            onPress={() => {
              if (prevScene === RECOMMENDED) {
                save(bookInfo.title, bookInfo.isbn);
              }
            }}
            activeOpacity={0.9}
          >
            <Image
              style={{height: 27, width: 19}}
              source={(this.props.bookInfo.isSaved) ? imgBookmarked : imgUnBookmarked}
            />
          </TouchableOpacity>
        }
      </View>
    );
  }

  renderTop() {
    return (
      <View style={[Styles.detailViewTopContainer, {backgroundColor: !(this.props.viewOthers) ? '#605C56' : '#fff'}]}>
          <View style={Styles.detailViewTopTextContainer}>
          <View style={{flex: 153}}>
            <Text style={[Styles.textDetailViewTopTitle, {color: !(this.props.viewOthers) ? '#fff' : '#000'}]}>
              {this.props.bookInfo.title}
            </Text>
            <Text style={[Styles.textDetailViewTopInfo, {color: !(this.props.viewOthers) ? '#e1e1e1' : '#484848'}]}>
              by {this.props.bookInfo.author}
            </Text>
            <Text style={[Styles.textDetailViewTopInfo, {color: !(this.props.viewOthers) ? '#e1e1e1' : '#484848'}]}>
              ({this.props.bookInfo.publishedDate ? this.props.bookInfo.publishedDate.substring(0,4) : ''})
            </Text>
          </View>
          <View style={Styles.detailViewTopRightCntContainer}>
            {(this.props.viewOthers) ? null :
              <View style={Styles.detailViewTopRightCntBox}>
                <Text style={Styles.textDetailViewTopRightCnt}>11</Text>
              </View>}
          </View>
        </View>
      </View>
    );
  }

  renderBook() {
    return (
      this.props.bookInfo.thumbnail ?
        <Image
          style={Styles.detailViewBookContainer}
          source={{uri: this.props.bookInfo.thumbnail}}/> :
        <View style={Styles.detailViewBookContainer}/>
    );
  }
  
  handleOnPressContentsTransition(data) {
    Actions.expanded({data: data, viewOthers: this.props.viewOthers});
  }
  
  renderRow(rowData) {
    if (rowData === '') {
      return (
        <View style={{flex: 1}}>
          <View style={Styles.detailViewSnippetContainerWithOutSnippet}>
            <Text style={Styles.textDetailViewSnippetSlideWithOutSnippets}>
              No snippet yet.{'\n'}
              What about adding your own snippets?
            </Text>
          </View>
          <View style={{position: 'absolute', bottom: 72, right: 24}}>
            <Footer />
          </View>
        </View>
      );
    }
    else if (!this.props.viewOthers) {
      let prefix = [];
      Object.keys(rowData).forEach((key) => {
        if (rowData[key].previous === undefined) {
          prefix.push(key);
        }
      });
      let sentence = prefix[0];
      let idx = 0;
      let renderText = [];
  
      // TODO: Need to iterate prefix array.
      while (rowData[sentence].next !== undefined) {
        renderText[idx] = {
          fontWeight: this.calculateWeight(rowData[sentence].count),
          text: sentence,
        };
        sentence = rowData[sentence].next;
        idx++;
      }
      renderText[idx] = {
        fontWeight: this.calculateWeight(rowData[sentence].count),
        text: sentence,
      };
      return (
        <View style={Styles.detailViewSnippetContainer}>
          <View style={Styles.detailViewSnippetSlideContainer}>
            <Text
              numberOfLines={5}
              onPress={() => this.handleOnPressContentsTransition(rowData)}
              ellipsizeMode='tail'>
              {renderText.map((arr) =>
                <Text
                  style={[Styles.textDetailViewSnippetSlide, {fontWeight: (arr.fontWeight)}]}>
                  {arr.text}{'. '}
                </Text>
              )}
            </Text>
          </View>
          <View style={Styles.detailViewBottom}>
            <Text style={Styles.textSnippetSlidePageNum}>P.102</Text>
            <View
              style={{borderBottomWidth: 1, borderColor: 'red', marginBottom: 6, marginRight: 20, marginLeft: 20}}/>
          </View>
        </View>
      );
    } else {
      return (
        <View style={Styles.detailViewSnippetContainer}>
          <View style={Styles.detailViewSnippetSlideContainer}>
            <View style={Styles.detailViewSnippetDateContainer}>
              <Text style={Styles.textDetailViewSnippetDate}>date</Text>
            </View>
            <Text
              numberOfLines={5}
              onPress={() => this.handleOnPressContentsTransition(rowData)}
              ellipsizeMode='tail'
              style={Styles.textDetailViewSnippetSlide}>
              {rowData.contents}
            </Text>
          </View>
          <View style={Styles.detailViewBottom}>
            <Text style={Styles.textSnippetSlidePageNum}>p.{rowData.page}</Text>
            <View style={Styles.borderBottomLine}/>
            <View style={{marginBottom: 20, marginLeft: 20}}>
              <Image
                source={require('./../../resources/originalImg.png')}
              />
            </View>
          </View>
        </View>
      );
    }
  }
  
  calculateWeight(count) {
    const weight = [
      '100', '200', '300', '400', '500', '600', '700', '800', '900'
    ];
    return (count > weight.length ? weight[weight.length - 1] : weight[count - 1]);
  }

  renderBottom() {
    return (
      <View style={Styles.detailViewBottomContainer}>
        <View style={Styles.detailViewBottomTopContainer}>
          <View style={{flex: 147}}>
            <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'flex-end'}}
              onPress={this.handleBtnViewOther.bind(this)}
            >
              {(this.props.viewOthers) ?
                <Text style={Styles.textDetailViewVisit}>
                  Visit Other's snippets
                </Text> : (this.props.bookInfo.isSaved) ?
                <Text style={Styles.textDetailViewVisit}>
                  Go to my snippets
                </Text> : null}
              {(this.props.bookInfo.isSaved) ?
                <Image
                  style={Styles.detailViewImgJump}
                  source={imgJump}
                /> : null}
            </TouchableOpacity>
            {!(this.props.viewOthers) ? null :
              <View style={Styles.detailViewImgMediaShownContainer}>
                <Image
                  style={{height: 18, width: 18, opacity: 0.4}}
                  source={imgMediaShown}/>
              </View>
            }
          </View>
          <View style={{flex: 24}}/>
        </View>
        <View style={Styles.detailViewBottomBottomContainer}>
          {!(this.props.viewOthers) ?
            <ListView
              dataSource={this.state.dataSourceOtherSnippets}
              renderRow={this.renderRow.bind(this)}
              style={Styles.detailViewListView}
              contentContainerStyle={{alignItems: 'center'}}
              horizontal
            /> :
            <ListView
              dataSource={this.state.dataSourceMySnippets}
              renderRow={this.renderRow.bind(this)}
              style={Styles.detailViewListView}
              contentContainerStyle={{alignItems: 'center'}}
              horizontal
            />
          }
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: !(this.props.viewOthers) ? '#605C56' : '#fff'}}>
        {this.renderHeader()}
        <View style={Styles.detailViewMarginTop}/>
        {this.renderTop()}
        {this.renderBook()}
        {this.renderBottom()}
      </View>
    );
  }
}
