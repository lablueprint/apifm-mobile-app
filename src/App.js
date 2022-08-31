import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './lib/redux/store';
import AppNavigationContainer from './Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppNavigationContainer />
      </View>
    </Provider>
  );
}
