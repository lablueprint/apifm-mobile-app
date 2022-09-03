import React, { useState, useEffect } from 'react';
import {
  Text, View, Image, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { serviceUpdateUser } from '../lib/redux/services';

const Airtable = require('airtable');
const placeholderIMG = require('../assets/imgs/placeholder.png');
const pipaIMG = require('../assets/imgs/pipa.png');
const pipaSelected = require('../assets/imgs/pipaselected.png');
const eggplantIMG = require('../assets/imgs/eggplant.png');
const eggplantSelected = require('../assets/imgs/eggplantselected.png');
const mangoIMG = require('../assets/imgs/mango.png');
const mangoSelected = require('../assets/imgs/mangoselected.png');
const dragonfruitIMG = require('../assets/imgs/dragonfruit.png');
const dragonfruitSelected = require('../assets/imgs/dragonfruitselected.png');
const lycheeIMG = require('../assets/imgs/lychee.png');
const lycheeSelected = require('../assets/imgs/lycheeselected.png');
const bokchoyIMG = require('../assets/imgs/bokchoy.png');
const bokchoySelected = require('../assets/imgs/bokchoyselected.png');

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
  buttonTextOne: {
    fontSize: 16,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#34221D',
    textAlign: 'right',
    marginLeft: 'auto',
    top: 22,
    right: 310,
  },
  buttonTextTwoInactive: {
    fontSize: 16,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#868686',
    textAlign: 'right',
    marginLeft: 'auto',
    right: 32,
    zIndex: 99,
  },
  buttonTextTwoActive: {
    fontSize: 16,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#34221D',
    textAlign: 'right',
    marginLeft: 'auto',
    right: 32,
    zIndex: 99,
  },

});

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function EditAvatarScreen({ navigation }) {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState(placeholderIMG);
  const [avatarNum, setAvatarNum] = useState(0);

  const [pipa, setPipa] = useState(avatarNum === 1);
  const [eggplant, setEggplant] = useState(avatarNum === 2);
  const [mango, setMango] = useState(avatarNum === 3);
  const [dragonfruit, setDragonfruit] = useState(avatarNum === 4);
  const [lychee, setLychee] = useState(avatarNum === 5);
  const [bokchoy, setBokchoy] = useState(avatarNum === 6);

  useEffect(() => {
    switch (currentUser.avatarNum) {
      case 1: setAvatar(pipaIMG);
        setAvatarNum(0);
        setPipa(true);
        break;
      case 2: setAvatar(eggplantIMG);
        setAvatarNum(1);
        setEggplant(true);
        break;
      case 3: setAvatar(mangoIMG);
        setAvatarNum(2);
        setMango(true);
        break;
      case 4: setAvatar(dragonfruitIMG);
        setAvatarNum(3);
        setDragonfruit(true);
        break;
      case 5: setAvatar(lycheeIMG);
        setAvatarNum(4);
        setLychee(true);
        break;
      case 6: setAvatar(bokchoyIMG);
        setAvatarNum(5);
        setBokchoy(true);
        break;
      default: setAvatar(placeholderIMG);
    }
  }, []);

  const cancelAvatar = () => {
    navigation.goBack(null);
  };

  const saveAvatar = async () => {
    try {
      await base('Users').update([
        {
          id: currentUser.id,
          fields: {
            avatarNum,
          },
        },
      ]);
      const updatedUser = { ...currentUser, avatarNum };
      serviceUpdateUser(updatedUser);
      navigation.goBack(null);
    } catch (err) {
      Alert.alert(err.error, err.message);
    }
  };

  return (
    <View style={styles.master}>
      <View>
        <Text onPress={cancelAvatar} style={styles.buttonTextOne}>Cancel</Text>
        <Text
          onPress={saveAvatar}
          style={styles.buttonTextTwoActive}
        >
          Save
        </Text>
      </View>
      <Text style={styles.text}>Select an avatar</Text>
      <View style={[styles.viewport, styles.elevation]}>
        <Image
          source={avatar}
          style={styles.mainPhoto}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setAvatarNum(1);
            setAvatar(pipaIMG);
            setPipa(true);
            setEggplant(false);
            setMango(false);
            setDragonfruit(false);
            setLychee(false);
            setBokchoy(false);
          }}
        >
          <Image
            source={!pipa ? pipaIMG : pipaSelected}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setAvatarNum(2);
            setAvatar(eggplantIMG);
            setPipa(false);
            setEggplant(true);
            setMango(false);
            setDragonfruit(false);
            setLychee(false);
            setBokchoy(false);
          }}
        >
          <Image
            source={!eggplant ? eggplantIMG : eggplantSelected}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setAvatarNum(3);
            setAvatar(mangoIMG);
            setPipa(false);
            setEggplant(false);
            setMango(true);
            setDragonfruit(false);
            setLychee(false);
            setBokchoy(false);
          }}
        >
          <Image
            source={!mango ? mangoIMG : mangoSelected}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setAvatarNum(4);
            setAvatar(dragonfruitIMG);
            setPipa(false);
            setEggplant(false);
            setMango(false);
            setDragonfruit(true);
            setLychee(false);
            setBokchoy(false);
          }}
        >
          <Image
            source={!dragonfruit ? dragonfruitIMG : dragonfruitSelected}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setAvatarNum(5);
            setAvatar(lycheeIMG);
            setPipa(false);
            setEggplant(false);
            setMango(false);
            setDragonfruit(false);
            setLychee(true);
            setBokchoy(false);
          }}
        >
          <Image
            source={!lychee ? lycheeIMG : lycheeSelected}
            style={styles.photo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setAvatarNum(6);
            setAvatar(bokchoyIMG);
            setPipa(false);
            setEggplant(false);
            setMango(false);
            setDragonfruit(false);
            setLychee(false);
            setBokchoy(true);
          }}
        >
          <Image
            source={!bokchoy ? bokchoyIMG : bokchoySelected}
            style={styles.photo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

EditAvatarScreen.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};
