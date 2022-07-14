import React, { useState } from 'react';
import {
  View, StyleSheet, Image, Alert,
} from 'react-native';
import {
  Title, Text, Button, TextInput, Subheading,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'react-native-config';
import { mdiSourcePull } from '@mdi/js';

const Airtable = require('airtable');
const profilePicture = require('../assets/imgs/profilepic.png');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // titleText: {
  //   marginBottom: 10,
  // },
  // bodyText: {
  //   marginLeft: 5,
  //   marginRight: 5,
  // },
  // button: {
  //   width: '30%',
  //   marginTop: 10,
  //   backgroundColor: '#0492c2',
  // },
});

export default function ProfileScreen({ navigation }) {
  // attempt :
  const DUMMY_USER_ID = 'recmv4QJMaIkf11rR';
  const DUMMY_NAME = 'Sunflower Moo';

  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');

  // save changes made to field
  const handleSaveChanges = () => {
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
      Alert.alert('Please fill out all fields');
    }
  };

  // base('Users').find('recIpBFqr2EXNbS7d', (err, record) => {
  //   if (err) { console.error(err); return; }
  //   console.log('Retrieved', record.id);
  //   const recordID = record.id;
  // });

  return (
    <View style={styles.container}>
      <Image source={profilePicture} />
      <Title style={styles.titleText}>
        {' '}
        {DUMMY_NAME}
        {' '}
      </Title>
      <Subheading>Organization Name</Subheading>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          mode="transparent"
          label="Email"
          width={330}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          value={phoneNum}
          onChangeText={setPhoneNum}
          placeholder="phone Number"
          keyboardType="numeric"
          returnKeyType="next"
          mode="transparent"
          label="Phone Number"
          width={330}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          returnKeyType="next"
          mode="transparent"
          label="Address"
          width={330}
        />
      </View>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Marketplace')}
        onPress={handleSaveChanges}
      >
        MARKETPLACE
        <Text styles={styles.buttonText}> save changes </Text>
      </Button>
    </View>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
