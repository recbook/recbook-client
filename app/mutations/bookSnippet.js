import Relay from 'react-relay';

export default class CreateBookSnippetMutation extends Relay.Mutation {
  static initialVariables = {
    input: null
  };

  getMutation() {
    return Relay.QL`
        mutation {
            createBookSnippet
        }
    `;
  }

  getVariables() {
    return {
      title: this.props.input.title,
      isbn: this.props.input.isbn,
      author: this.props.input.author,
      category: this.props.input.author,
      thumbnail: this.props.input.thumbnail,
      publisher: this.props.input.publisher,
      publishedDate: this.props.input.publishedDate,
      page: this.props.input.page,
      contents: this.props.input.contents
    };
  }

  getFatQuery() {
    return Relay.QL`
        fragment on createBookSnippetPayload {
            success,
            bookId
        }
    `;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL `
          fragment on createBookSnippetPayload {
              success,
              bookId
          }
      `]
    }];
  }
}

export function createBookSnippet({title, isbn, author, category, thumbnail, publisher, publishedDate, page, contents}) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new CreateBookSnippetMutation({
      input: {
        title,
        isbn,
        author,
        category,
        thumbnail,
        publisher,
        publishedDate,
        page,
        contents
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
