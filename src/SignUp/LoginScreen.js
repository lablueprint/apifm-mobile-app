import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, Image, TextInput, Text,
} from 'react-native';
import {
  Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const logoImage = require('../assets/imgs/transparent_logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',

  },
  button: {
    width: 250,
    backgroundColor: '#C4C4C4',
    borderRadius: 30,
    marginBottom: 23,
    marginTop: 5,
  },

  image: {
    marginTop: 50,
    width: 250,
    height: 250,
    alignSelf: 'center',
  },

  inputs: {
    borderWidth: 1,
    height: 38,
    margin: 8.5,
    marginLeft: 30,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'gray',
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
});

export default function LoginScreen({ navigation }) {
  const handleSignUp = () => {
    navigation.navigate('Sign Up');
  };

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const passwordInput = useRef();

  return (

    <View style={styles.container}>

      <Image style={styles.image} source={logoImage} />

      <View style={styles.container}>
        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText={setUserName}
            placeholder="Username"
            returnKeyType="next"
            onSubmitEditing={() => { passwordInput.current.focus(); }}
            blurOnSubmit={false}
            width={330}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            blurOnSubmit={false}
            width={330}
          />
        </View>

        <Button
          mode="contained"
          style={styles.button}
        >
          Login
        </Button>

        <Text>Forgot your password?</Text>

        <Text>
          Don&apos;t have an account?
          <Text style={styles.baseText} onPress={() => handleSignUp()}> Sign Up</Text>
        </Text>

      </View>

    </View>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
