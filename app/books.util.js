import CONFIG from '../local.config.json';

const GOOGLE_BOOKS_API = {
  URL: 'https://www.googleapis.com/books/v1/volumes',
  API_KEY: CONFIG.GOOGLE.API_KEY,
  NO_RESULT_ERR: 'NO_RESULT_ERROR: no results.'
};

/*
  ORDER_BY: newest, relevance
  MAX_RESULTS: 0 ~ 40
  START_INDEX: starts at 0
  PRINT_TYPE: all, books, magazines
*/

export const OPTIONS_KEY = {
  ORDER_BY: 'orderBy',
  MAX_RESULTS: 'maxResults',
  START_INDEX: 'startIndex',
  PRINT_TYPE: 'printType'
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
    {
      pageInfo: {
        totalSize: String,   // totalSize can be changed, even if you search same text.
        startIndex: Number,
        lastIndex: Number,
        hasNext: Boolean,
        hasPrev: Boolean
      },
      bookList: [
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
    }
  */

  static searchBooks(keyword, { orderBy = 'relevance', maxResults = 5, startIndex = 0, printType = 'books' }) {
    const options = new Map()
      .set('orderBy', orderBy)
      .set('maxResults', maxResults)
      .set('startIndex', startIndex)
      .set('printType', printType);

    let query = '';
    for (let [key, value] of options) {
      query = query + `&${key}=${value}`;
    }
    const address = `${GOOGLE_BOOKS_API.URL}?q=${keyword}${query}&key=${GOOGLE_BOOKS_API.API_KEY}`;
    return fetch(address, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw Error(response.json());
        }
        return response.json();
      })
      .then(obj => {
        const searchResult = {};

        if (obj.items.length === 0) {
          searchResult.pageInfo = {
            totalSize: obj.totalItems,
            startIndex,
            lastIndex: 0,
            hasNext: false,
            hasPrev: false
          };
          searchResult.bookList = [];
          return searchResult;
        }

        const lastIndex = obj.items.length === 0 ? 0 : startIndex + obj.items.length - 1;
        const totalSize = obj.totalItems;
        // @Warning totalSize can be different even if you search same text.
        searchResult.pageInfo = {
          totalSize,
          startIndex,
          lastIndex,
          hasNext: totalSize > lastIndex + 1,
          hasPrev: startIndex > 0
        };
        const bookList = obj.items.map((item, index) => {
          const book = BookAPIUtil.responseParser(item);
          book.index = startIndex + index;
          return book;
        });
        searchResult.bookList = bookList;
        return searchResult;
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

