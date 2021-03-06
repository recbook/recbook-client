import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

class RelayComponentRenderer extends Component {
  static propTypes = {
    component: PropTypes.func,
    renderLoading: PropTypes.func,
    renderError: PropTypes.func,
    navigationState: PropTypes.object
  };

  renderLoading() {
    return (<View>
      <Text>Loading...</Text>
    </View>);
  }

  renderError(error, retry) {
    return (
        <View style={{padding: 30}}>
          <Text>Error while fetching data from the server</Text>
          <TouchableHighlight onPress={retry}>
            <Text>Retry?</Text>
          </TouchableHighlight>
        </View>
    );
  }

  getParams() {
    // TODO: not sure if it is correct to pass all the data, find the way extract only needed variables
    const params = {
      ...this.props.navigationState
    };

    delete params.environment;
    if (params.hasOwnProperty('prepareParams')) {
      return params.prepareParams(params);
    }
    return params;
  }

  render() {
    return (<Relay.Renderer
        Container={this.props.component}
        queryConfig={{
          queries: this.props.navigationState.queries,
          params: this.getParams(),
          name: `rnrf_relay_renderer_${this.props.navigationState.key}_route`
        }}
        environment={this.props.navigationState.environment || this.props.environment || Relay.Store} // eslint-disable-line
        render={({error, props, retry}) => {
          if (error) {
            return (this.props.renderError || this.renderError)(error, retry);
          }

          if (props) {
            // render component itself
            return <this.props.component {...this.props} {...props} />;
          }

          // render loading
          return (this.props.renderLoading || this.renderLoading)(this.props.navigationState);
        }}
    />);
  }
}

export default (moduleProps) => (component) =>
    !Relay.isContainer(component)
        ?
        component
        :
        (props) =>
            <RelayComponentRenderer
                {...moduleProps}
                {...props}
                component={component}
            />;
