import React from 'react';
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
    return (
        <Router createReducer={reducerCreate} sceneStyle={{flex: 1}} wrapBy={RelayRenderer()}>
          <Scene key="root">
            <Scene
                key="myLibrary"
                component={MyLibrary}
                initial={true}
                queries={{user: () => Relay.QL`query { viewer } `}}
            />
          </Scene>
        </Router>
    );
  }
}
