import React from 'react';
import { Navigator } from 'react-native';
import Relay from 'react-relay';
import { homeNavigatorRoute } from './navigator/navigatorRoutes';

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

export function renderRelayScene(route, navigator) {
  const { Component, queryConfig } = route;
  return (
    <Relay.RootContainer
      Component={Component}
      route={queryConfig}
      renderFetched={(data) => {
        return (
          <Component
            navigator={navigator}
            {...data}
          />
        );
      }}
    />
  );
}

export default class Recbook extends React.Component {
  componentDidMount() {
    setNetworkLayer();
  }

  render() {
    const initialRoute = homeNavigatorRoute();
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={renderRelayScene}
      />
    );
  }
}
