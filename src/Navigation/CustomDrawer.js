/* eslint-disable global-require */
import 'react-native-gesture-handler';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import Config from 'react-native-config';

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

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CustomDrawer(props) {
  const { navigation } = props;

  // TODO: remove when sign-in is implemented
  const DUMMY_USER_ID = 'rec0hmO4UPOvtI3vA';
  const DUMMY_NAME = 'Joe Bruin';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [orgName, setOrgName] = useState('');

  const [avatar, setAvatar] = useState(require('../assets/imgs/placeholder.png'));

  useEffect(() => {
    const useremail = 'helen@gmail.com';
    base('Users').select({
      filterByFormula: `({email}='${useremail}')`,
    }).firstPage().then((record) => {
      setFirstName(record[0].fields.firstName);
      setLastName(record[0].fields.lastName);
      setOrgName(record[0].fields.organization);

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
  });

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
            // eslint-disable-next-line global-require
            source={avatar}
            style={styles.photo}
          />
          <Text style={styles.title}>
            {firstName}
            {' '}
            {lastName}
          </Text>
          <Text style={styles.subtitle}>
            {orgName}
          </Text>
        </View>
        <View style={styles.drawers}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <TouchableOpacity />
        <View style={styles.footer}>
          <Icon
            size={26}
            name="logout-variant"
            color="#34221D"
            onPress={() => { navigation.navigate('Log In'); }} // TODO: change to signed out screen once it is implemented
          />
          <Text
            style={styles.footerDrawer}
            onPress={() => { navigation.navigate('Log In'); }} // TODO: change to signed out screen once it is implemented
          >
            Log out
          </Text>
        </View>
      </View>
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
