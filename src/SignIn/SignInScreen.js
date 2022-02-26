import React, { useState, setState, useRef } from 'react';
import {
  View, StyleSheet, TextInput, Alert,
} from 'react-native';
import {
  View, StyleSheet, TextInput, Alert,
} from 'react-native';
import {
  Title, Button,
} from 'react-native-paper';
import Config from 'react-native-config';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { State } from 'react-native-gesture-handler';
// import SignInScreen2 from './SignInScreen2';


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
  // first page states:
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

  // second page states:
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [zip, setZip] = useState('');
  const [instr, setInstr] = useState('');

  const aptInput = useRef();
  const zipInput = useRef();
  const instrInput = useRef();

  const [page1, setPage1] = useState(true);

  const checkInputs = () => {
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
    } else if (password !== confirmPassword) {
      Alert.alert('Password Confirmation does not match Password');
    } else {
      return true;
    }
    // else {
    //   navigation.navigate('SignIn2');
    // }
  };

  const handleSignUp = () => {
    if (address === '') {
      Alert.alert('Please enter the Address to proceed');
    } else if (zip === '') {
      Alert.alert('Please enter the Zipcode to proceed');
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
            apt,
            zip,
            instr,
          },
        },
      ], (err) => {
        if (err) {
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
      setAddress('');
      setApt('');
      setZip('');
      setInstr('');
      navigation.navigate('SignIn2');
    }
  };

  if (page1) {
    return (
      <View style={styles.container}>

        <Title style={styles.titleText}>Sign Up</Title>

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

        {/* <SignInScreen2 data={firstName.data} /> */}
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            if (checkInputs()) {
              setPage1(!page1);
            }
          }}
        >
          Continue
        </Button>

      </View>
    );
  }

  // second page:
  return (
    <View style={styles.container}>

      <Title style={styles.titleText}>Sign Up</Title>

      <Text>Delivery Address</Text>

      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Street address"
        returnKeyType="next"
        onSubmitEditing={() => { aptInput.current.focus(); }}
        blurOnSubmit={false}
      />
      <TextInput
        value={apt}
        onChangeText={setApt}
        placeholder="Apt # (optional)"
        returnKeyType="next"
        onSubmitEditing={() => { zipInput.current.focus(); }}
        blurOnSubmit={false}
        ref={aptInput}
      />
      <TextInput
        value={zip}
        onChangeText={setZip}
        placeholder="Zip Code"
        returnKeyType="next"
        onSubmitEditing={() => { instrInput.current.focus(); }}
        blurOnSubmit={false}
        ref={zipInput}
      />
      <TextInput
        value={instr}
        onChangeText={setInstr}
        placeholder="Instructions for delivery (optional)"
        returnKeyType="next"
        blurOnSubmit={false}
        ref={instrInput}
      />

      <Text>
        The address will be used for delivery and to calculate the order minimum for delivery.
      </Text>


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
