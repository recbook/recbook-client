import Relay from 'react-relay';

export default class UnSaveMutation extends Relay.Mutation {
  static initialVariables = {
    input: null
  };

  getMutation() {
    return Relay.QL`
        mutation {
            unsaveBook
        }
    `;
  }

  getVariables() {
    return {
      book: this.props.input.book
    };
  }

  getFatQuery() {
    return Relay.QL`
        fragment on unsaveBookPayload {
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
          fragment on unsaveBookPayload {
              user{
                  id
              }
          }
      `]
    }];
  }
}

export function unsave(book) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new UnSaveMutation({
      input: {
        book
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
