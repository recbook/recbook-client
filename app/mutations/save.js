import Relay from 'react-relay';

export default class SaveMutation extends Relay.Mutation {
  static initialVariables = {
    input: null
  };

  getMutation() {
    return Relay.QL`
        mutation {
            saveBook
        }
    `;
  }

  getVariables() {
    return {
      title: this.props.input.title,
      isbn: this.props.input.isbn
    };
  }

  getFatQuery() {
    return Relay.QL`
        fragment on saveBookPayload {
            user{
                id
            }
        }
    `;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL `
          fragment on saveBookPayload {
              user{
                  id
              }
          }
      `]
    }];
  }
}

export function save(title, isbn) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new SaveMutation({
      input: {
        title,
        isbn
      }
    }), {
      onSuccess: (res) => {
        resolve(res);
      },
      onFailure: (transaction) => {
        reject(transaction.getError().message);
      }
    });
  });
}
