import React, { useState, useEffect } from 'react';
import {
  Alert, View, StyleSheet, TextInput, Platform, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView,
} from 'react-native';
import {
  Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { mdiSourcePull } from '@mdi/js';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFA',
  },
  titleText: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitleText: {
    marginBottom: 50,
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    height: 50,
    marginBottom: 30,
    backgroundColor: '#FFFFFA',
    borderBottomWidth: 1,
    borderColor: '#868686',
  },
  labelText: {
    fontSize: 12,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#868686',
  },
  textInput: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 14,
    color: '#34221D',
    bottom: 6,
    right: 3,
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '40%',
    marginTop: 20,
    backgroundColor: '#FFFFFA',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'right',
    marginLeft: 'auto',
    top: 22,
    right: 0,
  },
  buttonTextTwo: {
    fontSize: 16,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'right',
    marginLeft: 'auto',
    botton: 215,
    right: 280,
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  edit: {
    position: 'absolute',
    left: 110,
    bottom: 0,
  },
  mainTitle: {
    fontSize: 16,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
});

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// eslint-disable-next-line no-unused-vars
export default function ProfileScreen({ navigation }) {
  const DUMMY_USER_ID = 'rec0hmO4UPOvtI3vA';
  const DUMMY_NAME = 'Joe Bruin';

  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');

  const [avatar, setAvatar] = useState(require('../assets/imgs/placeholder.png'));
  const [refresh, setRefresh] = useState('0');

  const retrieveAvatar = (useremail) => {
    base('Users').select({
      filterByFormula: `({email}='${useremail}')`,
    }).firstPage().then((record) => {
      switch (record[0].fields.avatarNum) {
        case 1: setAvatar(require('../assets/imgs/pipa.png'));
          break;
        case 2: setAvatar(require('../assets/imgs/eggplant.png'));
          break;
        case 3: setAvatar(require('../assets/imgs/mango.png'));
          break;
        case 4: setAvatar(require('../assets/imgs/dragonfruit.png'));
          break;
        case 5: setAvatar(require('../assets/imgs/lychee.png'));
          break;
        case 6: setAvatar(require('../assets/imgs/bokchoy.png'));
          break;
        default: setAvatar(require('../assets/imgs/placeholder.png'));
      }

      const userEmailTwo = 'happyhippo@gmail.com';
      setEmail(record[0].fields.email);
      setAddress(record[0].fields.address);
      setPhoneNum(record[0].fields['business phone']);
    });
  };

  useEffect(() => {
    const useremail = 'helen@gmail.com';
    retrieveAvatar(useremail);
  }, [refresh]);

  const [isEditMode, setEditMode] = useState(false);

  function onEdit() {
    setEditMode(true);
    setTitle('Save');
  }

  function onSave() {
    if (email.length > 1 && phoneNum.length > 1 && address.length > 1) {
      Alert.alert('Your changes have been saved.');
      setEditMode(false);
      setTitle('Edit');
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
  }

  function onCancel() {
    console.log('cancel');
    setEditMode(false);
    setTitle('Edit');
  }

  const [shouldShow, setShouldShow] = useState(true);

  const [title, setTitle] = useState('Edit');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View className="box">
          <Text
            style={styles.buttonText}
            onPress={() => {
              if (isEditMode) onSave();
              else onEdit();
            }}
          >

            {title}

          </Text>
          {isEditMode && (
            <View className="boxContent">
              <Text style={styles.buttonTextTwo} onPress={onCancel}>Cancel</Text>
            </View>
          )}

          <View style={styles.titleText}>
            <Text style={styles.mainTitle}>Profile</Text>
            <Image
              style={styles.image}
              source={avatar}
            />
            {!isEditMode && (
            <TouchableOpacity onPress={() => { navigation.navigate('EditAvatar'); }}>
              <Image
                style={styles.edit}
                source={require('../assets/imgs/edit.png')}
              />
            </TouchableOpacity>
            )}

            <Text style={styles.titleText}>
              {DUMMY_NAME}
            </Text>
            <Text style={styles.subtitleText}> Organization Name </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder={email}
              placeholderTextColor="#34221D"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
              width={330}
              editable={isEditMode}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={phoneNum}
              onChangeText={setPhoneNum}
              placeholderTextColor="#34221D"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
              width={330}
              editable={isEditMode}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Address</Text>
            <TextInput
              style={styles.textInput}
              value={address}
              onChangeText={setAddress}
              placeholderTextColor="#34221D"
              returnKeyType="next"
              blurOnSubmit={false}
              width={330}
              editable={isEditMode}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
