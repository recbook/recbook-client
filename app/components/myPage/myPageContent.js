import React, { Component } from 'react';
import {
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Styles from './styles';
import Footer from '../../footer'

class MyPageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isDrawerOpen: nextProps.isOpen});
  }

  render(){
    return (
        <View style={Styles.container}>
          <View style={Styles.profileContainer}>
            <Image
                style={Styles.profileImage}
            />
            <Text style={Styles.userName}>Dan Kim</Text>
            <Text style={Styles.nickName}>Bookworm</Text>
          </View>
          <View style={Styles.themeContainer}>
            <Text style={Styles.subjectName}>Color Theme</Text>
            <TouchableOpacity style={{flexDirection: 'column', marginLeft: 20}}>
              <Image style={{backgroundColor: 'yellow', width: 44, height: 44}}/>
              <Text>CLASSIC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'column', marginLeft: 10}}>
              <Image style={{backgroundColor: 'grey', width: 44, height: 44}}/>
              <Text>LIGHT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'column', marginLeft: 20}}>
              <Image style={{backgroundColor: 'red', width: 44, height: 44}}/>
              <Text>DARK</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.reminderContainer}>
            <Text style={Styles.subjectName}>Receive Reminder Emails</Text>
            <Switch style={Styles.switchButton}></Switch>
          </View>
          <Footer isOpen={this.state.isDrawerOpen}/>
        </View>
    );
  }
}

export default MyPageContent;
