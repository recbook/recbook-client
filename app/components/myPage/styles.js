import {
  Dimensions,
  StyleSheet
} from 'react-native';

const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    flexDirection: 'column'
  },
  profileContainer: {
    marginTop: HEIGHT * 0.067,
    borderBottomWidth: 2,
    borderColor: '#e7e7e7',
    paddingBottom: 40
  },
  profileImage: {
    backgroundColor: '#C4C4C4',
    width: HEIGHT * 0.114,
    height: HEIGHT * 0.114,
    borderRadius: HEIGHT * 0.114 / 2,
    alignSelf: 'center'
  },
  userName: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop: HEIGHT * 0.02
  },
  nickName: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: HEIGHT * 0.007
  },
  subjectName: {
    color: '#000000',
    fontSize: 16,
    alignSelf: 'center'
  },
  themeContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#e7e7e7',
    paddingBottom: 20,
    marginTop: 20,
    paddingLeft: 30
  },
  reminderContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#e7e7e7',
    paddingBottom: 20,
    paddingLeft: 30,
    marginTop: 20
  },
  switchButton: {
    marginLeft: 40,
    alignSelf: 'center'
  }
});

export default styles;
