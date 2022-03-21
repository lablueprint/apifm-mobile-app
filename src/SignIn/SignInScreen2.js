// import React from 'react';
// import {
//   View, StyleSheet,
// } from 'react-native';
// import {
//   Text, Button,
// } from 'react-native-paper';

import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import {
  Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 34,
    marginLeft: 32,
    width: 327,
    height: 467,
  },
  titleText: {
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 34,

  },
  button: {
    width: 300,
    // marginTop: 10,
    backgroundColor: '#C4C4C4',
    borderRadius: 30,
    marginBottom: 58,

  },
});

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.bodyText}>
          Thank you for
          signing up with Food Roots! Our staff will review your information,
          and your account should be approved within 1-3 business days.
        </Text>

      </View>
      <Button
        mode="contained"
        style={styles.button}
      >
        Start ordering!
      </Button>

    </View>
  );
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
