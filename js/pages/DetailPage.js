import React, {Component} from 'react';
import {Platform, BackHandler, StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationUtil from '../navigator/NavigationUtil';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this.onBackAndroid,
      );
    }
  }
  componentWillUnmount() {
    // this.showToast('销毁');
    if (Platform.OS === 'android') {
      this.backHandler.remove();
    }
  }
  onBackAndroid = () => {
    this.props.navigation.pop();
    return true;
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.welcome}
          onPress={() => {
            NavigationUtil.goBack({
              navigation: this.props.navigation,
            });
          }}>
          返回
        </Text>
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
    margin: 10,
  },
});
