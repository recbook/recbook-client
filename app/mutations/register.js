import Relay from 'react-relay';

export default class RegisterMutation extends Relay.Mutation {
  static initialVariables = {
    input: null
  };

  getMutation() {
    return Relay.QL`
        mutation {
            _createUser
        }
    `;
  }

  getVariables() {
    return {
      email: this.props.input.email,
      name: this.props.input.name,
      password: this.props.input.password
    };
  }

  getFatQuery() {
    return Relay.QL`
        fragment on _createUserPayload {
         user{
             _id
             name
         }
        }
    `;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL `
          fragment on _createUserPayload {
              user{
                  _id
                  name
                  accessToken
                  createdAt
                  email
              }
          }
      `]
    }];
  }
}
