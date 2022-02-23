import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TextInput, Alert,
} from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import Config from 'react-native-config';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Thank you for signing up with Food Roots! Our staff will</Text>
      <Text> review your information, and your account should</Text>
      <Text> be approved within 1-3 business days.</Text>

      <Button> Start ordering!</Button>

    </View>
  );
}
