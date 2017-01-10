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
    paddingLeft: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 10
  },
  detailViewMarginTop: {
    height: HEADER_HEIGHT + STATUSBAR_HEIGHT
  },
  detailViewTopContainer: {
    height: HEIGHT * 132 / 667,
    backgroundColor: '#fff'
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
    height: HEIGHT * 165 / 667,
    width: WIDTH * 112 / 376,
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
    borderRadius: 7,
    backgroundColor: '#fff'
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
  detailViewImgMediaShownContainer: {
    flex: 1,
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
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 4,
    flexDirection: 'column'
  },
  detailViewSnippetDateContainer: {
    height: HEIGHT * 37 / 667,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: WIDTH * 20 / 376
  },
  detailViewSnippetSlideContainer: {
    paddingTop: 20,
    paddingRight: 19,
    marginLeft: 19
  },
  textDetailViewTopTitle: {
    fontSize: 28,
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
  textDetailViewVisitOtherSnippets: {
    fontSize: 14,
    fontFamily: 'Calibri',
    color: '#F2C94C',
    paddingTop: 20,
    marginRight: 5
  },
  textDetailViewSnippetDate: {
    fontSize: 14,
    fontFamily: 'Calibri',
    color: '#929292'
  },
  textDetailViewSnippetSlide: {
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
