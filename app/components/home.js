import React, { Component, PropTypes } from 'react';
import {Container, Content, Header, Button, Footer, Text} from 'native-base';
import Relay from 'react-relay';
import RegisterMutation from '../mutations/register';

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

export class Home extends Component {
  static propTypes = {
    Users: PropTypes.Object
  };

  render() {
    return (
        <Container style={styles.container}>
          <Header>
            <Button transparent>My Library</Button>
            <Button transparent>button1</Button>
            <Button transparent>button2</Button>
          </Header>
          <Content>
            <Text style={styles.welcome}>
              {this.props.Users.name}
              </Text>
            <Text style={styles.instructions}>
              Recbook
            </Text>
            <Button onPress={() => register('fffffffddff@gfmail.com', 'fzzzfff', '12a34')}>
              Register
            </Button>
          </Content>
          <Footer>
            <Button transparent>RECBOOK</Button>
            <Button transparent>CAMERA</Button>
          </Footer>
        </Container>
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

