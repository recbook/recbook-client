import {
  Dimensions,
  StyleSheet
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    height: HEIGHT * 0.11
  },
  searchBar: {
    height: HEIGHT * 0.068,
    width: WIDTH * 0.85,
    fontSize: 15,
    paddingLeft: 20,
    borderWidth: 3,
    borderColor: '#ececec',
    borderRadius: 7,
    marginTop: 15
  },
  backButton: {
    width: 20,
    height: 20,
    marginTop: 25,
    marginLeft: 15,
    marginRight: 10
  },
  resultContainer: {
    height: HEIGHT * 0.08,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ececec'
  },
  resultText: {
    fontSize: 15,
    fontFamily: 'Calibri',
    marginLeft: WIDTH * 0.065
  }
});

export default styles;
