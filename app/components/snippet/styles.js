import {
  Dimensions,
  StyleSheet
} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  snippetContainer: {
    height: HEIGHT * 395 / 667,
    width: WIDTH * 335 / 375,
    backgroundColor: 'transparent',
    marginBottom: 20
  },
  snippetSlide: {
    height: HEIGHT * 385 / 667,
    width: WIDTH * 327 / 375,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#efefef',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  snippetSlideInnerContainer: {
    flex: 1,
    margin: 20,
    flexDirection: 'column'
  },
  snippetSlideBookThumbnail: {
    backgroundColor: '#fff',
    borderRadius: 2,
    height: 30,
    width: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 0.3
    }
  },
  book: {
    borderRadius: 2,
    height: 30,
    width: 20
  },
  snippet: {
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingRight: 19,
    marginLeft: 19
  },
  snippetSlideTitleContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  snippetSlideCntBox: {
    height: 24,
    width: 24,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  snippetBottom: {
    height: HEIGHT * 80 / 667,
    width: WIDTH * 335 / 375,
    marginLeft: WIDTH * 20 / 375
  },
  snippetBottomComponents: {
    borderBottomWidth: 1,
    borderColor: '#dadada',
    marginTop: HEIGHT * 6 / 667,
    marginRight: WIDTH * 50 / 375
  },
  snippetBottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: WIDTH * 50 / 375
  },
  textSnippetSlideTitle: {
    fontSize: 18,
    fontFamily: 'Calibri-bold',
    color: '#282828',
    top: 3
  },
  textSnippetSlideDate: {
    fontSize: 14,
    fontFamily: 'Calibri',
    color: '#929292'
  },
  textSnippetSlideCnt: {
    fontSize: 13,
    fontFamily: 'Calibri',
    color: '#606060',
    top: 1.5
  },
  textSnippetSlide: {
    fontSize: 22,
    fontFamily: 'Calibri',
    color: '#000'
  },
  textSnippetSlidePageNum: {
    fontSize: 14,
    fontFamily: 'Calibri',
    color: '#929292'
  }
});

export default styles;
