import {
  Dimensions,
  StyleSheet
} from 'react-native';
import { HEADER_HEIGHT, STATUSBAR_HEIGHT } from './../../shared/styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  detailViewHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: HEIGHT * 74 / 667 + 20,
    width: WIDTH,
    alignItems: 'center',
    zIndex: 10,
    flexDirection: 'row'
  },
  detailViewHeaderBtnContainer: {
    paddingLeft: 24,
    paddingRight: 24
  },
  detailViewMarginTop: {
    height: HEADER_HEIGHT + STATUSBAR_HEIGHT
  },
  detailViewTopContainer: {
    height: HEIGHT * 132 / 667,
    backgroundColor: '#fff'
  },
  detailViewBottom: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 20,
    width: WIDTH * 320 / 376,
    height: HEIGHT * 80 / 667,
    marginBottom: HEIGHT * 40 / 667
  },
  detailViewBottomContainer: {
    height: HEIGHT * (667 - 201) / 667,
    backgroundColor: '#605C56'
  },
  detailViewBottomTopContainer: {
    height: HEIGHT * 84 / 667,
    flexDirection: 'row'
  },
  detailViewBottomBottomContainer: {
    height: HEIGHT * 377 / 667
  },
  detailViewBookContainer: {
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    },
    zIndex: 5,
    position: 'absolute',
    top: HEADER_HEIGHT + STATUSBAR_HEIGHT,
    marginTop: 0.5,
    left: WIDTH * 38 / 376,
    borderRadius: 7
  },
  book: {
    height: HEIGHT * 165 / 667,
    width: WIDTH * 112 / 376,
    borderRadius: 7,
    alignSelf: 'center'
  },
  detailViewTopTextContainer: {
    backgroundColor: 'transparent',
    left: WIDTH * (38 + 14 + 112) / 376,
    width: WIDTH * 186 / 376,
    position: 'absolute',
    flexDirection: 'row'
  },
  detailViewTopRightCntContainer: {
    flex: 33,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  detailViewTopRightCntBox: {
    width: 20,
    height: 20,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  detailViewImgJump: {
    top: 19,
    height: 16,
    width: 16,
    left: WIDTH * 24 / 376
  },
  detailViewImgMediaShownContainer: {
    flex: 1,
    left: WIDTH * 24 / 376,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  detailViewListView: {
    top: HEIGHT * 20 / 667,
    paddingLeft: WIDTH * 24 / 376
  },
  detailViewSnippetContainer: {
    height: HEIGHT * 359 / 667,
    width: WIDTH * 328 / 376,
    marginRight: WIDTH * 10 / 376,
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  detailViewSnippetContainerWithOutSnippet: {
    height: HEIGHT * 170 / 376,
    width: WIDTH * 352 / 376,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  detailViewSnippetTouchable: {
    height: HEIGHT * 150 / 376
  },
  detailViewSnippetDateContainer: {
    width: WIDTH * 280 / 375,
    height: HEIGHT * 20 / 667,
    marginRight: WIDTH * 20 / 376
  },
  detailViewSnippetSlideContainer: {
    paddingTop: 20,
    paddingRight: 19,
    marginLeft: 19,
    alignItems: 'flex-start'
  },
  textEmpty: {
    marginBottom: WIDTH * 24 / 375,
    marginLeft: -WIDTH * 14 / 375
  },
  textDetailViewTopTitle: {
    fontSize: 26,
    fontFamily: 'Calibri-bold',
    lineHeight: 21,
    paddingTop: 7
  },
  textDetailViewTopInfo: {
    fontSize: 14,
    fontFamily: 'Calibri'
  },
  textDetailViewTopRightCnt: {
    fontSize: 11,
    fontFamily: 'Calibri',
    color: '#606060',
    marginTop: 1
  },
  textDetailViewVisit: {
    fontSize: 14,
    fontFamily: 'Calibri',
    color: '#F2C94C',
    paddingTop: 20,
    marginRight: 5,
    left: WIDTH * 24 / 376,
  },
  textDetailViewSnippetSlide: {
    fontSize: 22,
    fontFamily: 'Calibri',
    color: '#000'
  },
  textDetailViewSnippetSlideWithOutSnippets: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'Calibri',
    marginLeft: 20
  },
  textSnippetSlide: {
    fontSize: 14,
    fontFamily: 'Calibri',
    color: '#929292',
  },
  borderBottomLine: {
    borderBottomWidth: 1,
    borderColor: '#dadada',
    marginBottom: HEIGHT * 20 / 667,
    marginRight: 30
  },
  original: {
    marginBottom: HEIGHT * 80 / 667
  },
  detailViewDropDown: {
    height: HEIGHT * 0.254,
    width: WIDTH * 0.415,
    position: 'absolute',
    top: HEIGHT * 288 / 667 + 7,
    left: 16,
    flexDirection: 'column',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0.3
    }
  },
  dropDownOuterContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: WIDTH,
    height: HEIGHT
  },
  dropDownContainer: {
    backgroundColor: 'transparent',
    flex: 1
  },
  textDropdown: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    marginLeft: 14,
    color: '#AAAAAA',
    fontWeight: 'bold'
  },
  textDropdownContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  textDropdownInnerContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default styles;
