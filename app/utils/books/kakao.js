import Rx from 'rx';
import Config from '../../../local.config.json';
import querystring from 'querystring';

const KAKAO_BOOKS_API = {
  URL: 'https://apis.daum.net/search/book',
  API_KEY: Config.KAKAO_API_KEY,
  NO_RESULT_ERR: 'NO_RESULT_ERROR: no results.'
};

/*
 sort: popular, accu, date
 result: 1 ~ 20 ( 10 by default )
 pageno: 1 ~ 3  ( 1 by default )
 searchType: all, title, isbn, keyword, contents, overview, publisher ( all by default )
*/

export const OPTIONS_KEY = {
  SORT: 'sort',
  RESULT: 'result',
  PAGE_NO: 'pageno',
  SEARCH_TYPE: 'searchType'
};

export default class KakaoBookAPIUtil {

  /*
   https://developers.google.com/books/docs/v1/reference/volumes/list

   @Return Array[JSON]

   {
     pageInfo: {
       totalSize: String,   // totalSize can be changed, even if you search same text.
       pageNo: Number,
       hasNext: Boolean
     },
     bookList: [{
       title: String,          // '아프니까 청춘이긴'
       author: String,         // '저자1, 저자2'
       publishedDate: String,  // '20170113'
       // optional
       publisher: String,      // '우리책출판사'
       category: String,       // 'Health, Fiction'
       isbn: String,           // '1234567891234'
       thumbnail: String       // 'http://thumbnailurl'
     }]
   }
   */
  static searchBooks(keyword, options = {}) {
    const { sort = 'accu', result = 20, pageNo = 1, searchType = 'all' } = options;

    const query = {
      q: keyword.replace(/\s/g, '+'),
      sort,
      result,
      pageno: pageNo,
      searchType,
      apiKey: KAKAO_BOOKS_API.API_KEY,
      output: 'json'
    };
    const address = `${KAKAO_BOOKS_API.URL}?${querystring.stringify(query)}`;

    return fetch(address, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw Error(response.json());
        }
        console.log('kakao search');
        return response.json();
      })
      .then(obj => KakaoBookAPIUtil.responseParser(obj, pageNo, result))
      .catch((err) => {
        console.log(err);
        throw Error(KAKAO_BOOKS_API.NO_RESULT_ERR);
      });
  }

  static searchBook$(keyword, options = {}){
    return Rx.Observable.fromPromise(KakaoBookAPIUtil.searchBooks(keyword, options).then(data => data.bookList))
    /*
      @FYI If you want to get book info one by one with stream, use this one.
      return Rx.Observable.fromPromise(KakaoBookAPIUtil.searchBooks(keyword, options).then(data => data.bookList))
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
  static asyncSearchAllBooks(keyword) {
    const pageNoArr = [1];

    return new Promise((resolve) => {
      resolve(pageNoArr.map(pageNo => {
        return KakaoBookAPIUtil.searchBooks(keyword, {pageNo})
          .then(data => data.bookList)
          .then(list => {
            return list.filter(data2 => data2.isbn);
          })
      }));
    });
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
    let pageNo = 1;
    let bookList = [];
    bookList.push([]);
    while (hasNext) {
      const result = await KakaoBookAPIUtil.searchBooks(keyword, {pageNo});
      bookList.push(result.bookList);
      pageNo = result.pageInfo.pageNo + 1;
      hasNext = result.pageInfo.hasNext;
    }
    return bookList.reduce((prev, next) => prev.concat(next));
  }

  static responseParser(res, pageNo, result) {
    const searchResult = {};
    searchResult.pageInfo = KakaoBookAPIUtil.pageParser(res, pageNo, result);
    searchResult.bookList = KakaoBookAPIUtil.bookListParser(res);
    return searchResult;
  }

  static bookListParser(data) {
    if (data.channel.item.length === 0) return [];
    return data.channel.item.map(KakaoBookAPIUtil.bookParser).filter(data => data.isbn);
  }

  static bookParser(item) {
    /*
     example of part of response item from kakao api
     {
     "author": String,     // "진중권 김기승 외 1 명"m
     "cover_l_url": String,// "http70111090716"
     "pub_date": String,   // "20161204"
     "title": String,      // "&lt;b&gt;성경&lt;/b&gt;"
     "category": String,   // "종교 "
     "pub_nm": String,     // "그라티아"
     "isbn13": String,     // "9791187678014"
     }
     */
    const book = {};
    if (item.title && item.title !== '') book.title = KakaoBookAPIUtil.removeTag(item.title);
    if (item.author && item.author !== '') book.author = KakaoBookAPIUtil.removeTag(item.author);
    if (item.pub_nm && item.pub_nm !== '') book.publisher = KakaoBookAPIUtil.removeTag(item.pub_nm);
    if (item.pub_date && item.pub_date !== '') book.publishedDate = item.pub_date;
    if (item.category && item.category !== '') book.category = KakaoBookAPIUtil.removeTag(item.category);
    if (item.isbn13 && item.isbn13 !== '') book.isbn = KakaoBookAPIUtil.removeTag(item.isbn13);
    if (item.cover_s_url && item.cover_s_url !== '') book.thumbnail = item.cover_s_url.replace('http','https');
    if (item.cover_l_url && item.cover_l_url !== '') book.thumbnail = item.cover_l_url.replace('http','https');

    return book;
  }

  static removeTag(str) {
    return str.replace(/&lt;b&gt;/g, '').replace(/&lt;\/b&gt;/g, '');
  }


  static pageParser(data, pageNo, result) {

    if(data.channel.item.length === 0) {
      return {
        totalSize: data.channel.totalCount,
        pageNo,
        hasNext: false,
        hasPrev: false
      };
    }

    const totalSize = data.channel.totalCount;

    // @Warning hasNext is only valid, when the result value is a constant while searching all the results.
    const pageInfo = {
      totalSize,
      pageNo,
      hasNext: totalSize > (pageNo - 1) * result + Number.parseInt(data.channel.result) && pageNo < 3
    };
    return pageInfo;
  }
}
