import React, { Component, PropTypes } from 'react';
import FlipCard from 'react-native-flip-card';
import DetailView from './detailView';
import { SCENE_CONSTANT } from './../../app';

export default class FlipCardDetailView extends Component {
  constructor() {
    super();
    this.state = {
      flip: false
    };
  }

  static propTypes = {
    prevScene: PropTypes.string
  };

  handleSwitch() {
    this.setState({flip: !this.state.flip});
  }

  render() {
    if (this.props.prevScene === SCENE_CONSTANT.MY_LIBRARY) {
      return (
        <FlipCard
          flip={this.state.flip}
          flipHorizontal={true}
          flipVertical={false}
          friction={10}
          style={{flex: 1, borderWidth: 0}}
          clickable={false}
        >
          <DetailView
            viewSwitch={false}
            prevScene={this.props.prevScene}
            handleSwitch={this.handleSwitch.bind(this)}
          />
          <DetailView
            viewSwitch={true}
            prevScene={this.props.prevScene}
            handleSwitch={this.handleSwitch.bind(this)}
          />
        </FlipCard>
      );
    }
    else if (this.props.prevScene === SCENE_CONSTANT.SAVED) {
      return (
        <DetailView
          viewSwitch={true}
          prevScene={this.props.prevScene}
          handleSwitch={()=>{}}
        />
      )
    }
    else {
      return (
        <DetailView
          viewSwitch={false}
          prevScene={this.props.prevScene}
          handleSwitch={()=>{}}
        />
      )
    }
  }
}
