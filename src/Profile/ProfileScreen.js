import React, { useState } from 'react';
import {
  Alert, View, StyleSheet, TextInput,
} from 'react-native';
import {
  Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    backgroundColor: '#FFFFFA',
  },
  titleText: {
    marginBottom: 5,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 28,
  },
  subtitleText: {
    marginBottom: 10,
    fontFamily: 'JosefinSans-Regular',
    fontSize: 20,
  },
  inputContainer: {
    height: 50,
    margin: 5,
    backgroundColor: '#FFFFFA',
  },
  textInput: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    color: '#34221D',
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '40%',
    marginTop: 20,
    backgroundColor: '#1D763C',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 3,
  },
});

// eslint-disable-next-line no-unused-vars
export default function ProfileScreen({ navigation }) {
  // TODO: remove when sign-in is implemented
  const DUMMY_USER_ID = 'recPExZT2DNDYUKCz';
  const DUMMY_NAME = 'Joe Bruin';

  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');

  // When save changes is clicked, fields belonging to this user will be updated
  const handleSaveChanges = () => {
    // as long as the fields aren't empty, the fields will be updated in airtable
    if (email.length > 1 && phoneNum.length > 1 && address.length > 1) {
      Alert.alert('Your changes have been saved.');
      // Airtable call to update fields
      base('Users').update([
        {
          id: DUMMY_USER_ID,
          fields: {
            email,
            address,
            'personal phone': phoneNum,
          },
        },
      ], (err) => {
        if (err) {
          Alert.alert(err.error, err.message);
        }
      });
    } else {
      Alert.alert('Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleText}>
        <Icon style={{ fontSize: 80, color: '#EDFAD3' }} name="account-circle" />
        <Icon style={{ fontSize: 30, color: '#1D763C' }} name="pencil-circle-outline" />
        <Text style={styles.titleText}>
          {DUMMY_NAME}
        </Text>
        <Text style={styles.subtitleText}> Organization Name </Text>
      </View>
      {/* Start of text input region */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          keyboardType="email-address"
          returnKeyType="next"
          blurOnSubmit={false}
          width={330}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={phoneNum}
          onChangeText={setPhoneNum}
          placeholder="Phone number"
          keyboardType="numeric"
          returnKeyType="next"
          blurOnSubmit={false}
          width={330}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={address}
          onChangeText={setAddress}
          placeholder="Street address"
          returnKeyType="next"
          blurOnSubmit={false}
          width={330}
        />
      </View>
      {/* End of text input region for email, phone, address */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSaveChanges}
      >
        <Text styles={styles.buttonText}> Save changes </Text>
      </Button>
    </View>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
