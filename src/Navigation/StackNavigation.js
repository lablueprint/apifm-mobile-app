import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MarketplaceScreen from '../Marketplace/MarketplaceScreen';
import SignInScreen from '../SignIn/SignInScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import CartScreen from '../Cart/CartScreen';
import CheckoutScreen from '../Checkout/CheckoutScreen';
import OrdersScreen from '../Orders/OrdersScreen';
import ContactScreen from '../Contact/ContactScreen';
import ProduceDetailsScreen from '../Marketplace/ProduceDetailsScreen';

const stackNavig = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Back">
      <Drawer.Screen name="Back" component={MarketplaceScreen} options={{ title: 'Marketplace' }} />
      <Drawer.Screen name="ProfileDrawer" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Drawer.Screen name="Orders" component={OrdersScreen} options={{ title: 'View Orders' }} />
      <Drawer.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us' }} />
      <Drawer.Screen name="SignInDrawer" component={SignInScreen} options={{ title: 'Log Out' }} />
    </Drawer.Navigator>
  );
}

/* Stack navigators push/pop screens from a navigation stack (similar to web browser) */
export default function StackNavigation() {
  return (
    <stackNavig.Navigator initialRouteName="SignIn">
      <stackNavig.Screen name="SignIn" component={SignInScreen} options={{ headerShown: true }} />
      <stackNavig.Screen name="Marketplace" component={DrawerRoutes} options={{ headerShown: false }} />
      <stackNavig.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      <stackNavig.Screen name="Cart" component={CartScreen} options={{ headerShown: true }} />
      <stackNavig.Screen name="ProduceDetails" component={ProduceDetailsScreen} />
      <stackNavig.Screen name="Checkout" component={CheckoutScreen} />
    </stackNavig.Navigator>
  );
}
