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
import FirstPage from './components/signIn/first';
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

const API_URL = 'http://52.79.112.162/graphql';
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
      viewMyLibrary: true,
      viewSnippet: false,
      modalVisible: false,
      currentScene: SCENE_CONSTANT.MY_LIBRARY
    };
  }

  render() {
    const createNavBarButtons = (route) => {
      let { sceneKey } = route;
      return (
        <View style={Styles.navBarButtonContainer}>
          <TouchableOpacity onPress={() => {
            Actions.get('drawer').ref.toggle()
          }}>
            <Image
              style={Styles.drawerButton}
              source={require("./resources/mypage.png")}
            />
          </TouchableOpacity>
          {(sceneKey === 'detailView') ? null :
            <View style={Styles.dropDownButtonContainer}>
              <Text style={Styles.dropDownText}>My Library</Text>
            </View>
          }
          {(sceneKey === 'detailView') ? null :
            <TouchableOpacity
              style={Styles.changeButton}
              onPress={() => {
                this.setState({viewSnippet: !this.state.viewSnippet});
                (this.state.viewSnippet) ? Actions.snippet() : Actions.pop();
              }}
              activeOpacity={1}
            >
              <Image
                style={Styles.changeImage}
                source={(!this.state.viewMyLibrary) ? imgViewChange01 : imgViewChange02}
              />
            </TouchableOpacity>
          }
          {(sceneKey === 'detailView') ? null :
            <TouchableOpacity
              onPress={() => Actions.search()}
              style={Styles.searchButton}>
              <Image
                style={Styles.searchImage}
                source={require("./resources/search.png")}
              />
            </TouchableOpacity>
          }
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
              key="first"
              component={FirstPage}
              hideNavBar={true}
              type="replace"
            />
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
              queries={{user: () => Relay.QL`query { viewer } `}}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
