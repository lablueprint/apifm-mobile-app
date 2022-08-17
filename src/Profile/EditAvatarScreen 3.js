/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  Text, View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';

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

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function EditAvatarScreen({ navigation }) {
  const [avatar, setAvatar] = useState(require('../assets/imgs/placeholder.png'));
  const [avatarNum, setAvatarNum] = useState(0);

  useEffect(() => {
    const useremail = 'helen@gmail.com';
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
    });
  }, []);

  const sendUpdate = async () => {
    const user = 'recIpBFqr2EXNbS7d';
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
    const user = 'recIpBFqr2EXNbS7d';
    await base('Users').find(user, (err, record) => {
      if (err) {
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
        <TouchableOpacity activeOpacity={0.5} onPress={() => { setAvatarNum(1); setAvatar(require('../assets/imgs/pipa.png')); }}>
          <Image
            source={require('../assets/imgs/pipa.png')}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { setAvatarNum(2); setAvatar(require('../assets/imgs/eggplant.png')); }}>
          <Image
            source={require('../assets/imgs/eggplant.png')}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { setAvatarNum(3); setAvatar(require('../assets/imgs/mango.png')); }}>
          <Image
            source={require('../assets/imgs/mango.png')}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { setAvatarNum(4); setAvatar(require('../assets/imgs/dragonfruit.png')); }}>
          <Image
            source={require('../assets/imgs/dragonfruit.png')}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { setAvatarNum(5); setAvatar(require('../assets/imgs/lychee.png')); }}>
          <Image
            source={require('../assets/imgs/lychee.png')}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { setAvatarNum(6); setAvatar(require('../assets/imgs/bokchoy.png')); }}>
          <Image
            source={require('../assets/imgs/bokchoy.png')}
            style={styles.photo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
