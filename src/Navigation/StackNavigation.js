import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketplaceScreen from '../Marketplace/MarketplaceScreen';
import SignUpScreen from '../SignUp/SignInScreen';
import SignUpConfirmation from '../SignUp/SignInScreen2';
import LandingPage from '../SignUp/LandingPage';
import LoginScreen from '../SignUp/LoginScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import CartScreen from '../Cart/CartScreen';
import ContactScreen from '../ContactScreen';
import ProduceDetailsScreen from '../Marketplace/ProduceDetailsScreen';

const stackNavig = createNativeStackNavigator();

/* Stack navigators push/pop screens from a navigation stack (similar to web browser) */
export default function StackNavigation() {
  return (
    <stackNavig.Navigator initialRouteName="Marketplace">
      <stackNavig.Screen name="Landing Page" component={LandingPage} options={{ headerShown: false }} />
      <stackNavig.Screen name="Log In" component={LoginScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="Sign Up Confirmation" component={SignUpConfirmation} options={{ headerShown: false }} />
      <stackNavig.Screen name="Marketplace" component={MarketplaceScreen} />
      <stackNavig.Screen name="Profile" component={ProfileScreen} />
      <stackNavig.Screen name="Cart" component={CartScreen} />
      <stackNavig.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
      <stackNavig.Screen
        name="ProduceDetails"
        component={ProduceDetailsScreen}
        options={{
          title: '',
        }}
      />
    </stackNavig.Navigator>
  );
}
