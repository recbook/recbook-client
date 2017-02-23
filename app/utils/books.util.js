import Rx from 'rx';
import GoogleBookAPIUtil from './books/google';
import KakaoBookAPIUtil from './books/kakao';

const BOOK_API_TYPE = {
  GOOGLE: 'google',
  KAKAO: 'kakao'
};

const BOOK_API = {
  [BOOK_API_TYPE.GOOGLE]: GoogleBookAPIUtil,
  [BOOK_API_TYPE.KAKAO]: KakaoBookAPIUtil
};

export default class BookAPIUtil {

  /*
   @Usage
   searchAllBooks('keyword', { options } )

   @Return type Promise([BookInfo])

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
  static searchAllBooks(keyword, options = {}) {
    const { searchingAPI = [BOOK_API_TYPE.KAKAO] } = options;
    return Promise.all(
      searchingAPI
        .map(
          apiType => BOOK_API[apiType].searchAllBooks(keyword)
            .then(data => data.filter(book => book.isbn))
        )
    )
      .then(BookAPIUtil.mergeBooks)
      .catch(console.log);
  }

  /*

  */

  static searchBook$(keyword, options = {}) {
    return Rx.Observable.merge(
      KakaoBookAPIUtil.searchBook$(keyword, options),
      GoogleBookAPIUtil.searchBook$(keyword, options)
    )
  }
  /*
   @Usage
   asyncSearchAllBooks('keyword', (BookInfo) => { // do something }, { searchingAPI : [// apis you want to search]})

   @BookInfo
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

   */
  static asyncSearchAllBooks(keyword, next = {}, options = {}) {
    const { searchingAPI = [BOOK_API_TYPE.GOOGLE, BOOK_API_TYPE.KAKAO] } = options;
    const asyncSearches = searchingAPI.map(apiType => BOOK_API[apiType].asyncSearchAllBooks(keyword));

    if (typeof next !== 'function') {
      return asyncSearches;
    }

    return asyncSearches.map(api => {
      return api.then(searchQueries => {
        return searchQueries.map(searchResult => {
          return searchResult.then(bookList => {
            bookList.map(book => {
              next(book);
            });
          });
        });
      });
    });
  }

  // merge by isbn13
  static mergeBooks(results) {
    const booksIndexs = {};
    const mergedBooks = [];
    results.reduce((prev, next) => prev.concat(next)).map(data => {
      if (!booksIndexs[data.isbn]) {
        mergedBooks.push(data);
        booksIndexs[data.isbn] = true;
      }
    });
    return mergedBooks;
  }
}
