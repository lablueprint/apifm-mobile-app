import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TextInput, Alert, Text, Image, TouchableOpacity, ImageBackground,
} from 'react-native';
import {
  Title,
} from 'react-native-paper';
import Config from 'react-native-config';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import ArrowIcon from 'react-native-vector-icons/AntDesign';

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

export default function SignUpBillingScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [zip, setZip] = useState('');

  const addrInput = useRef();
  const aptInput = useRef();
  const zipInput = useRef();

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundimage}>
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

      <View style={styles.container}>
        <Text style={styles.titleText}>Sign Up</Text>

        <Title style={styles.header}>Billing Address</Title>
        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={fullName}
            onChangeText={setFullName}
            placeholder="First and last name"
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
            returnKeyType="done"
            textAlign="left"
            blurOnSubmit={false}
            ref={zipInput}
            width={121}
          />
        </View>

        <Title style={styles.header}>Accounting Contact</Title>

        <TouchableOpacity
          mode="contained"
          style={styles.button}
          onPress={() => {
            navigation.navigate('Sign Up Confirmation');
          }}
        >
          <Text style={styles.buttonText}> Continue </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>

  );
}

SignUpBillingScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
