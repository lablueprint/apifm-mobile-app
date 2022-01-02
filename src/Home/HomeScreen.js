import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';

const homeScreenStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  titleText: {
    marginBottom: 10,
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '30%',
    marginTop: 10,
    backgroundColor: '#0492c2',
  },
});

export default function HomeScreen() {
  return (
    <View style={homeScreenStyles.container}>
      <Title style={homeScreenStyles.titleText}> HomeScreen :) </Title>
      <Text style={homeScreenStyles.bodyText}>
        Nothing works right now, so this button will take you to the home page.
      </Text>
      <Button
        mode="contained"
        style={homeScreenStyles.button}
      >
        Home
      </Button>
    </View>
  );
}
