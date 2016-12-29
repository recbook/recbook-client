import React, { Component } from 'react';
import Relay from 'react-relay';
import {
  Text,
  View
} from 'react-native';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
};

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.name}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

export default Relay.createContainer(Home, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    Users: () => {
      return Relay.QL `
          fragment on User {
              _id,
              email,
              name,
              createdAt
          }
      `;
    }
  }
});
