import React, { Component } from 'react';
import FlipCard from 'react-native-flip-card';
import DetailView from './detailView';

export default class FlipCardDetailView extends Component {
  constructor() {
    super();
    this.state = {
      flip: false
    };
  }

  handleSwitch() {
    this.setState({flip: !this.state.flip});
  }

  render() {
    return (
      <FlipCard
        flip={this.state.flip}
        flipHorizontal={true}
        flipVertical={false}
        friction={10}
        style={{flex: 1, borderWidth: 0}}
        clickable={false}
      >
        <DetailView viewSwitch={false} handleSwitch={this.handleSwitch.bind(this)}/>
        <DetailView viewSwitch={true} handleSwitch={this.handleSwitch.bind(this)}/>
      </FlipCard>
    );
  }
}
