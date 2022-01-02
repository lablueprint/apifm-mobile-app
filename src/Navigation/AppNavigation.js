import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from '../SignIn/SignInScreen';
import HomeScreen from '../Home/HomeScreen';

const AppNavigation = createStackNavigator(
  {
    SignInScreen,
    HomeScreen,
  },
  {
    initialRouteName: 'SignInScreen',
    headerMode: 'float',
  },
);

export default AppNavigation;
