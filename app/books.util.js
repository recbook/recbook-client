import CONFIG from '../local.config.json';

const GOOGLE_BOOKS_API = {
  URL: 'https://www.googleapis.com/books/v1/volumes',
  API_KEY: CONFIG.GOOGLE.API_KEY,
  NO_RESULT_ERR: 'NO_RESULT_ERROR: no results.'
};

export default class BookAPIUtil {

  static responseParser(item) {
    const info = item.volumeInfo;
    const bookInfo = {
      googleBookId: item.id,
      title: info.title,
      authors: info.authors,
      publisher: info.publisher,
      publishedDate: info.publishedDate,
      categories: info.categories
    };
    if (info.industryIdentifiers) {
      info.industryIdentifiers.map(id => {
        if (id.type === 'ISBN_13') {
          bookInfo.isbn13 = id.type;
        }
      });
    }
    if (info.imageLinks) {
      bookInfo.thumbnail = info.imageLinks.thumbnail;
    }
    return bookInfo;
  }

  /*
    https://developers.google.com/books/docs/v1/reference/volumes/list
    Return Type : Array[JSON]
    [
      {
        googleBookId: String,
        title: String,
        authors: Array[String],
        publisher: String,
        publishedDate: String,
        categories: Array[String],
        // optional
        isbn13: String,
        thumbnail: String
      }
    ]
  */

  static searchBooks(keyword) {
    const address = `${GOOGLE_BOOKS_API.URL}?q=${keyword}&key=${GOOGLE_BOOKS_API.API_KEY}`;
    return fetch(address, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw Error(response.json());
        }
        return response.json();
      })
      .then(obj => {
        return obj.items.map(BookAPIUtil.responseParser);
      })
      .catch(() => {
        throw Error(GOOGLE_BOOKS_API.NO_RESULT_ERR);
      });
  }

  /*
    https://developers.google.com/books/docs/v1/reference/volumes/get
    Return Type : JSON
    {
      googleBookId: String,
      title: String,
      authors: Array[String],
      publisher: String,
      publishedDate: String,
      categories: Array[String],
      // optional
      isbn13: String,
      thumbnail: String
    };
  */

  static searchDetail(googleBookId) {
    const address = `${GOOGLE_BOOKS_API.URL}/${googleBookId}`;
    return fetch(address, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw Error(response.json());
        }
        return response.json();
      })
      .then(BookAPIUtil.responseParser)
      .catch(() => {
        throw Error(GOOGLE_BOOKS_API.NO_RESULT_ERR);
      });
  }
}
