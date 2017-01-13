import {
  Dimensions,
  StyleSheet
} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  myLibraryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: HEIGHT * 0.03
  },
  row: {
    flexDirection: 'column',
    borderRadius: 7,
    height: HEIGHT * 0.477
  },
  myLibraryBox: {
    height: HEIGHT * 0.477,
    width: WIDTH * 0.433,
    position: 'absolute'
  },
  book: {
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

export const generateRandomColor = () => {
  // eslint-disable-next-line
  return '#' + (function co(lor){ return (lor +=
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
    && (lor.length === 6) ? lor : co(lor); })('');
};

export default styles;
