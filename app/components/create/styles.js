import {
  Dimensions,
  StyleSheet
} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  createInfoContainer:{
    padding: WIDTH * 0.064
  },
  createInfoHeaderContainer: {
    height:50,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  createInfoCancelButton: {
    width: WIDTH * 0.06,
    height: WIDTH * 0.06,
  },
  createInfoSaveButton: {
    color: '#605C56',
    fontSize: 20
  },
  snippetTextContainer: {
    marginTop: WIDTH * 0.027,
    paddingBottom: WIDTH * 0.091,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1
  },
  snippetTextScroll:{
    height: WIDTH * 0.376
  },
  snippetText: {
    fontSize: 20
  },
  tagListContainer: {
    marginBottom: WIDTH * 0.064
  },
  tagContainer: {
    height: WIDTH * 0.1,
    paddingRight:15,
    paddingLeft:15,
    backgroundColor: '#605C56',
    flexDirection:'row',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagText: {
    fontSize:14,
    color: 'white'
  },
  tagCancelButton: {
    marginLeft: 10
  },
  searchContainer: {
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1
  },
  pageNumberContainer: {
    paddingBottom: WIDTH * 0.091
  },
  pageNumberInputContainer: {
    borderRadius: 50,
    borderColor: '#DADADA',
    borderWidth: 1,
    height: WIDTH * 0.1,
    width: WIDTH * 0.184
  },
  pageNumberInput: {
    height: WIDTH * 0.1,
    fontSize:14,
    paddingRight:15,
    paddingLeft:15,
    textAlign: 'right',
    width: WIDTH * 0.184
  },
  createInfoTitle: {
    marginTop: WIDTH * 0.037,
    marginBottom: WIDTH * 0.037,
    color: '#BABABA'
  },
  row: {
    borderRadius: 7,
    height: HEIGHT * 0.477
  },
  leftColumn: {
    paddingBottom: 100,
    marginLeft: WIDTH * 0.064,
    width: WIDTH * 0.433
  },
  rightColumn: {
    paddingTop: HEIGHT * 0.187,
    marginRight: WIDTH * 0.064,
    marginBottom: HEIGHT * 0.0178 - 2,
    width: WIDTH * 0.433
  },
  bookContainer: {
    height: HEIGHT * 0.3,
    width: WIDTH * 0.368,
    marginBottom: WIDTH * 0.064,
    marginRight: WIDTH * 0.064,
    borderRadius: 7,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  book: {
    height: HEIGHT * 0.3,
    width: WIDTH * 0.368,
    marginBottom: WIDTH * 0.064,
    borderRadius: 7,
    alignSelf: 'center'
  },
  textBookTitle: {
    width: WIDTH * 0.350,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#282828',
    lineHeight: 20
  },
  textBookInfo: {
    width: WIDTH * 0.350,
    color: '#6f6f6f',
    fontSize: 12,
    lineHeight: 13
  },
  textContainerTitle: {
    marginLeft: WIDTH * 0.0326,
    marginRight: 10,
  },
  textContainerInfo: {
    marginLeft: WIDTH * 0.0326,
    marginRight: 10,
    marginBottom: HEIGHT * 0.019
  },
  textSnippetCount: {
    alignSelf: 'center',
    fontSize: 13,
    color: '#6f6f6f'
  },
  snippetCountContainer: {
    flex: 1
  },
  snippetCountBox: {
    width: WIDTH * 0.0534,
    height: WIDTH * 0.0534,
    backgroundColor: '#ececec',
    borderRadius: 4,
    justifyContent: 'center',
    right: 0,
    position: 'absolute'
  },
  searchResultContainer: {
    marginBottom: WIDTH * 0.064
  },
  searchResultList:{
    height: HEIGHT * 0.9,
    backgroundColor: '#a3a3a3'
  },
  searchBarInput: {
    height: WIDTH * 0.1,
    fontSize:14,
    paddingRight:15,
    paddingLeft:15
  },
  searchBarContainer: {
    height: WIDTH * 0.1,
    marginBottom: WIDTH * 0.064,
    borderRadius: 50,
    backgroundColor: '#F2C94C'
  }
});

export default styles;
