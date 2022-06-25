import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TextInput, Keyboard, Alert, Text, Image, TouchableOpacity, ImageBackground,
} from 'react-native';
import {
  Title,
} from 'react-native-paper';
import Config from 'react-native-config';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import CheckboxIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Airtable = require('airtable');
const backgroundImage = require('../assets/imgs/signin.png');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const headerImage = require('../assets/imgs/header.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    height: 844,
    width: '100%',
    padding: '8%',

  },
  button: {
    marginTop: 10,
    width: 300,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#1D763C',
    borderRadius: 30,
    fontFamily: 'JosefinSans-SemiBold',

  },
  backArrow: {
    paddingLeft: 15,
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: 30,
    width: 350,
  },
  image: {
    width: 201,
    height: 55,
    marginLeft: 25,
  },
  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  inputs: {
    borderWidth: 0.25,
    height: 38,
    margin: 7.5,
    // marginLeft: 30,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: (134, 134, 134, 0.31),
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  textInput: {
    marginLeft: 7,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 14,
  },
  multiline: {
    marginLeft: 17,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 14,
    borderWidth: 0.25,
    height: 38,
    margin: 8.5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: (134, 134, 134, 0.31),
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  header: {
    textAlign: 'left',
    width: '100%',
    fontSize: 18,
    marginLeft: 60,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#1D763C',
  },
  descriptext: {
    textAlign: 'center',
    fontSize: 14,
    width: 323,
    height: 40,
    marginLeft: 10,
    fontFamily: 'JosefinSans-Light',
    color: '#1D763C',
    marginBottom: 20,

  },
  titleText: {
    marginLeft: 17,
    width: 330,
    margin: 8.5,
    flexDirection: 'row',
    // alignItems: 'center',
    // textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 28,
    color: '#1D763C',
  },
  buttonText: {
    // marginTop: 6,
    fontSize: 20,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: 'white',
    marginTop: 3,
  },
});

