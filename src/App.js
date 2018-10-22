import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import MapScreen from './screens/Map';
import LocationScreen from './screens/Location';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './reducers';
const store = createStore(rootReducer);
console.log('initial state', store.getState());


const RootStack = createStackNavigator(
  {
    Map: MapScreen,
    Location: LocationScreen,
  },
  {
    initialRouteName: 'Map',
    navigationOptions: {
      headerStyle: {
        display: 'none',
      }
    },
  }
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
};
