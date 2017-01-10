import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from './shared/styles';
import Relay from 'react-relay';
import {
  Router,
  Reducer,
  Scene,
  Actions
} from 'react-native-router-flux';
import RelayRenderer from './shared/relayComponentRenderer';
import MyLibrary from './components/myLibrary/myLibrary';
import MyPage from './components/myPage/myPage';

import imgArrowDown from './resources/arrow_down.png';
import imgArrowUp from './resources/arrow_up.png';

// Define reducer to manage scenes
const reducerCreate = (params) => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};

const SCENE_CONSTANT = {
  MY_LIBRARY: 'My Library',
  SAVED: 'Saved',
  RECOMMENDED: 'Recommended'
};

export function setNetworkLayer() {
  let options = {};

  // Access Token
  const authToken = '';
  options.headers = {
    Authorization: authToken
  };
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://52.79.112.162/graphql', options)
  );
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      currentScene: SCENE_CONSTANT.MY_LIBRARY
    };
    this.renderDropDown = this.renderDropDown.bind(this);
  }

  componentDidMount() {
    setNetworkLayer();
  }

  renderDropDownText(text, style) {
    return (
      <View style={Styles.textDropdownContainer}>
        <View style={{width: 4}}/>
        <TouchableOpacity
          style={[Styles.textDropdownInnerContainer, (style) ? style : {}]}
          activeOpacity={1}
          onPress={() => {
            this.setState({currentScene: text});
            Actions.refresh();
          }}
        >
          <Text style={[Styles.textDropdown, {color: (text === this.state.currentScene) ? '#000' : '#AAA'}]}>{text}</Text>
        </TouchableOpacity>
        <View style={{width: 4}}/>
      </View>
    );
  }

  renderDropDown() {
    return (
      <TouchableOpacity
        style={Styles.dropDownOuterContainer}
        activeOpacity={1}
        onPress={() => {
          this.setState({modalVisible: false});
          Actions.refresh();
        }}
      >
        <Image
          style={Styles.dropDown}
          source={require("./resources/dropdown.png")}
          resizeMode={'stretch'}
        >
          <View style={Styles.dropDownContainer}>
            <View style={{flex: 1}}/>
            <View style={{flex: 13, flexDirection: 'column'}}>
              {this.renderDropDownText('My Library', {borderBottomWidth: 1, borderColor: '#e7e7e7'})}
              {this.renderDropDownText('Saved', {borderBottomWidth: 1, borderColor: '#e7e7e7'})}
              {this.renderDropDownText('Recommended')}
            </View>
            <View style={{flex: 0.5}}/>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }

  render() {
    const createNavBarButtons = () => {
      return (
        <View style={Styles.navBarButtonContainer}>
          <TouchableOpacity
            style={Styles.dropDownButtonContainer}
            onPress={() => {
              this.setState({modalVisible: !this.state.modalVisible});
              Actions.refresh();
            }}
          >
            <Text style={Styles.dropDownText}>My Library</Text>
            <Image
              style={Styles.dropDownArrowImage}
              source={(this.state.modalVisible) ? imgArrowUp : imgArrowDown}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.changeButton}>
            <Image
              style={Styles.changeImage}
              source={require("./resources/view change01.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.searchButton}>
            <Image
              style={Styles.searchImage}
              source={require("./resources/search.png")}
            />
          </TouchableOpacity>
          {(this.state.modalVisible) ? this.renderDropDown() : null}
        </View>
      );
    };

    return (
      <Router drawerImage={null} createReducer={reducerCreate} sceneStyle={{flex: 1}} wrapBy={RelayRenderer()}>
        <Scene key="drawer" component={MyPage} open={false}>
          <Scene
            key="root" navigationBarStyle={Styles.navBar}
            hideNavBar={true}
          >
            <Scene
              key="myLibrary"
              component={MyLibrary}
              hideNavBar={false}
              initial={true}
              renderRightButton={createNavBarButtons}
              queries={{user: () => Relay.QL`query { viewer } `}}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
