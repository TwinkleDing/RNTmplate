import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigator/NavigationUtil';
export default class FoundPage extends Component {
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        {
          FocusTab: {
            screen: FouceTab,
            navigationOptions: {
              tabBarLabel: '关注',
              swipeEnabled: true,
            },
          },
          FoundTab: {
            screen: FoundTab,
            navigationOptions: {
              tabBarLabel: '发现',
              swipeEnabled: true,
            },
          },
        },
        {
          swipeEnabled: true,
          tabBarPosition: 'top', //如果在顶部，就是 top
          tabBarOptions: {
            scrollEnabled: true,
          },
        },
      ),
    );
    return (
      <View style={{flex: 1, padding: 0}}>
        <TabNavigator />
      </View>
    );
  }
}

/**
 * 顶部导航组件
 */
class FouceTab extends Component {
  render() {
    const {tabLabel} = this.props;
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            NavigationUtil.goPage(
              {
                navigation: this.props.navigation,
              },
              'DetailPage',
            );
          }}>
          跳转到详情页
        </Text>
        <Text
          onPress={() => {
            console.log(this.props);
          }}>
          关注
        </Text>
      </View>
    );
  }
}
class FoundTab extends Component {
  render() {
    const {tabLabel} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>222{tabLabel}</Text>
        <Text
          onPress={() => {
            NavigationUtil.goPage(
              {
                navigation: this.props.navigation,
              },
              'DetailPage',
            );
          }}>
          跳转到详情页
        </Text>
        <Text>发现</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
});
