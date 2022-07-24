import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import StackNavigation from './StackNavigation';
import store from '../redux/store';

/* Navigators need to be wrapped in a NavigationContainer before use */
function AppNavigationContainer() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </StoreProvider>
  );
}

export default AppNavigationContainer;
