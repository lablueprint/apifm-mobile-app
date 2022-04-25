import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketplaceScreen from '../Marketplace/MarketplaceScreen';
import SignInScreen from '../SignIn/SignInScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import CartScreen from '../Cart/CartScreen';
import ProduceDetailsScreen from '../Marketplace/ProduceDetailsScreen';
import OrderScreen from '../Orders/OrderScreen';
import OrderDetailsScreen from '../Orders/OrderDetailsScreen';


const stackNavig = createNativeStackNavigator();

/* Stack navigators push/pop screens from a navigation stack (similar to web browser) */
export default function StackNavigation() {
  return (
    <stackNavig.Navigator initialRouteName="SignIn">
      <stackNavig.Screen name="SignIn" component={SignInScreen} />
      <stackNavig.Screen name="Marketplace" component={MarketplaceScreen} />
      <stackNavig.Screen name="Profile" component={ProfileScreen} />
      <stackNavig.Screen name="Cart" component={CartScreen} />
      <stackNavig.Screen name="Orders" component={OrderScreen} />

      <stackNavig.Screen
        name="ProduceDetails"
        component={ProduceDetailsScreen}
        options={{
          title: '',
        }}
      />
        <stackNavig.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
          options={{
            title: '',
          }}
        />
    </stackNavig.Navigator>
  );
}
