import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TextInput, Alert,
} from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import Config from 'react-native-config';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [busPhone, setBusPhone] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hidePassConf, setHidePassConf] = useState(true);

  const lastNameInput = useRef();
  const organizationInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const numberInput = useRef();
  const busPhoneInput = useRef();

  const handleSignUp = () => {
    if (firstName === '') {
      Alert.alert('Please enter the First Name to proceed');
      // return 1;
    } else if (lastName === '') {
      Alert.alert('Please enter the Last Name to proceed');
      // return 1;
    } else if (email === '') {
      Alert.alert('Please enter the Email to proceed');
      // return 1;
    } else if (password === '') {
      Alert.alert('Please enter the Password to proceed');
      // return 1;
    } else if (number === '') {
      Alert.alert('Please enter the Personal phone number to proceed');
      // return 1;
    } else if (password !== confirmPassword) {
      Alert.alert('Password Confirmation does not match Password');
    } else {
      navigation.navigate('SignIn2');
    }
    // return 0;
  };

  return (
    <View style={styles.container}>

      <Title style={styles.titleText}>Sign Up Form</Title>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First name"
        returnKeyType="next"
        onSubmitEditing={() => { lastNameInput.current.focus(); }}
        blurOnSubmit={false}
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last name"
        returnKeyType="next"
        onSubmitEditing={() => { organizationInput.current.focus(); }}
        blurOnSubmit={false}
        ref={lastNameInput}
      />
      <TextInput
        value={organization}
        onChangeText={setOrganization}
        placeholder="Organization (optional)"
        returnKeyType="next"
        onSubmitEditing={() => { emailInput.current.focus(); }}
        blurOnSubmit={false}
        ref={organizationInput}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => { passwordInput.current.focus(); }}
        blurOnSubmit={false}
        ref={emailInput}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          returnKeyType="next"
          secureTextEntry={!!hidePass}
          onSubmitEditing={() => { confirmPasswordInput.current.focus(); }}
          blurOnSubmit={false}
          ref={passwordInput}
        />
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          returnKeyType="next"
          secureTextEntry={!!hidePassConf}
          onSubmitEditing={() => { numberInput.current.focus(); }}
          blurOnSubmit={false}
          ref={confirmPasswordInput}
        />
        <Icon
          name={hidePassConf ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => setHidePassConf(!hidePassConf)}
        />
      </View>

      <TextInput
        value={number}
        onChangeText={setNumber}
        placeholder="Personal phone number"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => { busPhoneInput.current.focus(); }}
        blurOnSubmit={false}
        ref={numberInput}
      />

      <TextInput
        value={busPhone}
        onChangeText={setBusPhone}
        placeholder="Business phone number (optional)"
        keyboardType="numeric"
        returnKeyType="next"
        blurOnSubmit={false}
        ref={busPhoneInput}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          handleSignUp();
        }}
      >
        Continue
      </Button>

    </View>
  );
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
