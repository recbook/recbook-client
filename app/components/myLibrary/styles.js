import {
  Dimensions,
  StyleSheet
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: HEIGHT * 0.03,
  },
  empty: {
    height: 229,
    width: 229,
    left: WIDTH * 0.5 - 114.5,
    top: HEIGHT * 220 / 667 - 114.5,
  },
  row: {
    flexDirection: 'column',
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
    width: WIDTH * 0.433
  },
  bookContainer: {
    marginTop: HEIGHT * 0.0195,
    marginBottom: HEIGHT * 0.0178 - 2,
    height: HEIGHT * 0.3,
    width: WIDTH * 0.368,
    borderRadius: 7,
    alignSelf: 'center',
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
    borderRadius: 7,
    alignSelf: 'center'
  },
  textBookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#282828',
    flex: 4,
    lineHeight: 20
  },
  textBookInfo: {
    color: '#6f6f6f',
    fontSize: 12,
    lineHeight: 13
  },
  textContainerTitle: {
    marginLeft: WIDTH * 0.0326,
    marginRight: 10,
    height: HEIGHT * 0.0628,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  }
});

export default styles;
