import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const signInStyles = StyleSheet.create({
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

export default function SignInScreen({ navigation }) {
  return (
    <View style={signInStyles.container}>
      <Title style={signInStyles.titleText}> SignInScreen :) </Title>
      <Text style={signInStyles.bodyText}>
        Nothing works right now, so this button will take you to the home page.
      </Text>
      <Button
        mode="contained"
        style={signInStyles.button}
        onPress={() => navigation.navigate('HomeScreen')} // On press, switches to Home
      >
        Home
      </Button>
    </View>
  );
}

/* class SignInScreen extends React.Component {
  render() {
    const {
      errorMessage, email, password, loading,
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={SignInStyles.container}>
        <Button
          style={SignInStyles.button}
          disabled={loading}
          mode="contained"
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          Don&apos;t have an account? Sign Up
        </Button>
      </View>
    );
  }
} */

SignInScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
