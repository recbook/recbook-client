import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Relay from 'react-relay';
import LibraryView from './libraryView';
import { SCENE_CONSTANT } from './../../app';

export class MyLibrary extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <LibraryView
          libraryList={this.props.user.myLibraryBooks.edges}
          prevScene={SCENE_CONSTANT.MY_LIBRARY}
        />
      </View>
    );
  }
}

export default Relay.createContainer(MyLibrary, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    user: () => {
      return Relay.QL `
          fragment on User {
              myLibraryBooks(first: 10) {
                  edges{
                      node {
                          id
                          title
                          author
                          publishedAt
                          isbn
                      }
                  }
              }
          }
      `;
    }
  }
});
