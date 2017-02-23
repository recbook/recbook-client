import Relay from 'react-relay';

export default class CreateSnippetMutation extends Relay.Mutation {
  static initialVariables = {
    input: null
  };

  getMutation() {
    return Relay.QL`
        mutation {
            createSnippet
        }
    `;
  }

  getVariables() {
    return {
      book: this.props.input.book,
      contents: this.props.input.contents,
      page: this.props.input.page,
      imageUrl: this.props.input.imageUrl
    };
  }

  getFatQuery() {
    return Relay.QL`
        fragment on createSnippetPayload {
            user {
                email
            }
        }
    `;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL `
          fragment on createSnippetPayload {
              user {
                  email
              }
          }
      `]
    }];
  }
}

export function createSnippet({book, contents, page, imageUrl}) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new CreateSnippetMutation({
      input: {
        book,
        contents,
        page,
        imageUrl
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
