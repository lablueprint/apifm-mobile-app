import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [hidePass, setHidePass] = useState(true);

  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const numberInput = useRef();
  const addressInput = useRef();

  const handleSignUp = () => {
    base('Users').create([
      {
        fields: {
          email,
          password,
          'first name': firstName,
          'last name': lastName,
          'phone number': number,
          address,
        },
      },
    ], (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record) => {
        console.log(record.getId());
      });
    });
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    // console.log(password);
    // console.log(number);
    // console.log(address);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setNumber('');
    setAddress('');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}> SignInScreen  :) </Title>
      <Text style={styles.bodyText}>
        Welcome to APIFM! This button will
        take you to the marketplace.
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Marketplace')}
      >
        MARKETPLACE
      </Button>

      <Title style={styles.titleText}>Sign Up Form</Title>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="first name"
        returnKeyType="next"
        onSubmitEditing={() => { lastNameInput.current.focus(); }}
        blurOnSubmit={false}
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="last name"
        returnKeyType="next"
        onSubmitEditing={() => { emailInput.current.focus(); }}
        blurOnSubmit={false}
        ref={lastNameInput}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email"
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
          placeholder="password"
          returnKeyType="next"
          secureTextEntry={!!hidePass}
          onSubmitEditing={() => { numberInput.current.focus(); }}
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

      <TextInput
        value={number}
        onChangeText={setNumber}
        placeholder="phone number"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => { addressInput.current.focus(); }}
        blurOnSubmit={false}
        ref={numberInput}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="address"
        ref={addressInput}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSignUp}
      >
        Sign Up
      </Button>
    </View>
  );
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
