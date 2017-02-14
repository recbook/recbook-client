import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Relay from 'react-relay';
import LibraryView from './libraryView';
import { SCENE_CONSTANT } from './../../app';

export class Saved extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <LibraryView
          libraryList={this.props.user.savedBooks.edges}
          prevScene={SCENE_CONSTANT.SAVED}
        />
      </View>
    );
  }
}

export default Relay.createContainer(Saved, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    user: () => {
      return Relay.QL `
          fragment on User {
              savedBooks(first: 10) {
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
                          isSaved
                      }
                  }
              }
          }
      `;
    }
  }
});
