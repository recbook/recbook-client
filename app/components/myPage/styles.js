import {
  Dimensions,
  StyleSheet
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#585550',
    flexDirection: 'column'
  },
  profileContainer: {
    marginTop: HEIGHT * 0.067,
    paddingBottom: 40,
    backgroundColor: '#585550',
    paddingLeft: WIDTH * 0.064
  },
  profileImage: {
    backgroundColor: '#C4C4C4',
    width: HEIGHT * 0.114,
    height: HEIGHT * 0.114,
    borderRadius: HEIGHT * 0.114 / 2
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Calibri',
    color: '#FFFFFF',
    marginTop: HEIGHT * 0.02
  },
  subjectName: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'Calibri'
  },
  trashContainer: {
    backgroundColor: '#605C56',
    flexDirection: 'row'
  },
  backupContainer: {
    backgroundColor: '#605C56',
    flexDirection: 'row'
  },
  themeContainer: {
    backgroundColor: '#605C56',
    flexDirection: 'row'
  },
  reminderContainer: {
    backgroundColor: '#605C56',
    flexDirection: 'row'
  },
  switchButton: {
    marginLeft: 70,
    alignSelf: 'center'
  },
  signOutContainer: {
    backgroundColor: '#605C56',
    flexDirection: 'row'
  },
  signOutText: {
    color: '#F2C94C',
    fontSize: 16,
    fontFamily: 'Calibri',
    marginTop: HEIGHT * 0.04
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  arrowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Calibri'
  },
  contentsRow: {
    backgroundColor: '#605C56',
    height: HEIGHT * 0.097,
    borderBottomWidth: 1,
    borderColor: '#585550',
    paddingLeft: WIDTH * 0.064,
    paddingRight: WIDTH * 0.085,
    justifyContent: 'center'
  },
  signOutRow: {
    flex: 1,
    backgroundColor: '#605C56',
    borderBottomWidth: 1,
    borderColor: '#585550',
    paddingLeft: WIDTH * 0.064
  }
});

export default styles;
