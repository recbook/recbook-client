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

import imgJump from './../../resources/jump.png';
import imgMediaShown from './../../resources/media shown.png';
import imgBack from './../../resources/backDetail.png';

export default class DetailView extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    };
  }

  static propTypes = {
    viewSwitch: PropTypes.bool,
    handleSwitch: PropTypes.func
  };

  handleBtnViewSwitch() {
    this.props.handleSwitch();
  }

  renderHeader() {
    return (
      <View style={Styles.detailViewHeaderContainer}>
        <TouchableOpacity
          onPress={() => Actions.pop()}
          activeOpacity={0.9}
        >
          <Image
            style={{height: 27, width: 15}}
            source={imgBack}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderTop() {
    return (
      <View style={[Styles.detailViewTopContainer, {backgroundColor: (this.props.viewSwitch) ? '#605C56' : '#fff'}]}>
        <View style={Styles.detailViewTopTextContainer}>
          <View style={{flex: 153}}>
            <Text style={[Styles.textDetailViewTopTitle, {color: (this.props.viewSwitch) ? '#fff' : '#000'}]}>
              Danish Architecture
            </Text>
            <Text style={[Styles.textDetailViewTopInfo, {color: (this.props.viewSwitch) ? '#e1e1e1' : '#484848'}]}>
              by Kjeld Kindum, Kristoffer L. Weiss
            </Text>
            <Text style={[Styles.textDetailViewTopInfo, {color: (this.props.viewSwitch) ? '#e1e1e1' : '#484848'}]}>
              1st edition (2012)
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
      <View style={Styles.detailViewBookContainer}/>
    );
  }

  renderRow() {
    return (
      <View style={Styles.detailViewSnippetContainer}>
        <View style={Styles.detailViewSnippetDateContainer}>
          <Text style={Styles.textDetailViewSnippetDate}>26 Oct 2016</Text>
        </View>
        <View style={Styles.detailViewSnippetSlideContainer}>
          <Text style={Styles.textDetailViewSnippetSlide}>
            "A sunflower seed and a solar system are the same thing; they both are whole systems. I find it easier to
            pay attention to the complexities of the smaller than to pay attention to the complexities of the larger.
            That..
          </Text>
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
                <Text style={{fontSize: 14, fontFamily: 'Calibri-bold', color: '#f2c94c', marginLeft: 9}}>Recent</Text>
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
                style={{top: 19}}
                source={imgJump}
              />
            </TouchableOpacity>
            {(this.props.viewSwitch) ? null :
              <View style={Styles.detailViewImgMediaShownContainer}>
                <Image source={imgMediaShown}/>
              </View>
            }
          </View>
          <View style={{flex: 24}}/>
        </View>
        <View style={Styles.detailViewBottomBottomContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
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
      <View style={{flex: 1, backgroundColor: (this.props.viewSwitch) ? '#605C56' : '#fff'}}>
        {this.renderHeader()}
        <View style={Styles.detailViewMarginTop}/>
        {this.renderTop()}
        {this.renderBook()}
        {this.renderBottom()}
      </View>
    );
  }
}
