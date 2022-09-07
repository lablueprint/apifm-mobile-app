import React, { useEffect, useState, useRef } from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput, Text, ImageBackground, Alert, Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import EyeIcon from 'react-native-vector-icons/FontAwesome5';
import LockIcon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../lib/airlock/airlock';
import store from '../lib/redux/store';
import { login } from '../lib/redux/sliceAuth';
const backgroundImage = require('../assets/imgs/login.png');

const styles = StyleSheet.create({
  containerInputs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,

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
  icon: {
    paddingLeft: '5%',
    paddingBottom: '1%',
  },

  eye: {
    marginRight: 5,
  },

  inputs: {
    borderWidth: 1,
    height: 38,
    margin: 8.5,
    left: '5%',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#F0EFEF',
    backgroundColor: '#FFFFFA',

  },

  textInput: {
    marginLeft: 5,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    color: '#868686',
    paddingTop: 1,
  },

  sideText: {
    left: '27%',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 12,
  },

  bottomTextFine: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
    marginTop: 80,

  },

  bottomTextBold: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    color: '#1D763C',
    margin: 20,

  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default function LoginScreen({ navigation }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const passwordInput = useRef();

  // This function checks if app storage contains a logged in user
  // if so, it stores the user data into redux store and logs in the user
  const updateUserStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        store.dispatch(login(JSON.parse(value)));
        navigation.navigate('Marketplace');
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await loginUser(username, password);
      if (result) {
        setUserName('');
        setPassword('');
        navigation.navigate('Marketplace');
      }
    } catch (err) {
      Alert.alert(err.error, err.message);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Sign Up');
  };

  const handleForgotPassword = () => {
    navigation.navigate('Forgot Password');
  };

  useEffect(() => {
      updateUserStorage();
  }, []);

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>

      <View style={styles.containerInputs}>
        <View style={styles.inputs}>
          <Icon
            style={styles.icon}
            name="user"
            size={22}
            color="#868686"

          />
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
          <LockIcon
            style={styles.icon}
            name="lock"
            size={22}
            color="#868686"
          />
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => Keyboard.dismiss()}
            placeholder="Password"
            secureTextEntry={!!hidePass}
            returnKeyType="done"
            blurOnSubmit={false}
            ref={passwordInput}
            width={280}
          />

          <EyeIcon
            style={styles.eye}
            name={hidePass ? 'eye-slash' : 'eye'}
            size={15}
            color="grey"
            onPress={() => setHidePass(!hidePass)}
          />
        </View>

        <TouchableOpacity
          mode="contained"
          // style={styles.sideText}
          onPress={() => handleForgotPassword()}
        >
          <Text
            style={styles.sideText}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          mode="contained"
          style={styles.button}
          onPress={() => handleSignIn()}
        >
          <Text
            style={styles.buttonText}
          >
            Login
          </Text>
        </TouchableOpacity>
        <Text style={styles.bottomTextFine}>
          Don&apos;t have an account?
          <Text
            style={styles.bottomTextBold}
            onPress={() => handleSignUp()}
          >
            &nbsp;Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
