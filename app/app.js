import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from './shared/styles';
import Relay from 'react-relay';
import {
  Router,
  Reducer,
  Scene
} from 'react-native-router-flux';
import RelayRenderer from './shared/relayComponentRenderer';
import MyLibrary from './components/myLibrary/myLibrary';

// Define reducer to manage scenes
const reducerCreate = (params) => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
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
  componentDidMount() {
    setNetworkLayer();
  }

  render() {
    const createNavBarButtons = () => {
      return (
          <View style={Styles.navBarButtonContainer}>
            <TouchableOpacity style={Styles.dropDownButtonContainer}>
              <Text style={Styles.dropDownText}>My Library</Text>
              <Image
                  style={Styles.dropDownArrowImage}
                  source={require("./resources/arrow_down.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.changeButton}>
              <Image
                  style={Styles.changeImage}
                  source={require("./resources/view change01.png")}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.searchButton}>
              <Image
                  style={Styles.searchImage}
                  source={require("./resources/search.png")}/>
            </TouchableOpacity>
          </View>
      );
    }

    return (
      <Router createReducer={reducerCreate} sceneStyle={{flex: 1}} wrapBy={RelayRenderer()}>
        <Scene
            key="root"
            navigationBarStyle={Styles.navBar}
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
      </Router>
    );
  }
}