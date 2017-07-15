import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles from './styles';
import Footer from '../../footer'

import imgDefaultProfile from '../../resources/default.png';

class MyPageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isDrawerOpen: nextProps.isOpen});

    if (nextProps.isOpen) {
      StatusBar.setHidden(true);
    } else {
      StatusBar.setHidden(false);
    }
  }

  signOut() {
    AsyncStorage.removeItem('currentUser', () => {
      Actions.refresh({key: this.props.navigationState.key, open: false});
      Actions.first();
    });
  }

  render() {
    return (
        <View style={Styles.container}>
          <View style={Styles.profileContainer}>
            <Image
              style={Styles.profileImage}
              source={imgDefaultProfile}
            />
            <Text style={Styles.userName}>Dan Kim</Text>
          </View>
          <TouchableOpacity style={Styles.contentsRow}>
            <View style={Styles.trashContainer}>
              <Text style={Styles.subjectName}>Trash</Text>
              <View style={Styles.arrowContainer}>
                <Text style={Styles.arrowText}>{">"}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.contentsRow}>
            <View style={Styles.backupContainer}>
              <Text style={Styles.subjectName}>Backup with</Text>
              <View style={Styles.arrowContainer}>
                <Text style={Styles.arrowText}>{">"}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.contentsRow}>
            <View style={Styles.themeContainer}>
              <Text style={Styles.subjectName}>Color Theme</Text>
              <View style={Styles.arrowContainer}>
                <Text style={Styles.arrowText}>{">"}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.contentsRow}>
            <View style={Styles.reminderContainer}>
              <Text style={Styles.subjectName}>Receive Reminder Emails</Text>
              <View style={Styles.arrowContainer}>
                <Switch
                  onTintColor="#C4C4C4"
                  thumbTintColor="#FFFFFF"
                  tintColor="#C4C4C4"
                  style={Styles.switchButton}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={Styles.signOutRow}>
            <View style={Styles.signOutContainer}>
              <TouchableOpacity
                onPress={() => this.signOut()}>
                <Text style={Styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Footer isOpen={this.state.isDrawerOpen}/>
        </View>
    );
  }
}

export default MyPageContent;
