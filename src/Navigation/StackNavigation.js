import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketplaceScreen from '../Marketplace/MarketplaceScreen';
import SignInScreen from '../SignIn/SignInScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import CartScreen from '../Cart/CartScreen';
import ContactScreen from '../ContactScreen';
import ProduceDetailsScreen from '../Marketplace/ProduceDetailsScreen';

const stackNavig = createNativeStackNavigator();

/* Stack navigators push/pop screens from a navigation stack (similar to web browser) */
export default function StackNavigation() {
  return (
    <stackNavig.Navigator initialRouteName="SignIn">
      <stackNavig.Screen name="SignIn" component={SignInScreen} />
      <stackNavig.Screen name="Marketplace" component={MarketplaceScreen} />
      <stackNavig.Screen name="Profile" component={ProfileScreen} />
      <stackNavig.Screen name="Cart" component={CartScreen} />
      <stackNavig.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="ProduceDetails" component={ProduceDetailsScreen} />
    </stackNavig.Navigator>
  );
}
