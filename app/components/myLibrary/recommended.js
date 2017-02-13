import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Relay from 'react-relay';
import LibraryView from './libraryView';
import { SCENE_CONSTANT } from './../../app';

export class Recommended extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <LibraryView
          libraryList={this.props.user.recommendedBooks.edges}
          prevScene={SCENE_CONSTANT.RECOMMENDED}
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
                          thumbnail
                          publisher
                          publishedDate
                          snippets
                      }
                  }
              }
          }
      `;
    }
  }
});
