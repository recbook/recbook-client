import React from 'react';
import { Navigator } from 'react-native';
import Relay from 'react-relay';
import { homeNavigatorRoute } from './navigator/navigatorRoutes';

export function setNetworkLayer() {
  let options = {};
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODY0ZjFiZjc3Mzc4MDBkODg5MmU5MTMiLCJuYW1lIj' +
    'oiaHl1bmNoYW4iLCJlbWFpbCI6Imh5dW5jaGFuQGdtYWlsLmNvbSIsImlhdCI6MTQ4MzAxMDQ5NX0.w4zhjhtOxeS7PV6Iif3aKSNNoR1PAhlmu6YsE' +
    'P-bnbQ';
  options.headers = {
    Authorization: authToken
  };
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://192.168.0.30:5001/graphql', options)
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
