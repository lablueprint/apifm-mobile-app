import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TextInput, Alert, Text, Image,
} from 'react-native';
import {
  Title, Button,
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

const headerImage = require('../assets/imgs/header.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 844,
    width: 390,

  },
  titleText: {
    marginBottom: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#C4C4C4',
    borderRadius: 30,

  },
  back: {
    width: 20,
    marginRight: 18,
    backgroundColor: '#C4C4C4',

  },
  image: {
    width: 201,
    height: 55,
  },
  icon: {
    marginRight: 5,
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
  },
  textInput: {
    marginLeft: 7,
  },
  multiline: {
    marginLeft: 17,
    borderWidth: 1,
    height: 38,
    margin: 8.5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'gray',
    textAlignVertical: 'top',
  },
  header: {
    textAlign: 'left',
    width: '100%',
    fontSize: 18,
    marginLeft: 60,
  },
  text: {
    marginLeft: 17,
    marginTop: 5,
    width: 330,
    margin: 8.5,
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default function SignUpScreen({ navigation }) {
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
  const [recipient, setRecipient] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [zip, setZip] = useState('');
  const [instr, setInstr] = useState('');

  const addrInput = useRef();
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
    return false;
  };

  const handleSignUp = () => {
    if (address === '') {
      Alert.alert('Please enter the Address to proceed');
    } else if (zip === '' || isNaN(zip)) {
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
            recipient,
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
      setConfirmPassword('');
      setPassword('');
      setNumber('');
      setBusPhone('');
      setAddress('');
      setApt('');
      setZip('');
      setInstr('');
      navigation.navigate('Sign Up Confirmation');
    }
  };

  if (page1) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={headerImage} />
        <Title style={styles.titleText}>Sign Up</Title>
        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            returnKeyType="next"
            onSubmitEditing={() => { lastNameInput.current.focus(); }}
            blurOnSubmit={false}
            width={330}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            returnKeyType="next"
            onSubmitEditing={() => { organizationInput.current.focus(); }}
            blurOnSubmit={false}
            ref={lastNameInput}
            width={330}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={organization}
            onChangeText={setOrganization}
            placeholder="Organization (optional)"
            returnKeyType="next"
            onSubmitEditing={() => { emailInput.current.focus(); }}
            blurOnSubmit={false}
            ref={organizationInput}
            width={330}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => { numberInput.current.focus(); }}
            blurOnSubmit={false}
            ref={emailInput}
            width={330}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={number}
            onChangeText={setNumber}
            placeholder="Personal phone number"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => { busPhoneInput.current.focus(); }}
            blurOnSubmit={false}
            ref={numberInput}
            width={330}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={busPhone}
            onChangeText={setBusPhone}
            placeholder="Business phone number (optional)"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => { passwordInput.current.focus(); }}
            blurOnSubmit={false}
            ref={busPhoneInput}
            width={330}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            returnKeyType="next"
            secureTextEntry={!!hidePass}
            onSubmitEditing={() => { confirmPasswordInput.current.focus(); }}
            blurOnSubmit={false}
            ref={passwordInput}
            width={306}
          />
          <Icon
            style={styles.icon}
            name={hidePass ? 'eye-slash' : 'eye'}
            size={15}
            color="grey"
            onPress={() => setHidePass(!hidePass)}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            returnKeyType="next"
            secureTextEntry={!!hidePassConf}
            // onSubmitEditing={() => { numberInput.current.focus(); }}
            blurOnSubmit={false}
            ref={confirmPasswordInput}
            width={306}
          />
          <Icon
            style={styles.icon}
            name={hidePassConf ? 'eye-slash' : 'eye'}
            size={15}
            color="grey"
            onPress={() => setHidePassConf(!hidePassConf)}
          />
        </View>

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
      <View style={styles.text}>
        <Button
          style={styles.back}
          onPress={() => {
            setPage1(!page1);
          }}
        >
          Back
        </Button>
        <Image style={styles.image} source={headerImage} />
      </View>

      <Title style={styles.titleText}>Sign Up</Title>

      <Title style={styles.header}>Delivery Address</Title>

      <View style={styles.inputs}>
        <TextInput
          style={styles.textInput}
          value={recipient}
          onChangeText={setRecipient}
          placeholder="Organization name (optional)"
          returnKeyType="next"
          onSubmitEditing={() => { addrInput.current.focus(); }}
          blurOnSubmit={false}
          width={330}
        />
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.textInput}
          value={address}
          onChangeText={setAddress}
          placeholder="Street address"
          returnKeyType="next"
          onSubmitEditing={() => { aptInput.current.focus(); }}
          blurOnSubmit={false}
          ref={addrInput}
          width={330}
        />
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.textInput}
          value={apt}
          onChangeText={setApt}
          placeholder="Apt # (optional)"
          returnKeyType="next"
          onSubmitEditing={() => { zipInput.current.focus(); }}
          blurOnSubmit={false}
          ref={aptInput}
          width={330}
        />
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.textInput}
          value={zip}
          onChangeText={setZip}
          placeholder="Zip code"
          returnKeyType="next"
          textAlign="left"
          onSubmitEditing={() => { instrInput.current.focus(); }}
          blurOnSubmit={false}
          ref={zipInput}
          width={121}
        />
      </View>

      <View>
        <TextInput
          style={styles.multiline}
          value={instr}
          onChangeText={setInstr}
          placeholder="  Instructions for delivery (optional)"
          returnKeyType="next"
          blurOnSubmit={false}
          ref={instrInput}
          height={112}
          multiline
          numberOfLines={5}
          width={340}
        />

      </View>

      <View>
        <Text style={styles.text}>
          The address will be used for delivery and to calculate the order minimum for delivery.
        </Text>
      </View>

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

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
