import React, { useState, useEffect } from 'react';
import {
  Text, View, Image, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import store from '../redux/store';

const Airtable = require('airtable');
const placeholder = require('../assets/imgs/placeholder.png');
const pipa = require('../assets/imgs/pipa.png');
const eggplant = require('../assets/imgs/eggplant.png');
const mango = require('../assets/imgs/mango.png');
const dragonfruit = require('../assets/imgs/dragonfruit.png');
const lychee = require('../assets/imgs/lychee.png');
const bokchoy = require('../assets/imgs/bokchoy.png');

const styles = StyleSheet.create({
  master: {
    backgroundColor: '#FFFFFA',
    height: 1000,
  },

  text: {
    color: '#34221D',
    fontSize: 18,
    marginTop: 40,
    marginBottom: 25,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
  },

  mainPhoto: {
    height: 160,
    width: 160,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  viewport: {
    height: 160,
    width: 160,
    borderRadius: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },

  elevation: {
    elevation: 10,
    shadowColor: '#34221D',
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  photo: {
    height: 125,
    width: 125,
    margin: 10,
  },
});

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function EditAvatarScreen({ navigation }) {
  const currentUser = store.getState().auth.user;

  const [avatar, setAvatar] = useState(placeholder);
  const [avatarNum, setAvatarNum] = useState(0);

  useEffect(() => {
    const useremail = currentUser.email;
    base('Users').select({
      filterByFormula: `({email}='${useremail}')`,
    }).firstPage().then((record) => {
      switch (record[0].fields.avatarNum) {
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
    });
  }, []);

  const sendUpdate = async () => {
    const user = currentUser.id;
    await base('Users').update([
      {
        id: user,
        fields: {
          avatarNum,
        },
      },
    ]);
    navigation.navigate('Profile');
  };

  const saveAvatar = async () => {
    const user = currentUser.id;
    await base('Users').find(user, (err) => {
      if (err) {
        Alert.alert(err);
        return;
      }
      sendUpdate();
    });
  };

  return (
    <View style={styles.master}>
      <Text style={styles.text}>Select an avatar</Text>
      <View style={[styles.viewport, styles.elevation]}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { saveAvatar(); }}>
          <Image
            source={avatar}
            style={styles.mainPhoto}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => { setAvatarNum(1); setAvatar(pipa); }}
        >
          <Image
            source={pipa}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => { setAvatarNum(2); setAvatar(eggplant); }}
        >
          <Image
            source={eggplant}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => { setAvatarNum(3); setAvatar(mango); }}
        >
          <Image
            source={mango}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => { setAvatarNum(4); setAvatar(dragonfruit); }}
        >
          <Image
            source={dragonfruit}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => { setAvatarNum(5); setAvatar(lychee); }}
        >
          <Image
            source={lychee}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => { setAvatarNum(6); setAvatar(bokchoy); }}
        >
          <Image
            source={bokchoy}
            style={styles.photo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

EditAvatarScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
