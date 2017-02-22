import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer} from 'react-native-router-flux';
import MyPageContent from './myPageContent';

class MyPage extends Component {
  static propTypes = {
    navigationState: PropTypes.object,
    onNavigate: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false
    };
  }

  componentDidMount() {
    Actions.refresh({key: 'drawer', ref: this.refs.navigation});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isDrawerOpen: nextProps.open});
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (
        <Drawer
          ref="navigation"
          open={state.open}
          onOpen={()=>Actions.refresh({key: state.key, open: true})}
          onClose={()=>Actions.refresh({key: state.key, open: false})}
          type="displace"
          content={<MyPageContent isOpen={this.state.isDrawerOpen}/>}
          tapToClose={true}
          openDrawerOffset={0.10}
          panCloseMask={0.10}
          negotiatePan={true}
          tweenHandler={Drawer.tweenPresets.parallax}
        >
          <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        </Drawer>
    );
  }
}

export default MyPage;
