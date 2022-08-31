import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomDrawer from './CustomDrawer';
import MarketplaceScreen from '../Marketplace/MarketplaceScreen';
import SignUpScreen from '../SignUp/SignUpScreen';
import SignUpConfirmation from '../SignUp/SignUpConfirmScreen';
import LoginScreen from '../SignIn/LoginScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import CartScreen from '../Cart/CartScreen';
import CheckoutScreen from '../Checkout/CheckoutScreen';
import ContactScreen from '../ContactScreen';
import ProduceDetailsScreen from '../Marketplace/ProduceDetailsScreen';
import OrderScreen from '../Orders/OrderScreen';
import OrderDetailsScreen from '../Orders/OrderDetailsScreen';
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
          fontSize: 17,
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
        component={OrderScreen}
        options={{
          title: 'Past orders',
          drawerIcon: cartIcon,
          headerTitle: '',
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact us',
          drawerIcon: contactIcon,
          headerTitle: '',
          headerTransparent: true,
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
      <stackNavig.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="Order Successful" component={OrderSuccessfulScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="ProduceDetails" component={ProduceDetailsScreen} options={{ headerShown: false }} />
      <stackNavig.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          fontFamily: 'JosefinSans-Regular',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#FFFFFA',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            fontFamily: 'JosefinSans-Regular',
            fontSize: 24,
            color: '#34221D',
          },
        }}
      />
      <stackNavig.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          fontFamily: 'JosefinSans-Regular',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#FFFFFA',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            fontFamily: 'JosefinSans-Regular',
            fontSize: 24,
            color: '#34221D',
          },
        }}
      />
      <stackNavig.Screen name="Order Successful" component={OrderSuccessfulScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="ProduceDetails" component={ProduceDetailsScreen} options={{ headerShown: false }} />
      <stackNavig.Screen name="OrderDetails" component={OrderDetailsScreen} />
      {/* need to adjust the header to hide the order details */}
    </stackNavig.Navigator>
  );
}
