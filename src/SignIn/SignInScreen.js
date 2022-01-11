import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

// const Airtable = require('airtable');

// const airtableConfig = {
//   apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
//   baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
// };

// const base = new Airtable({ apiKey: airtableConfig.apiKey })
//   .base(airtableConfig.baseKey);

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

  const handleSignUp = () => {
    // base('Users').create([
    //   {
    //     fields: {
    //       email,
    //       password,
    //       firstName,
    //       lastName,
    //       phoneNumber: number,
    //       address,
    //     },
    //   },
    // ], (err, records) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   records.forEach((record) => {
    //     console.log(record.getId());
    //   });
    // });

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(number);
    console.log(address);
    console.log(process.env.REACT_APP_AIRTABLE_BASE_KEY);
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
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="last name"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        keyboardType="email-address"
      />
      <View style={{ flexDirection: 'row',  alignItems: 'center'}}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry = {hidePass ? true : false}
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
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="address"
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
