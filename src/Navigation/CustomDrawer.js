import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import store from '../lib/redux/store';
import { logout } from '../lib/redux/sliceAuth';

const placeholder = require('../assets/imgs/placeholder.png');
const pipa = require('../assets/imgs/pipa.png');
const eggplant = require('../assets/imgs/eggplant.png');
const mango = require('../assets/imgs/mango.png');
const dragonfruit = require('../assets/imgs/dragonfruit.png');
const lychee = require('../assets/imgs/lychee.png');
const bokchoy = require('../assets/imgs/bokchoy.png');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#C1DDA9',
    position: 'relative',
  },

  backButton: {
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 10,
  },

  header: {
    marginLeft: 30,
    marginTop: 30,
  },

  photo: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  title: {
    color: '#34221D',
    fontSize: 25,
    marginBottom: 2,
    fontFamily: 'JosefinSans-SemiBold',
  },

  subtitle: {
    color: '#34221D',
    fontSize: 16,
    fontFamily: 'JosefinSans-Regular',
  },

  drawers: {
    marginTop: 20,
    marginLeft: 10,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 30,
    padding: 20,
  },

  footerDrawer: {
    fontSize: 17,
    paddingLeft: 17,
    width: '100%',
    color: '#34221D',
    bottom: 1,
    fontFamily: 'JosefinSans-Medium',
  },
});

function CustomDrawer(props) {
  const { navigation } = props;
  const { user: currentUser } = useSelector((state) => state.auth);

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
  }, [currentUser.avatarNum]);

  return (
    <View style={styles.main}>
      <DrawerContentScrollView
        {...props}
      >
        <Icon
          size={26}
          name="close"
          color="#34221D"
          style={styles.backButton}
          onPress={() => { navigation.toggleDrawer(); }}
        />
        <View style={styles.header}>
          <Image
            source={avatar}
            style={styles.photo}
          />
          <Text style={styles.title}>
            {currentUser.firstName}
            {' '}
            {currentUser.lastName}
          </Text>
          <Text style={styles.subtitle}>
            {currentUser.organization}
          </Text>
        </View>
        <View style={styles.drawers}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        style={styles.footer}
        onPress={async () => {
          store.dispatch(logout());
          await AsyncStorage.removeItem('user');
          navigation.navigate('Log In');
        }}
      >
        <Icon
          size={26}
          name="logout-variant"
          color="#34221D"
        />
        <Text
          style={styles.footerDrawer}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

CustomDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    toggleDrawer: PropTypes.func,
  }).isRequired,
};

export default CustomDrawer;
