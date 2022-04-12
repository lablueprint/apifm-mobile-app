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
import OrdersScreen from '../Orders/OrdersScreen';
import ContactScreen from '../Contact/ContactScreen';
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

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Back"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#FCF7F0',
        drawerInactiveBackgroundColor: '#FCF7F0',
        drawerActiveTintColor: '#34221D',
        drawerInactiveTintColor: '#34221D',
        drawerItemStyle: {
          right: 25, borderTopRightRadius: 25, borderBottomRightRadius: 25, width: '80%',
        },
        drawerLabelStyle: { left: 10 },
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
        component={OrdersScreen}
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

/* Stack navigators push/pop screens from a navigation stack (similar to web browser) */
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
