import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';

const styles = StyleSheet.create({
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

export default function MarketplaceScreen() {
  return (
    <View style={styles.container}>
      <Title style={styles.titleText}> Marketplace :) </Title>
      <Text style={styles.bodyText}> This is the Marketplace. </Text>
      <Button
        mode="contained"
        style={styles.button}
      >
        BUTTON
      </Button>
    </View>
  );
}
