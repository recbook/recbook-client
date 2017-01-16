import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Relay from 'react-relay';
import LibraryView from './libraryView';

export class Recommended extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <LibraryView libraryList={this.props.user.recommendedBooks.edges}/>
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
              recommendedBooks(first: 10) {
                  edges{
                      node {
                          id
                          title
                          author
                          publishedAt
                      }
                  }
              }
          }
      `;
    }
  }
});