export default function SignUpScreen({ navigation }) {
  const [page, setPage] = useState(1);

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

  // third page states:
  const [fullName, setFullName] = useState('');
  const [billAddress, setBillAddress] = useState('');
  const [billApt, setBillApt] = useState('');
  const [billZip, setBillZip] = useState('');

  const [accFullName, setAccFullName] = useState('');
  const [accEmail, setAccEmail] = useState('');
  const [accNumber, setAccNumber] = useState('');

  const billAddrInput = useRef();
  const billAptInput = useRef();
  const billZipInput = useRef();
  const accNameInput = useRef();
  const accEmailInput = useRef();
  const accNumberInput = useRef();

  // fourth page states:
  const [agree, setAgree] = useState(false);

  // submission checking and creating
  const validateEmail = (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  const onTextChange = (val, text) => {
    const cleaned = (`${text}`).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '');
      const num = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
      if (cleaned.length > 10) {
        Alert.alert('Please enter a 10-digit phone number');
      } else if (val === 'number') {
        setNumber(num.toString());
      } else if (val === 'busPhone') {
        setBusPhone(num.toString());
      } else {
        setAccNumber(num.toString());
      }
      return (true);
    }

    if (cleaned.length > 10) {
      Alert.alert('Please enter a valid phone number');
    } else if (val === 'number') {
      setNumber(text.toString());
    } else if (val === 'busPhone') {
      setBusPhone(text.toString());
    } else {
      setAccNumber(text.toString());
    }

    if (((val === 'busPhone') && (text.length === 0)) || (val === 'accNum' && text.length === 0)) {
      return (true);
    }

    return (false);
  };

  const checkAccountInputs = () => {
    if (firstName === '') {
      Alert.alert('Please enter the First Name to proceed');
    } else if (lastName === '') {
      Alert.alert('Please enter the Last Name to proceed');
    } else if (organization === '') {
      Alert.alert('Please enter the Organization to proceed');
    } else if (email === '') {
      Alert.alert('Please enter an Email to proceed');
    } else if (!validateEmail(email)) {
      Alert.alert('Please enter a valid Email to proceed');
    } else if (password === '') {
      Alert.alert('Please enter the Password to proceed');
    } else if (number === '') {
      Alert.alert('Please enter the Personal phone number to proceed');
    } else if (password.length < 9) {
      Alert.alert('Password must be longer than 8 characters');
    } else if (password !== confirmPassword) {
      Alert.alert('Password Confirmation does not match Password');
    } else if ((!onTextChange('number', number)) || (!onTextChange('busPhone', busPhone))) {
      Alert.alert('Please enter a valid phone number');
    } else {
      return true;
    }
    return false;
  };

  const checkDeliveryInputs = () => {
    if (recipient === '') {
      Alert.alert('Please enter the Delivery Recepient to proceed');
    } else if (address === '') {
      Alert.alert('Please enter the Address to proceed');
    // eslint-disable-next-line no-restricted-globals
    } else if (zip === '' || isNaN(zip) || (zip.length !== 5)) {
      Alert.alert('Please enter a valid Zipcode to proceed');
    } else {
      return true;
    }
    return false;
  };

  const checkBillingInputs = () => {
    if (fullName === '') {
      Alert.alert('Please enter the First and Last name to proceed');
    } else if (billAddress === '') {
      Alert.alert('Please enter the Street Address to proceed');
    // eslint-disable-next-line no-restricted-globals
    } else if (billZip === '' || isNaN(billZip) || (billZip.length !== 5)) {
      Alert.alert('Please enter a valid Zipcode to proceed');
    } else if (accFullName === '') {
      Alert.alert('Please enter a valid accounting First and Last name to proceed');
    } else if (accEmail === '' || !validateEmail(accEmail)) {
      Alert.alert('Please enter a valid Email to proceed');
    } else if (accNumber === '' || !onTextChange('accNum', accNumber)) {
      Alert.alert('Please enter a valid Phone Number to proceed');
    } else {
      return true;
    }
    return false;
  };

  // add the new inputs
  const handleSignUp = () => {
    if (!agree) {
      Alert.alert('Please read and agree with the Terms and Conditions to proceed');
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
            'delivery recipient': recipient,
            address,
            'apartment number': apt,
            zipcode: zip,
            instructions: instr,
            'billing name': fullName,
            'billing address': billAddress,
            'billing apartment number': billApt,
            'billing zipcode': billZip,
            'accounting name': accFullName,
            'accounting email': accEmail,
            'accounting phone': accNumber,
          },
        },
      ], (error) => {
        if (error) {
          Alert.alert('Error!', error.message);
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
      // might need to set the new inputs to empty strings but likely not?
      navigation.navigate('Sign Up Confirmation');
    }
  };

  if (page === 1) {
    return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>
        <View style={styles.container}>
          <View style={styles.text}>

            <TouchableOpacity onPress={() => { navigation.navigate('Log In'); }}>
              {/* <Image source={backArrow} /> */}
              <ArrowIcon
                style={styles.backArrow}
                name="arrowleft"
                size={34}
                color="#FF9F00"
              />
            </TouchableOpacity>

            <Image style={styles.image} source={headerImage} />
          </View>

          <Text style={styles.titleText}>Sign Up</Text>
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
              placeholder="Organization"
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
              onChangeText={(text) => onTextChange('number', text)}
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
              onChangeText={(text) => onTextChange('busPhone', text)}
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
              passwordRules="minlength: 8;"
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
              returnKeyType="done"
              secureTextEntry={!!hidePassConf}
              onSubmitEditing={() => { Keyboard.dismiss(); }}
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

          <TouchableOpacity
            mode="contained"
            style={styles.button}
            onPress={() => {
              if (checkAccountInputs()) {
                Keyboard.dismiss();
                setPage(2);
              }
            }}
          >
            <Text style={styles.buttonText}> Continue </Text>
          </TouchableOpacity>

        </View>

      </ImageBackground>
    );
  }

  // second page:
  if (page === 2) {
    return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>
        <View style={styles.container}>

          <View style={styles.text}>

            <TouchableOpacity onPress={() => { setPage(1); }}>
              <ArrowIcon
                style={styles.backArrow}
                name="arrowleft"
                size={34}
                color="#FF9F00"
              />
            </TouchableOpacity>

            <Image style={styles.image} source={headerImage} />
          </View>

          <Title style={styles.titleText}>Sign Up</Title>

          <Title style={styles.header}>Delivery Address</Title>

          <View style={styles.inputs}>
            <TextInput
              style={styles.textInput}
              value={recipient}
              onChangeText={setRecipient}
              placeholder="Delivery recepient (first and last name)"
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
              textContentType="postalCode"
              placeholder="Apt # (optional)"
              returnKeyType="next"
              onSubmitEditing={() => { zipInput.current.focus(); }}
              blurOnSubmit={false}
              ref={aptInput}
              width={330}
            />
          </View>

          <View style={[styles.inputs, { alignSelf: 'flex-start' }]}>
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
              returnKeyType="done"
              onSubmitEditing={() => { Keyboard.dismiss(); }}
              blurOnSubmit={false}
              ref={instrInput}
              height={112}
              multiline
              numberOfLines={5}
              width={340}
            />

          </View>

          <View>
            <Text style={styles.descriptext}>
              The address will be used for delivery and to
              calculate the order minimum for delivery.
            </Text>
          </View>

          <TouchableOpacity
            mode="contained"
            style={styles.button}
            onPress={() => {
              if (checkDeliveryInputs()) {
                Keyboard.dismiss();
                setPage(3);
              }
            }}
          >
            <Text style={styles.buttonText}> Continue </Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  }

  if (page === 3) {
    return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>
        <View style={styles.container}>
          <View style={styles.text}>
            <TouchableOpacity onPress={() => { setPage(2); }}>
              <ArrowIcon
                style={styles.backArrow}
                name="arrowleft"
                size={34}
                color="#FF9F00"
              />
            </TouchableOpacity>
            <Image style={styles.image} source={headerImage} />
          </View>

          <Text style={styles.titleText}>Sign Up</Text>

          <Title style={styles.header}>Billing Address</Title>
          <View style={styles.inputs}>
            <TextInput
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
              placeholder="First and last name"
              returnKeyType="next"
              onSubmitEditing={() => { billAddrInput.current.focus(); }}
              blurOnSubmit={false}
              width={330}
            />
          </View>

          <View style={styles.inputs}>
            <TextInput
              style={styles.textInput}
              value={billAddress}
              onChangeText={setBillAddress}
              placeholder="Street address"
              returnKeyType="next"
              onSubmitEditing={() => { billAptInput.current.focus(); }}
              blurOnSubmit={false}
              ref={billAddrInput}
              width={330}
            />
          </View>

          <View style={styles.inputs}>
            <TextInput
              style={styles.textInput}
              value={billApt}
              onChangeText={setBillApt}
              textContentType="postalCode"
              placeholder="Apt # (optional)"
              returnKeyType="next"
              onSubmitEditing={() => { billZipInput.current.focus(); }}
              blurOnSubmit={false}
              ref={billAptInput}
              width={330}
            />
          </View>

          <View style={[styles.inputs, { alignSelf: 'flex-start' }]}>
            <TextInput
              style={styles.textInput}
              value={billZip}
              onChangeText={setBillZip}
              placeholder="Zip code"
              returnKeyType="next"
              onSubmitEditing={() => { accNameInput.current.focus(); }}
              textAlign="left"
              blurOnSubmit={false}
              ref={billZipInput}
              width={121}
            />
          </View>

          <Title style={styles.header}>Accounting Contact</Title>
          <Text>If different from account information</Text>

          <View style={styles.inputs}>
            <TextInput
              style={styles.textInput}
              value={accFullName}
              onChangeText={setAccFullName}
              placeholder="First and last name"
              returnKeyType="next"
              onSubmitEditing={() => { accEmailInput.current.focus(); }}
              blurOnSubmit={false}
              width={330}
            />
          </View>

          <View style={styles.inputs}>
            <TextInput
              style={styles.textInput}
              value={accEmail}
              onChangeText={setAccEmail}
              placeholder="Email address"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => { accNumberInput.current.focus(); }}
              blurOnSubmit={false}
              ref={accEmailInput}
              width={330}
            />
          </View>

          <View style={styles.inputs}>
            <TextInput
              style={styles.textInput}
              value={accNumber}
              onChangeText={(text) => onTextChange('accNum', text)}
              placeholder="Phone number"
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={() => { Keyboard.dismiss(); }}
              blurOnSubmit={false}
              ref={accNumberInput}
              width={330}
            />
          </View>

          <TouchableOpacity
            mode="contained"
            style={styles.button}
            onPress={() => {
              if (checkBillingInputs()) {
                setPage(4);
              }
            }}
          >
            <Text style={styles.buttonText}> Continue </Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>
      <View style={styles.container}>
        <View style={styles.text}>
          <TouchableOpacity onPress={() => { setPage(3); }}>
            <ArrowIcon
              style={styles.backArrow}
              name="arrowleft"
              size={34}
              color="#FF9F00"
            />
          </TouchableOpacity>
          <Image style={styles.image} source={headerImage} />
        </View>

        <Text style={styles.titleText}>Sign Up</Text>

        <Title style={styles.header}>Terms and Conditions</Title>
        <Text>
          I agree to submit the full invoice amount within 15 days of receipt of the produce.
          (Failure to pay the full invoice amount within 15 days of receipt will result in a
          10% late fee added each week beginning on the 3rd week and continuing until the 5th
          week. Upon the 6th week of no payment the debt will be submitted to a debt collection
          agency.)
          I understand that I have the right to inspect and certify each produce item I receive
          is in good condition. (Any requests for refunds or exchanges made after signed receipt
          of the produce is at the full discretion of Food Roots. Approved requests for refunds
          or exchanges requires, but is not limited to: photo evidence, a full description of what
          is wrong with the produce and must be received within 24 hours of the initial delivery.)
        </Text>
        <TouchableOpacity onPress={() => { setAgree(!agree); }}>
          <CheckboxIcon name={agree ? 'close-box-outline' : 'checkbox-blank-outline'} size={20} />
        </TouchableOpacity>
        <Text>I have read, understood, and agree with the Terms and Conditions.</Text>
        <TouchableOpacity
          mode="contained"
          style={styles.button}
          onPress={() => { handleSignUp(); }}
        >
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
