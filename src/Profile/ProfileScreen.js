import React, { useState, useEffect } from 'react';
import {
  Alert, View, StyleSheet, TextInput, Image, TouchableOpacity,
} from 'react-native';
import {
  Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';

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
    top: 20,
    right: 20,
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
  // TODO: remove when sign-in is implemented
  const DUMMY_USER_ID = 'recPExZT2DNDYUKCz';
  const DUMMY_NAME = 'Joe Bruin';

  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');

  const [avatar, setAvatar] = useState(require('../assets/imgs/placeholder.png'));
  // const [avatarNum, setAvatarNum] = useState(0);
  // const avatarFruits = ['placeholder', 'pipa', 'eggplant', 'mango', 'dragonfruit', 'lychee', 'bokchoy'];

  useEffect(() => {
    const useremail = 'helen@gmail.com';
    base('Users').select({
      filterByFormula: `({email}='${useremail}')`,
    }).firstPage().then((record) => {
      console.log(record[0].fields.avatarNum);
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
      // const url = `../assets/imgs/${avatarFruits[avatarNum]}.png`;
      // // eslint-disable-next-line import/no-dynamic-require
      // setAvatar(require(url));
    });
  }, []);

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
      <Text style={styles.buttonText} onPress={handleSaveChanges}>Save</Text>
      <View style={styles.titleText}>
        <Text style={styles.mainTitle}>Profile</Text>
        <Image
          style={styles.image}
          source={avatar}
        />
        <TouchableOpacity onPress={() => { console.log('working?'); navigation.navigate('EditAvatar'); }}>
          <Image
            style={styles.edit}
            source={require('../assets/imgs/edit.png')}
          />
        </TouchableOpacity>

        <Text style={styles.titleText}>
          {DUMMY_NAME}
        </Text>
        <Text style={styles.subtitleText}> Organization Name </Text>
      </View>
      {/* Start of text input region */}
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="joebruin@gmail.com"
          placeholderTextColor="#34221D"
          keyboardType="email-address"
          returnKeyType="next"
          blurOnSubmit={false}
          width={330}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Phone Number</Text>
        <TextInput
          style={styles.textInput}
          value={phoneNum}
          onChangeText={setPhoneNum}
          placeholder="(123) 456 - 7890"
          placeholderTextColor="#34221D"
          keyboardType="numeric"
          returnKeyType="next"
          blurOnSubmit={false}
          width={330}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Address</Text>
        <TextInput
          style={styles.textInput}
          value={address}
          onChangeText={setAddress}
          placeholder="330 De Neve Dr., Los Angeles"
          placeholderTextColor="#34221D"
          returnKeyType="next"
          blurOnSubmit={false}
          width={330}
        />
      </View>
      {/* End of text input region for email, phone, address */}
    </View>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
