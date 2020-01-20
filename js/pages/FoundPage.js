import React, {Component} from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import FoundTab from '../tabs/FoundTabs';
import FocusTab from '../tabs/FocusTabs';
import store from '../store/index';
import {connect} from 'react-redux';

class FoundPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        {
          FocusTab: {
            screen: FocusTab,
            navigationOptions: {
              title: '关注',
            },
          },
          FoundTab: {
            screen: FoundTab,
            navigationOptions: {
              title: '发现',
            },
          },
        },
        {
          initialRouteName: 'FoundTab',
          lazy: true,
          tabBarOptions: {
            scrollEnabled: true,
            style: {
              backgroundColor: this.props.themeState,
            },
          },
        },
      ),
    );
    return (
      <View style={{flex: 1}}>
        <TabNavigator />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    themeState: store.getState().theme.theme,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const ProjectNavigationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoundPage);

export default ProjectNavigationBarContainer;
