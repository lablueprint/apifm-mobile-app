import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput, Text, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
// import userIcon from "@iconify/ant-design:user-outlined";

const backgroundImage = require('../assets/imgs/login.png');

const styles = StyleSheet.create({
  containerInputs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  button: {
    width: 300,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#1D763C',
    borderRadius: 30,
    fontFamily: 'JosefinSans-SemiBold',
    marginTop: 80,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: 'white',
    marginTop: 3,
  },

  inputs: {
    borderWidth: 1,
    height: 38,
    margin: 8.5,
    marginLeft: 50,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#F0EFEF',
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFA',
  },

  textInput: {
    marginLeft: 7,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    // color: '#1D763C',
  },

  sideText: {
    marginLeft: 165,
    fontFamily: 'JosefinSans',
    fontSize: 12,
    // color: '#1D763C',
  },

  bottomTextFine: {
    // marginLeft: 7,
    fontFamily: 'JosefinSans',
    fontSize: 16,
    marginTop: 80,

  },

  bottomTextBold: {
    // marginLeft: 7,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    color: '#1D763C',

  },

  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
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
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>

      <View style={styles.containerInputs}>
        <View style={styles.inputs}>
          {/* <Icon icon="ant-design:user-outlined" /> */}
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText={setUserName}
            placeholder="Email Address"
            returnKeyType="next"
            onSubmitEditing={() => { passwordInput.current.focus(); }}
            blurOnSubmit={false}
            width={300}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            returnKeyType="next"
            blurOnSubmit={false}
            ref={passwordInput}
            width={300}
          />
        </View>

        <Text style={styles.sideText}>Forgot password?</Text>

        <TouchableOpacity
          mode="contained"
          style={styles.button}
        >
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

        <Text style={styles.bottomTextFine}>
          Don&apos;t have an account?
          <Text style={styles.bottomTextBold} onPress={() => handleSignUp()}> Sign Up</Text>
        </Text>
      </View>

    </ImageBackground>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
