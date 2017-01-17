import React, { Component, PropTypes } from 'react';
import { View, LayoutAnimation } from 'react-native';
import Relay from 'react-relay';
import LibraryView from './libraryView';
import { SCENE_CONSTANT } from './../../app';
import { HEIGHT, WIDTH, generateRandomColor } from './styles';

export class Recommended extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      coordinate: [],
      initialBookColor: []
    };
    const height = HEIGHT * 0.477;
    const width = WIDTH * 0.433;
    for (let i = 0; i < this.props.user.recommendedBooks.edges.length; i = i + 1) {
      this.state.initialBookColor.push(generateRandomColor());
      const left = (i % 2 === 0) ? 0 : width;
      const top = 0.5 * i * height;
      this.state.coordinate.push({left, top});
    }
  }

  sortRows() {
    const immutableList = this.state.coordinate.concat();
    // todo: this is just an example switching around from the first to the fourth
    immutableList[0] = JSON.parse(JSON.stringify(this.state.coordinate[3]));
    immutableList[1] = JSON.parse(JSON.stringify(this.state.coordinate[0]));
    immutableList[2] = JSON.parse(JSON.stringify(this.state.coordinate[1]));
    immutableList[3] = JSON.parse(JSON.stringify(this.state.coordinate[2]));
    LayoutAnimation.easeInEaseOut();
    this.setState({coordinate: immutableList});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <LibraryView
          {...this.state}
          libraryList={this.props.user.recommendedBooks.edges}
          prevScene={SCENE_CONSTANT.RECOMMENDED}
          sortRows={this.sortRows.bind(this)}
        />
      </View>
    );
  }
}

export default Relay.createContainer(Recommended, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    user: () => {
      return Relay.QL `
          fragment on User {
              recommendedBooks(first: 100) {
                  edges{
                      node {
                          id
                          title
                          author
                          isbn
                      }
                  }
              }
          }
      `;
    }
  }
});
