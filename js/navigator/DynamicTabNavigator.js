import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {BackHandler, Platform, ToastAndroid} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FoundPage from '../pages/FoundPage';
import CommunityPage from '../pages/CommunityPage';
import GamePage from '../pages/GamePage';
// import UserPage from '../pages/UserPage';
import DrawerNavigator from '../pages/DrawerNavigator';
import Icon from '../components/Icon/MyIcon';
import store from '../store/index';
import {onThemeChange} from '../store/action/theme/index';
import {connect} from 'react-redux';

const TABS = {
  FoundPage: {
    screen: FoundPage,
    navigationOptions: {
      tabBarLabel: '发现',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name={'found'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  GamePage: {
    screen: GamePage,
    navigationOptions: {
      tabBarLabel: '游戏库',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name={'game'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  CommunityPage: {
    screen: CommunityPage,
    navigationOptions: {
      tabBarLabel: '社区',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name={'community'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  DrawerNavigator: {
    screen: DrawerNavigator,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name={'my'} size={26} style={{color: tintColor}} />
      ),
    },
  },
};

let lastBackPressed = 0;
class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  componentDidMount() {
    // this.getCallLog();
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    // this.showToast('销毁');
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  onBackAndroid = () => {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      BackHandler.exitApp();
      return;
    }
    lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  };
  _tabNavigator() {
    let {FoundPage, CommunityPage, GamePage, DrawerNavigator} = TABS;
    let tabs = {FoundPage, CommunityPage, GamePage, DrawerNavigator};
    return createAppContainer(
      createBottomTabNavigator(tabs, {
        lazy: true,
        animationEnabled: false,
        initialRouteName: 'DrawerNavigator',
        backBehavior: 'none',
        tabBarOptions: {
          activeTintColor: this.props.themeState,
          tabStyle: {minWidth: 50, marginTop: 5},
          upperCaseLabel: false,
          scrollEnabled: false,
          labelStyle: {
            fontSize: 12,
          },
        },
      }),
    );
  }

  render() {
    // NavigationUtil.navigation = this.props.navigation;
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}

function mapStateToProps(state) {
  return {
    themeState: store.getState().theme.theme,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onThemeChange: themeColor => dispatch(onThemeChange(themeColor)),
  };
}
const ChangeThemeColorPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  // 注意：这里千万要写上这句话，否则用了Redux后的组件是无法使用ref获取该组件的
  {forwardRef: true},
)(DynamicTabNavigator);
export default ChangeThemeColorPageContainer;
