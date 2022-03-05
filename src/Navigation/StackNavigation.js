import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MarketplaceScreen from '../Marketplace/MarketplaceScreen';
import SignInScreen from '../SignIn/SignInScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import CartScreen from '../Cart/CartScreen';
import ProduceDetailsScreen from '../Marketplace/ProduceDetailsScreen';

const stackNavig = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const marketplaceIcon = () => (
  <Icon
    size={23}
    name="food-apple-outline"
  />
);

const profileIcon = () => (
  <Icon
    size={23}
    name="account-outline"
  />
);

const cartIcon = () => (
  <Icon
    size={23}
    name="cart-outline"
  />
);

const contactIcon = () => (
  <Icon
    size={23}
    name="phone-outline"
  />
);

const logoutIcon = () => (
  <Icon
    size={23}
    name="logout-variant"
  />
);

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Back">
      <Drawer.Screen
        name="Back"
        component={MarketplaceScreen}
        options={{
          title: 'Marketplace',
          drawerIcon: marketplaceIcon,
        }}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerIcon: profileIcon,
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'View Orders',
          drawerIcon: cartIcon,
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact Us',
          drawerIcon: contactIcon,
        }}
      />
      <Drawer.Screen
        name="SignInDrawer"
        component={SignInScreen}
        options={{
          title: 'Log Out',
          drawerIcon: logoutIcon,
        }}
      />
    </Drawer.Navigator>
  );
}

/* Stack navigators push/pop screens from a navigation stack (similar to web browser) */
export default function StackNavigation() {
  return (
    <stackNavig.Navigator initialRouteName="Marketplace">
      <stackNavig.Screen name="SignIn" component={SignInScreen} options={{ headerShown: true }} />
      <stackNavig.Screen name="Marketplace" component={DrawerRoutes} options={{ headerShown: false }} />
      <stackNavig.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      <stackNavig.Screen name="Cart" component={CartScreen} options={{ headerShown: true }} />
/* Stack navigators push/pop screens from a navigation stack (similar to web browser) */
export default function StackNavigation() {
  return (
    <stackNavig.Navigator initialRouteName="SignIn">
      <stackNavig.Screen name="SignIn" component={SignInScreen} />
      <stackNavig.Screen name="Marketplace" component={MarketplaceScreen} />
      <stackNavig.Screen name="Profile" component={ProfileScreen} />
      <stackNavig.Screen name="Cart" component={CartScreen} />
      <stackNavig.Screen name="ProduceDetails" component={ProduceDetailsScreen} />
    </stackNavig.Navigator>
  );
}
