import Rx from 'rx';
import Config from '../../../local.config.json';
import querystring from 'querystring';

const GOOGLE_BOOKS_API = {
  URL: 'https://www.googleapis.com/books/v1/volumes',
  API_KEY: Config.GOOGLE_API_KEY,
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

export default class GoogleBookAPIUtil {
  /*
   https://developers.google.com/books/docs/v1/reference/volumes/list

   @Return Array[JSON]

   {
   pageInfo: {
   totalSize: String,   // totalSize can be changed, even if you search same text.
   startIndex: Number,
   lastIndex: Number,
   hasNext: Boolean
   },
   bookList: [
   {
   title: String,          // '아프니까 청춘이긴'
   author: String,         // '저자1, 저자2'
   publishedDate: String,  // '20170113'
   // optional
   publisher: String,      // '우리책출판사'
   category: String,       // 'Health, Fiction'
   isbn: String,           // '1234567891234'
   thumbnail: String       // 'http://thumbnailurl'
   }
   ]
   }
   */
  static searchBooks(keyword, options = {}) {
    const {orderBy = 'relevance', maxResults = 40, startIndex = 0, printType = 'books'} = options;
    const query = {
      q: keyword.replace(/\s/g, '+'),
      orderBy,
      maxResults,
      startIndex,
      printType
    };

    const address = `${GOOGLE_BOOKS_API.URL}?${querystring.stringify(query)}`;
    return fetch(address, {method: 'GET'})
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => { throw Error(JSON.stringify(data))});
        }
        console.log('google search');
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        throw Error(GOOGLE_BOOKS_API.NO_RESULT_ERR);
      })
      .then(obj => GoogleBookAPIUtil.responseParser(obj, startIndex))
      .catch(err => {
        console.log(err);
        throw err;
      })
  }
  static searchBook$(keyword, options = {}){
    return Rx.Observable.fromPromise(GoogleBookAPIUtil.searchBooks(keyword, options).then(data => data.bookList))
    /*
     @FYI If you want to get book info one by one with stream, use this one.
       return Rx.Observable.fromPromise(GoogleBookAPIUtil.searchBooks(keyword, options).then(data => data.bookList))
        .flatMap(Rx.Observable.from)
     */
  }
  /*
   @Return Promise(Array[Promise(Array[JSON])])

   [
   [
   {
   title: String,          // '아프니까 청춘이긴'
   author: String,         // '저자1, 저자2'
   publishedDate: String,  // '20170113'
   // optional
   publisher: String,      // '우리책출판사'
   category: String,       // 'Health, Fiction'
   isbn: String,           // '1234567891234'
   thumbnail: String       // 'http://thumbnailurl'
   }
   ]
   ]
   */
  static async asyncSearchAllBooks(keyword) {
    const firstResult = await GoogleBookAPIUtil.searchBooks(keyword);
    if (!firstResult.pageInfo.hasNext) return [Promise.resolve(firstResult.bookList)];
    const times = (firstResult.pageInfo.totalSize / 40) - 1;
    const startIndexes = [];
    for(let i = 0; i < 1; i++) {
      startIndexes.push(40 * i);
    }
    return startIndexes.map(idx => {
      return GoogleBookAPIUtil.searchBooks(keyword, {startIndex: idx}).then(data => data.bookList)
        .then(list => list.filter(data2 => data2.isbn))
    })
  }

  /*
   @Return Promise(Array[JSON])

   [
   {
   title: String,          // '아프니까 청춘이긴'
   author: String,         // '저자1, 저자2'
   publishedDate: String,  // '20170113'
   // optional
   publisher: String,      // '우리책출판사'
   category: String,       // 'Health, Fiction'
   isbn: String,           // '1234567891234'
   thumbnail: String       // 'http://thumbnailurl'
   }
   ]
   */
  static async searchAllBooks(keyword) {
    let hasNext = true;
    let startIndex = 0;
    let bookList = [];
    bookList.push([]);
    while (hasNext) {
      const result = await GoogleBookAPIUtil.searchBooks(keyword, {startIndex});
      bookList.push(result.bookList);
      startIndex += 40;
      hasNext = result.pageInfo.hasNext;
    }
    return bookList.reduce((prev, next) => prev.concat(next));
  }

  static responseParser(res, startIndex) {
    const searchResult = {};
    searchResult.pageInfo = GoogleBookAPIUtil.pageParser(res, startIndex);
    searchResult.bookList = GoogleBookAPIUtil.bookListParser(res);
    return searchResult;
  }

  static bookListParser(data) {
    if (!data.items) return [];
    return data.items.map(GoogleBookAPIUtil.bookParser).filter(data => data.isbn);
  }

  static bookParser(item) {
    const info = item.volumeInfo;
    const bookInfo = {};

    if (info.title) bookInfo.title = info.title;
    if (info.authors) bookInfo.author = info.authors.reduce((prev, next) => `${prev}, ${next}`);
    if (info.publishedDate) bookInfo.publishedDate = info.publishedDate.replace(/-/g, '');
    // optional properties for now
    if(info.publisher) bookInfo.publisher =info.publisher;
    if (info.categories) {
      bookInfo.category = info.categories.reduce((prev, next) => `${prev}, ${next}`)
    }
    if (info.industryIdentifiers) {
      const isbnArr = info.industryIdentifiers.filter(data => data.type === 'ISBN_13');
      if (isbnArr.length === 1) bookInfo.isbn = isbnArr[0].identifier;
    }
    if (info.imageLinks) {
      bookInfo.thumbnail = info.imageLinks.thumbnail.replace('http','https');
    }
    return bookInfo;
  }

  static pageParser(data, startIndex) {
    if(!data.items) {
      return {
        totalSize: data.totalItems,
        startIndex,
        lastIndex: startIndex,
        hasNext: false
      };
    }
    const lastIndex = startIndex + data.items.length - 1;
    const totalSize = data.totalItems;
    // @Warning totalSize can be different even if you search same text.
    const pageInfo = {
      totalSize,
      startIndex,
      lastIndex,
      hasNext: totalSize > lastIndex + 1
    };
    return pageInfo;
  }
}
