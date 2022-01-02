import { createSwitchNavigator, createAppContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';

const SwitchNavigator = createSwitchNavigator(
  {
    App: AppNavigation,
  },
  {
    initialRouteName: 'SignInScreen',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
