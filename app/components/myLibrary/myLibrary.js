import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Relay from 'react-relay';
import RegisterMutation from '../../mutations/register';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
};

export function register(email, username, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new RegisterMutation({
      input: {
        email: email,
        name: username,
        password: password
      }
    }), {
      onSuccess: (data) => {
        console.log(data);
        // resolve(login(username, password));
      },

      onFailure: (transaction) => {
        console.log(transaction.getError());
        reject(transaction.getError().message);
      }
    });
  });
}

export class MyLibrary extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
        <View style={styles.container}>
          <Text>{this.props.user.name}</Text>
          <Text>Recbook</Text>
          <TouchableOpacity onPress={() => register('fff@gmail.com', 'dankim', '12a34')}>
            <Text>Register</Text>
          </TouchableOpacity>
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
              _id,
              email,
              name,
              createdAt
          }
      `;
    }
  }
});

