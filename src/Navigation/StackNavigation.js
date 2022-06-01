import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomDrawer from './CustomDrawer';
import MarketplaceScreen from '../Marketplace/MarketplaceScreen';
import SignUpScreen from '../SignUp/SignUpScreen';
import SignUpConfirmation from '../SignUp/SignUpScreen2';
import LoginScreen from '../SignUp/LoginScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import CartScreen from '../Cart/CartScreen';
import CheckoutScreen from '../Checkout/CheckoutScreen';
import ContactScreen from '../ContactScreen';
import ProduceDetailsScreen from '../Marketplace/ProduceDetailsScreen';
import OrderSuccessfulScreen from '../Checkout/OrderSuccessfulScreen';

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
          right: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          width: '80%',
        },
        drawerLabelStyle: {
          left: 10,
          bottom: 1,
          fontFamily: 'JosefinSans-Medium',
        },
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
          headerShown: false,
          headerStyle: {
            height: 0,
          },
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
    <stackNavig.Navigator initialRouteName="Log In">
      <stackNavig.Screen name="Log In" component={LoginScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="Sign Up Confirmation" component={SignUpConfirmation} options={{ headerShown: false }} />
      <stackNavig.Screen name="Marketplace" component={DrawerRoutes} options={{ headerShown: false }} />
      <stackNavig.Screen name="Profile" component={ProfileScreen} />
      <stackNavig.Screen name="Cart" component={CartScreen} />
      <stackNavig.Screen name="Checkout" component={CheckoutScreen} />
      <stackNavig.Screen name="Order Successful" component={OrderSuccessfulScreen} />
      <stackNavig.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="ProduceDetails" component={ProduceDetailsScreen} options={{ headerShown: false }} />
    </stackNavig.Navigator>
  );
}
