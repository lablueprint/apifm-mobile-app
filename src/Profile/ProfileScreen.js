import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Title,
  Text,
  Button,
  TextInput, Subheading,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'react-native-config';
import { mdiSourcePull } from '@mdi/js';

const profilePicture = require('../assets/imgs/profilepic.png');

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
  const Airtable = require('airtable');

  const airtableConfig = {
    apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
    baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
  };

  const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

  base('Users').find('recIpBFqr2EXNbS7d', (err, record) => {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);
    const recordID = record.id;
  });

  return (
    <View style={styles.container}>
      {/* <Avatar.Icon size={100} icon={profile} /> */}
      <Image
        source={profilePicture}
      />
      <Title style={styles.titleText}>

        {/* <Icon
          style={
                        { fontSize: 50 }
                    }
          name="account-circle"
        /> */}
        Joe Bruin
      </Title>
      <Subheading>Organization </Subheading>

      {/* <Text style={styles.bodyText}>

        This is my account page.I am a happy farmer.

      </Text> */}

      <TextInput
        mode="transparent"
        label="Email"
        placeholder="Email"
        // need to pull from airtable for this
        value={recordID}
      />

      <TextInput
        mode="transparent"
        label="Phone Number"
        placeholder="Phone Number"
        // need to pull from airtable for this
        value="(123)456-7890"
      />
      <TextInput
        mode="transparent"
        label="Address"
        placeholder="Address"
        // need to pull from airtable for this
        value="330 De Neve Dr., Los Angeles"
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={
                    () => navigation.navigate('Marketplace')
                }
      >
        MARKETPLACE
      </Button>
    </View>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
