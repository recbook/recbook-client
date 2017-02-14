import React from 'react';
import { AsyncStorage, Image, Text, TouchableOpacity, View } from 'react-native';
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
import Recommended from './components/myLibrary/recommended';
import Saved from './components/myLibrary/saved';
import MyPage from './components/myPage/myPage';
import Snippet from './components/snippet/snippet';
import Camera from './components/camera/camera';
import Crop from './components/camera/crop';
import FlipCardDetailView from './components/detailView/flipCard';
import Expanded from './components/expanded/expanded';
import SearchBar from './components/search/search';
import Register from './components/signIn/register';
import Login from './components/signIn/login';

import imgViewChange01 from './resources/view change01.png';
import imgViewChange02 from './resources/view change02.png';
import imgArrowDown from './resources/arrow_down.png';
import imgArrowUp from './resources/arrow_up.png';

// Define reducer to manage scenes
const reducerCreate = (params) => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};

export const SCENE_CONSTANT = {
  MY_LIBRARY: 'My Library',
  SAVED: 'Saved',
  RECOMMENDED: 'Recommended'
};

const API_URL = 'http://localhost:5001/graphql';
export function setNetworkLayer(options) {
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(API_URL, options)
  );
}

export function getCurrentUser() {
  return new Promise((resolve) => {
    AsyncStorage.getItem('currentUser', (err, res) => {
      const store = JSON.parse(res);
      const authToken = store ? store.authToken : null;
      resolve(authToken);
    });
  });
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      viewOthers: true,
      modalVisible: false,
      currentScene: SCENE_CONSTANT.MY_LIBRARY
    };
    this.renderDropDown = this.renderDropDown.bind(this);
  }

  renderDropDownText(text, style) {
    return (
      <View style={Styles.textDropdownContainer}>
        <View style={{width: 4}}/>
        <TouchableOpacity
          style={[Styles.textDropdownInnerContainer, (style) ? style : {}]}
          activeOpacity={1}
          onPress={() => {
            Actions.refresh(this.setState({currentScene: text}));
            if (text === SCENE_CONSTANT.MY_LIBRARY) {
              Actions.myLibrary({prevScene: text});
            } else if (text === SCENE_CONSTANT.SAVED) {
              Actions.saved({prevScene: text});
            } else {
              Actions.recommended({prevScene: text});
            }
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
    const createNavBarButtons = (route) => {
      let { sceneKey } = route;
      return (
        <View style={Styles.navBarButtonContainer}>
          <TouchableOpacity onPress={() => {Actions.get('drawer').ref.toggle()}}>
            <Image
              style={Styles.drawerButton}
              source={require("./resources/mypage.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.dropDownButtonContainer}
            onPress={() => {
              this.setState({modalVisible: !this.state.modalVisible});
              Actions.refresh();
            }}
          >
            <Text style={Styles.dropDownText}>{this.state.currentScene}</Text>
            <Image
              style={Styles.dropDownArrowImage}
              source={(this.state.modalVisible) ? imgArrowUp : imgArrowDown}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.changeButton}
            onPress={() => {
              this.setState({viewOthers: !this.state.viewOthers});
              (this.state.viewOthers) ? Actions.snippet() : Actions.myLibrary();
            }}
            activeOpacity={1}
          >
            <Image
              style={Styles.changeImage}
              source={(this.state.viewOthers) ? imgViewChange02 : imgViewChange01}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.search()}
            style={Styles.searchButton}>
            <Image
              style={Styles.searchImage}
              source={require("./resources/search.png")}
            />
          </TouchableOpacity>
          {(sceneKey === 'detailView') ? null :
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
          }
          {(sceneKey === 'detailView') ? null :
            <TouchableOpacity
              style={Styles.changeButton}
              onPress={() => {
                this.setState({viewOthers: !this.state.viewOthers});
                (this.state.viewOthers) ? Actions.snippet() : Actions.pop();
              }}
              activeOpacity={1}
            >
              <Image
                style={Styles.changeImage}
                source={(this.state.viewOthers) ? imgViewChange01 : imgViewChange02}
              />
            </TouchableOpacity>
          }
          {(sceneKey === 'detailView') ? null :
            <TouchableOpacity style={Styles.searchButton}>
              <Image
                style={Styles.searchImage}
                source={require("./resources/search.png")}
              />
            </TouchableOpacity>
          }
          {(this.state.modalVisible) ? this.renderDropDown() : null}
        </View>
      );
    };

    return (
      <Router drawerImage={null} createReducer={reducerCreate} sceneStyle={{flex: 1}} wrapBy={RelayRenderer()}>
        <Scene key="drawer" component={MyPage} open={false}>
          <Scene
            key="root"
            navigationBarStyle={Styles.navBar}
            hideNavBar={true}
          >
            <Scene
              key="register"
              component={Register}
              hideNavBar={true}
              type="replace"
              initial
            />
            <Scene
              key="login"
              component={Login}
              hideNavBar={true}
              type="replace"
            />
            <Scene
              key="myLibrary"
              component={MyLibrary}
              hideNavBar={false}
              type="replace"
              initial={false}
              renderRightButton={createNavBarButtons}
              queries={{user: () => Relay.QL`query { viewer } `}}
            />
            <Scene
              key="saved"
              component={Saved}
              hideNavBar={false}
              type="replace"
              renderRightButton={createNavBarButtons}
              queries={{user: () => Relay.QL`query { viewer } `}}
            />
            <Scene
              key="recommended"
              component={Recommended}
              hideNavBar={false}
              type="replace"
              renderRightButton={createNavBarButtons}
              queries={{user: () => Relay.QL`query { viewer } `}}
            />
            <Scene
              key="snippet"
              component={Snippet}
              hideNavBar={false}
              renderRightButton={createNavBarButtons}
              renderBackButton={()=>{}}
              duration={0}
              type="replace"
              queries={{user: () => Relay.QL`query { viewer } `}}
            />
            <Scene
              key="camera"
              component={Camera}
              hideNavBar={true}
              direction="vertical"
            />
            <Scene
              key="crop"
              component={Crop}
              hideNavBar={true}
              direction="fade"
              queries={{user: () => Relay.QL`query { viewer } `}}
            />
            <Scene
              key="expanded"
              component={Expanded}
              hideNavBar={true}
            />
            <Scene
              key="detailView"
              navigationBarStyle={Styles.navBarSceneDetailView}
              component={FlipCardDetailView}
              hideNavBar={true}
              renderRightButton={createNavBarButtons}
            />
            <Scene
              key="search"
              component={SearchBar}
              hideNavBar={true}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
