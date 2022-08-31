import React, { useState, useEffect } from 'react';
import {
  Alert, View, StyleSheet, TextInput, Platform,
  Image, TouchableOpacity, Keyboard, KeyboardAvoidingView,
} from 'react-native';
import {
  Text,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import store from '../lib/redux/store';
import { serviceUpdateUser } from '../lib/redux/services';

const Airtable = require('airtable');
const editIcon = require('../assets/imgs/edit.png');
const placeholder = require('../assets/imgs/placeholder.png');
const pipa = require('../assets/imgs/pipa.png');
const eggplant = require('../assets/imgs/eggplant.png');
const mango = require('../assets/imgs/mango.png');
const dragonfruit = require('../assets/imgs/dragonfruit.png');
const lychee = require('../assets/imgs/lychee.png');
const bokchoy = require('../assets/imgs/bokchoy.png');

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
    zIndex: 99,
  },
  buttonTextTwo: {
    fontSize: 16,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'right',
    marginLeft: 'auto',
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
  menuIcon: {
    width: '10%',
  },
});

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function ProfileScreen({ navigation }) {
  const currentUser = store.getState().auth.user;

  const [title, setTitle] = useState('Edit');
  const [isEditMode, setEditMode] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const [email, setEmail] = useState(currentUser.email);
  const [phoneNum, setPhoneNum] = useState(currentUser.phoneNumber);
  const [address, setAddress] = useState(currentUser.address);

  const [avatar, setAvatar] = useState(placeholder);

  useEffect(() => {
    switch (currentUser.avatarNum) {
      case 1: setAvatar(pipa);
        break;
      case 2: setAvatar(eggplant);
        break;
      case 3: setAvatar(mango);
        break;
      case 4: setAvatar(dragonfruit);
        break;
      case 5: setAvatar(lychee);
        break;
      case 6: setAvatar(bokchoy);
        break;
      default: setAvatar(placeholder);
    }
  }, [refresh]);

  const onEdit = () => {
    setEditMode(true);
    setTitle('Save');
  };

  const onSave = async () => {
    if (email.length > 1 && phoneNum.length > 1 && address.length > 1) {
      // TODO: add checker that the adjustments are different from what's already saved,
      // that way users don't always have the alert
      // TODO: add checker for email and phone number, can reuse checks from sign up screen
      Alert.alert('Your changes have been saved.');
      setEditMode(false);
      setTitle('Edit');
      await base('Users').update([
        {
          id: currentUser.id,
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
      const updatedUser = {
        ...currentUser, email, address, phoneNumber: phoneNum,
      };
      serviceUpdateUser(updatedUser);
    } else {
      Alert.alert('Please fill out all fields.');
    }
  };

  const onCancel = () => {
    setEditMode(false);
    setTitle('Edit');
  };

  return (
    // TODO: fix how the keyboard view blocks the text fields
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
          {isEditMode ? (
            <View className="boxContent">
              <Text style={styles.buttonTextTwo} onPress={onCancel}>Cancel</Text>
            </View>
          ) : (
            <View className="boxContent">
              <TouchableOpacity>
                <Icon
                  size={21}
                  name="menu"
                  color="#000000"
                  style={styles.menuIcon}
                  onPress={() => { navigation.toggleDrawer(); }}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.titleText}>
            <Text style={styles.mainTitle}>Profile</Text>
            <Image
              style={styles.image}
              source={avatar}
            />
            {isEditMode && (
            <TouchableOpacity onPress={() => { navigation.navigate('EditAvatar', { refresh, setRefresh }); }}>
              <Image
                style={styles.edit}
                source={editIcon}
              />
            </TouchableOpacity>
            )}

            <Text style={styles.titleText}>
              {currentUser.firstName}
              {' '}
              {currentUser.lastName}
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    toggleDrawer: PropTypes.func,
  }).isRequired,
};
