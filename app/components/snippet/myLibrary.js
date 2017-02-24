import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Relay from 'react-relay';
import Snippet from './snippet';

export class MyLibrary extends Component {
  static propTypes = {
    user: PropTypes.object
  };
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Snippet
          libraryList={this.props.user.myLibraryBooks.edges}
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
                          isbn
                          thumbnail
                          publisher
                          publishedDate
                          snippets
                          isSaved
                          mySnippets {
                              id
                              contents
                              page
                              createdDate
                          }
                      }
                  }
              }
          }
      `;
    }
  }
});
