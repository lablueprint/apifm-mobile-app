import React from 'react';
import {
  View, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { loginUser } from '../lib/airlock/airlock';

const backgroundImage = require('../assets/imgs/confirmation.png');

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
    marginTop: 370,
    fontSize: 24,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    height: 175,
    width: 295,
    color: 'black',
  },
  buttonText: {
    marginTop: 6,
    fontSize: 24,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: 'white',
  },
  button: {
    width: 300,
    height: 50,
    alignItems: 'center',
    backgroundColor: '#1D763C',
    borderRadius: 30,
    marginBottom: 40,
    fontFamily: 'JosefinSans-SemiBold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default function SignUpConfirmation({ navigation, route }) {
  const { username, password } = route.params;
  const handleBrowse = async () => {
    try {
      const result = await loginUser(username, password);
      if (result) {
        navigation.navigate('Marketplace');
      }
    } catch (err) {
      Alert.alert(err.error, err.message);
      navigation.navigate('Log In');
    }
  };

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.bodyText}>
            Thank you for joining
            Food Roots! Our staff will
            review your information, and your
            account should be approved
            within 1-3 business days.
          </Text>

        </View>
        <TouchableOpacity
          mode="contained"
          style={styles.button}
          onPress={handleBrowse}
        >
          <Text style={styles.buttonText}>Start browsing!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

SignUpConfirmation.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
