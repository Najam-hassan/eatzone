import { Provider } from 'react-redux'
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppContainer from './navigators';
import configureStore from './store';

import { axiosClient } from './utils/config'

const store = configureStore();

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppContainer />
        </SafeAreaView>
      </Provider>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
