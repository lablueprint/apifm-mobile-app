import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomDrawer from './CustomDrawer';
import MarketplaceScreen from '../Marketplace/MarketplaceScreen';
import SignInScreen from '../SignIn/SignInScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import CartScreen from '../Cart/CartScreen';
import ContactScreen from '../ContactScreen';
import ProduceDetailsScreen from '../Marketplace/ProduceDetailsScreen';

const stackNavig = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  icon: {
    left: 25,
  },
});

const profileIcon = ({ color }) => (
  <Icon
    size={26}
    name="account-outline"
    color={color}
    style={styles.icon}
  />
);

const marketplaceIcon = ({ color }) => (
  <Icon
    size={26}
    name="store-outline"
    color={color}
    style={styles.icon}
  />
);

const cartIcon = ({ color }) => (
  <Icon
    size={26}
    name="cart-outline"
    color={color}
    style={styles.icon}
  />
);

const contactIcon = ({ color }) => (
  <Icon
    size={26}
    name="phone-outline"
    color={color}
    style={styles.icon}
  />
);

/* Stack navigators push/pop screens from a navigation stack (similar to web browser) */
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Back"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#FCF7F0',
        drawerInactiveBackgroundColor: '#C1DDA9',
        drawerActiveTintColor: '#34221D',
        drawerInactiveTintColor: '#34221D',
        drawerItemStyle: {
          right: 25, borderTopRightRadius: 25, borderBottomRightRadius: 25, width: '80%',
        },
        drawerLabelStyle: { left: 10, bottom: 1 },
      }}
    >
      <Drawer.Screen
        name="ProfileDrawer"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerIcon: profileIcon,
        }}
      />
      <Drawer.Screen
        name="Back"
        component={MarketplaceScreen}
        options={{
          title: 'Marketplace',
          drawerIcon: marketplaceIcon,
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={ProfileScreen} // TODO: change to past orders screen once it is implemented
        options={{
          title: 'Past orders',
          drawerIcon: cartIcon,
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact us',
          drawerIcon: contactIcon,
        }}
      />
    </Drawer.Navigator>

  );
}

export default function StackNavigation() {
  return (
    <stackNavig.Navigator initialRouteName="Marketplace">
      <stackNavig.Screen name="SignIn" component={SignInScreen} options={{ headerShown: true }} />
      <stackNavig.Screen name="Marketplace" component={DrawerRoutes} options={{ headerShown: false }} />
      <stackNavig.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      <stackNavig.Screen name="Cart" component={CartScreen} options={{ headerShown: true }} />
      <stackNavig.Screen name="ProduceDetails" component={ProduceDetailsScreen} />
    </stackNavig.Navigator>
  );
}
