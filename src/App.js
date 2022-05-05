import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import AppNavigationContainer from './Navigation';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Text> APIFM App </Text>
      <AppNavigationContainer />
    </View>
  );
}
