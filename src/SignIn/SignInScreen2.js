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
  const [number, setNumber] = useState('');
  const [busPhone, setBusPhone] = useState('');
  const [address, setAddress] = useState('');
  const [hidePass, setHidePass] = useState(true);

  const lastNameInput = useRef();
  const organizationInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const numberInput = useRef();
  const busPhoneInput = useRef();
  const addressInput = useRef();

  const handleSignUp = () => {
    if (firstName === '') {
      Alert.alert('Please enter the First Name to proceed');
    } else if (lastName === '') {
      Alert.alert('Please enter the Last Name to proceed');
    } else if (email === '') {
      Alert.alert('Please enter the Email to proceed');
    } else if (password === '') {
      Alert.alert('Please enter the Password to proceed');
    } else if (number === '') {
      Alert.alert('Please enter the Personal phone number to proceed');
    } else {
      base('Users').create([
        {
          fields: {
            email,
            password,
            'first name': firstName,
            'last name': lastName,
            organization,
            'personal phone': number,
            'business phone': busPhone,
            address,
          },
        },
      ], (err) => {
        if (err) {
          // Alert.alert(err);
          Alert.alert(err, err.message);
        }
      });
      setFirstName('');
      setLastName('');
      setOrganization('');
      setEmail('');
      setPassword('');
      setNumber('');
      setBusPhone('');
      // setBusPhone('');
      setAddress('');
    }
  };

  return (
    <View style={styles.container}>

      <Title style={styles.titleText}>Sign Up Form</Title>

      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Street address"
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
