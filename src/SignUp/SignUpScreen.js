import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, ScrollView, TextInput, Keyboard,
  Alert, Text, Image, TouchableOpacity, ImageBackground,
} from 'react-native';
import {
  Title, Checkbox, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { add, set } from 'lodash';
import { registerUser } from '../lib/airlock/airlock';

const foodrootslogo = require('../assets/imgs/foodrootsharvest.png');
const backgroundImage = require('../assets/imgs/signin.png');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: 60,
    width: 300,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#1D763C',
    borderRadius: 30,
    fontFamily: 'JosefinSans-SemiBold',
  },
  backArrow: {
    paddingLeft: 25,
    position: 'absolute',
    top: 10,
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
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
    flexDirection: 'row',
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
    width: 330,
    flexDirection: 'row',
    textAlign: 'center',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 28,
    color: '#1D763C',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: 'white',
    marginTop: 3,
  },
  termsContainer: {
    marginLeft: '6%',
    marginRight: '6%',
    width: '88%',
    height: '100%',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1%',
    height: '100%',
    width: '100%',
  },
  termsBackArrow: {
    position: 'absolute',
    right: 0,
    marginLeft: '-100%',
    margin: 'auto',
  },
  headerImage: {
    marginTop: '7%',
    width: '50%',
    height: '60%',
  },
  title: {
    marginTop: '5%',
    fontSize: 28,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#1D763C',
    alignSelf: 'center',
  },
  subTitle: {
    marginTop: '9%',
    marginBottom: '3%',
    fontSize: 17,
    fontFamily: 'JosefinSans-Bold',
    color: '#1D763C',
  },
  termsBox: {
    maxHeight: '55%',
  },
  termsBoxText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    fontSize: 16,
    padding: 12,
    fontFamily: 'JosefinSans-Regular',
    color: '#5D5D5D',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '-12%',
    marginBottom: '5%',
  },
  checkbox: {
    margin: 16,
    fontSize: 100,
    color: '#1D763C',
    backgroundColor: '#1D763C',
    onTintColor: '#1D763C',
    onCheckColor: '#1D763C',
  },
  bottomText: {
    marginTop: '1%',
    fontSize: 15,
    fontFamily: 'JosefinSans-SemiBold',
  },
  signUpButtonUnchecked: {
    marginTop: 20,
    marginBottom: '15%',
    borderRadius: 99,
    height: 50,
    backgroundColor: '#E5E5E5',
  },
  signUpButtonChecked: {
    marginTop: 20,
    marginBottom: '15%',
    borderRadius: 99,
    height: 50,
    backgroundColor: '#1D763C',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-SemiBold',
    textTransform: 'none',
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
  const handleSignUp = async () => {
    if (!agree) {
      Alert.alert('Please read and agree with the Terms and Conditions to proceed');
    } else {
      try {
        const userData = {
          email,
          password,
          firstName,
          lastName,
          organization,
          number,
          busPhone,
          recipient,
          address,
          apt,
          zip,
          instr,
          fullName,
          billAddress,
          billApt,
          billZip,
          accFullName,
          accEmail,
          accNumber,
        };
        const result = await registerUser(userData);
        if (result) {
          setEmail('');
          setPassword('');
          setFirstName('');
          setLastName('');
          setOrganization('');
          setNumber('');
          setBusPhone('');
          setRecipient('');
          setAddress('');
          setApt('');
          setZip('');
          setInstr('');
          setFullName('');
          setBillAddress('');
          setBillZip('');
          setAccFullName('');
          setAccEmail('');
          setAccNumber('');
          navigation.navigate('Sign Up Confirmation', {
            username: email,
            password,
          });
        }
      } catch (err) {
        Alert.alert(err.error, err.message);
      }
    }
  };

  if (page === 1) {
    return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>
        <TouchableOpacity onPress={() => { navigation.navigate('Log In'); }}>
          <ArrowIcon
            style={styles.backArrow}
            name="arrowleft"
            size={34}
            color="#FF9F00"
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <Image style={styles.image} source={foodrootslogo} />

          <Text style={styles.titleText}>Sign up</Text>
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
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
          <TouchableOpacity onPress={() => { setPage(1); }}>
            <ArrowIcon
              style={styles.backArrow}
              name="arrowleft"
              size={34}
              color="#FF9F00"
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.image} source={foodrootslogo} />

            <Title style={styles.titleText}>Sign up</Title>

            <Title style={styles.header}>Delivery address</Title>

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

            <View style={[styles.inputs, { alignSelf: 'flex-start', left: '4.5%' }]}>
              <TextInput
                style={[styles.textInput]}
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
                onEndEditing={() => { Keyboard.dismiss(); }}
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
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }

  if (page === 3) {
    return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TouchableOpacity onPress={() => { setPage(2); }}>
            <ArrowIcon
              style={styles.backArrow}
              name="arrowleft"
              size={34}
              color="#FF9F00"
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.image} source={foodrootslogo} />

            <Text style={styles.titleText}>Sign up</Text>

            <Title style={styles.header}>Billing address</Title>
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

            <View style={[styles.inputs, { alignSelf: 'flex-start', left: '4.5%' }]}>
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

            <View style={styles.inputs}>
              <TextInput
                style={styles.textInput}
                value={accFullName}
                onChangeText={setAccFullName}
                placeholder="First and last name"
                returnKeyType="next"
                onSubmitEditing={() => { accEmailInput.current.focus(); }}
                blurOnSubmit={false}
                ref={accNameInput}
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
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>
      <View style={styles.termsContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => { setPage(3); }}>
            <ArrowIcon
              style={styles.termsBackArrow}
              name="arrowleft"
              size={34}
              color="#FF9F00"
            />
          </TouchableOpacity>
          <Image style={styles.headerImage} source={foodrootslogo} />
        </View>
        <Text
          style={styles.title}
        >
          Sign up
        </Text>
        <Text style={styles.subTitle}> Terms and Conditions </Text>
        <ScrollView style={styles.termsBox}>
          <Text
            style={styles.termsBoxText}
          >
            I agree to submit the full invoice amount within 15 days of receipt of the produce.
            (Failure to pay the full invoice amount within 15 days of receipt will result in a
            10% late fee added each week beginning on the 3rd week and continuing until the 5th
            week. Upon the 6th week of no payment the debt will be submitted to a debt
            collection agency.)
            {'\n\n'}
            I understand that I have the right to inspect and certify each produce item I receive
            is in good condition. (Any requests for refunds or exchanges made after signed receipt
            of the produce is at the full discretion of Food Roots. Approved requests for refunds or
            exchanges requires, but is not limited to: photo evidence, a full description of what is
            wrong with the produce and must be received within 24 hours of the initial delivery.)
          </Text>
        </ScrollView>
        <View style={styles.iconContainer}>
          <Checkbox
            status={agree ? 'checked' : 'unchecked'}
            onPress={() => {
              setAgree(!agree);
            }}
            color="#1D763C"
            uncheckedColor="#1D763C"
          />
          <Text style={styles.bottomText}>
            I have read, understood, and agree with the Terms and Conditions.
          </Text>
        </View>
        <Button
          style={agree ? styles.signUpButtonChecked : styles.signUpButtonUnchecked}
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>
            Sign up
          </Text>
        </Button>
      </View>
    </ImageBackground>
  );
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
