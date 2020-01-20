import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import AppNavigator from './navigator/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store} backgroundColor="#fff">
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
          // hidden={true} //隐藏通知栏
        />
        <AppNavigator />
      </Provider>
    );
  }
}
