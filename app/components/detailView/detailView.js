import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles from './styles';
import { save } from './../../mutations/save';

import imgJump from './../../resources/jump.png';
import imgMediaShown from './../../resources/media shown.png';
import imgBack from './../../resources/backDetail.png';
import imgDropdown from './../../resources/dropdown.png';
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
    this.state = {
      dataSource: ds.cloneWithRows(pages === null ? [''] : pages),
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
            {!(this.props.viewOthers) ? null :
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
  
  renderRow(rowData) {
    if (rowData === '') {
      return (
        <View>
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
        fontSize: 22*(rowData[sentence].count/2),
        text: sentence,
      };
      sentence = rowData[sentence].next;
      idx++;
    }
    renderText[idx] = {
      fontSize: 22*rowData[sentence].count,
      text: sentence,
    };
    return (
      <View style={Styles.detailViewSnippetContainer}>
        <View style={Styles.detailViewSnippetDateContainer}>
          {(this.props.viewOthers) ?
            <Text style={Styles.textDetailViewSnippetDate}>26 Oct 2016</Text> : null}
        </View>
        <View style={Styles.detailViewSnippetSlideContainer}>
          <Text style={Styles.textDetailViewSnippetSlide}>
            {renderText.map((arr) => arr.text + ". ")}
          </Text>
        </View>
        <View style={Styles.detailViewBottom}>
          <View style={{alignItems: 'flex-end', marginBottom: 12, marginRight: 20}}>
            <Text style={Styles.textSnippetSlidePageNum}>P.102</Text>
          </View>
          <View
            style={{borderBottomWidth: 1, borderColor: '#dadada', marginBottom: 6, marginRight: 20, marginLeft: 20}}/>
          {(this.props.viewOthers) ?
            <View style={{marginBottom: 20, marginLeft: 20}}>
              <Image
                source={require('./../../resources/originalImg.png')}
              />
            </View> : null}
        </View>
      </View>
    );
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
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            style={Styles.detailViewListView}
            contentContainerStyle={{alignItems: 'center'}}
            horizontal
          />
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
