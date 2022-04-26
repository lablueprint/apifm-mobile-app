import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import {
  Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const logoImage = require('../assets/imgs/square_logo.png');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: 330,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 34,
    width: 330,
    height: 270,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 24,
    borderWidth: 1,
    marginLeft: 44,
  },
  button: {
    width: 250,
    backgroundColor: '#C4C4C4',
    borderRadius: 30,
    marginBottom: 23,
    marginTop: 5,
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  image: {
    width: '100%',
    height: '60%',
  },
});

export default function LandingPage({ navigation }) {
  const handleSignUp = () => {
    navigation.navigate('Sign Up');
  };

  const handleLogin = () => {
    navigation.navigate('Log In');
  };

  return (

    <View style={styles.background}>

      <Image style={styles.image} source={logoImage} />

      <View style={styles.container}>

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleLogin}
        >
          Login
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSignUp}
        >
          Sign up
        </Button>
      </View>

    </View>
  );
}

LandingPage.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
