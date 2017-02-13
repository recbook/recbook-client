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
import imgSaved from './../../resources/saved.png';
import imgUnSaved from './../../resources/unsaved.png';

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
      dataSource: ds.cloneWithRows(pages === null ? ['row'] : pages),
      modalVisible: false,
      currentSort: SORT_CONSTANT.RECENT
    };
  }

  static propTypes = {
    viewSwitch: PropTypes.bool,
    handleSwitch: PropTypes.func,
    prevScene: PropTypes.string,
    bookInfo: PropTypes.any
  };

  handleBtnViewSwitch() {
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
              style={{height: 27, width: 27}}
              source={(prevScene === SAVED) ? imgSaved : imgUnSaved}
            />
          </TouchableOpacity>
        }
      </View>
    );
  }

  renderTop() {
    return (
      <View style={[Styles.detailViewTopContainer, {backgroundColor: (this.props.viewSwitch) ? '#605C56' : '#fff'}]}>
          <View style={Styles.detailViewTopTextContainer}>
          <View style={{flex: 153}}>
            <Text style={[Styles.textDetailViewTopTitle, {color: (this.props.viewSwitch) ? '#fff' : '#000'}]}>
              {this.props.bookInfo.title}
            </Text>
            <Text style={[Styles.textDetailViewTopInfo, {color: (this.props.viewSwitch) ? '#e1e1e1' : '#484848'}]}>
              by {this.props.bookInfo.author}
            </Text>
            <Text style={[Styles.textDetailViewTopInfo, {color: (this.props.viewSwitch) ? '#e1e1e1' : '#484848'}]}>
              {this.props.bookInfo.publishedDate}
            </Text>
          </View>
          <View style={Styles.detailViewTopRightCntContainer}>
            {(this.props.viewSwitch) ? null :
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
    console.log(rowData);
    let prefix = [];
    Object.keys(rowData).forEach((key) => {
      if (rowData[key].previous === undefined) {
        prefix.push(key);
      }
    });
    let sentence = prefix[0];
    let idx = 0;
    let renderText = [];
    //prefix.forEach((sentence) => {});
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
          <Text style={Styles.textDetailViewSnippetDate}>26 Oct 2016</Text>
        </View>
        <View style={Styles.detailViewSnippetSlideContainer}>
          {renderText.map((arr) =>
            <Text style={{fontSize: arr.fontSize}}>{arr.text}</Text>
          )}
        </View>
        <View style={{alignItems: 'flex-end', marginTop: 12, marginRight: 20}}>
          <Text style={Styles.textSnippetSlidePageNum}>P.102</Text>
        </View>
        <View style={{borderBottomWidth: 1, borderColor: '#dadada', marginTop: 6, marginRight: 20, marginLeft: 20}}/>
        <View style={{marginTop: 20, marginLeft: 20}}>
          <Image
            source={require('./../../resources/originalImg.png')}
          />
        </View>
      </View>
    );
  }

  renderBottom() {
    return (
      <View style={Styles.detailViewBottomContainer}>
        <View style={Styles.detailViewBottomTopContainer}>
          <View style={{flex: 181, flexDirection: 'column', justifyContent: 'flex-end'}}>
            {(this.props.viewSwitch) ? null :
              <View style={{flexDirection: 'row', marginLeft: 24}}>
                <Text style={{fontSize: 14, fontFamily: 'Calibri-Italic', color: '#fff'}}>Sort by</Text>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: !this.state.modalVisible})}
                  activeOpacity={1}
                >
                  <Text style={{fontSize: 14, fontFamily: 'Calibri-bold', color: '#f2c94c', marginLeft: 9}}>
                    {this.state.currentSort}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          </View>
          <View style={{flex: 147}}>
            <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'flex-end'}}
              onPress={this.handleBtnViewSwitch.bind(this)}
            >
              <Text style={Styles.textDetailViewVisitOtherSnippets}>Visit Other's snippets</Text>
              <Image
                style={{top: 19, height: 16, width: 16}}
                source={imgJump}
              />
            </TouchableOpacity>
            {(this.props.viewSwitch) ? null :
              <View style={Styles.detailViewImgMediaShownContainer}>
                <Image
                  style={{height: 18, width: 18}}
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

  // todo: refactor the following dropdown rendering functions which is duplicate from app.js
  renderDropDownText(text, style) {
    return (
      <View style={Styles.textDropdownContainer}>
        <View style={{width: 4}}/>
        <TouchableOpacity
          style={[Styles.textDropdownInnerContainer, (style) ? style : {}]}
          activeOpacity={1}
          onPress={() => this.setState({currentSort: text})}
        >
          <Text style={[Styles.textDropdown, {color: (text === this.state.currentSort) ? '#000' : '#AAA'}]}>{text}</Text>
        </TouchableOpacity>
        <View style={{width: 4}}/>
      </View>
    );
  }

  renderDropDown() {
    return (
      <TouchableOpacity
        style={Styles.dropDownOuterContainer}
        activeOpacity={1}
        onPress={() => {
          this.setState({modalVisible: false});
        }}
      >
        <Image
          style={Styles.detailViewDropDown}
          source={imgDropdown}
          resizeMode={'stretch'}
        >
          <View style={Styles.dropDownContainer}>
            <View style={{flex: 1}}/>
            <View style={{flex: 13, flexDirection: 'column'}}>
              {this.renderDropDownText('Recent', {borderBottomWidth: 1, borderColor: '#e7e7e7'})}
              {this.renderDropDownText('Popular', {borderBottomWidth: 1, borderColor: '#e7e7e7'})}
              {this.renderDropDownText('Saved')}
            </View>
            <View style={{flex: 0.5}}/>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: (this.props.viewSwitch) ? '#605C56' : '#fff'}}>
        {this.renderHeader()}
        <View style={Styles.detailViewMarginTop}/>
        {this.renderTop()}
        {this.renderBook()}
        {this.renderBottom()}
        {(this.state.modalVisible) ? this.renderDropDown() : null}
      </View>
    );
  }
}
