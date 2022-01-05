import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';

/* Navigators need to be wrapped in a NavigationContainer before use */
function AppNavigationContainer() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

export default AppNavigationContainer;
