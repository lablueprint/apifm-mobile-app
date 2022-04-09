import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Config from 'react-native-config';
import {
  Title, Button, Subheading,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#93c9fe',
  },
  titleText: {
    marginBottom: 10,
  },
  button: {
    width: '30%',
    marginTop: 10,
    backgroundColor: '#0078E8',
  },
  bodyText: {
    fontSize: 20,
  },
});

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState([]);

  const getUserInfo = (useremail) => {
    base('Users').select({ maxRecords: 1, filterByFormula: `({email}='${useremail}')` }).firstPage()
      .then((err, records) => {
        if (err) {
          Alert.alert(err.message);
          return;
        }
        setProfile(records[0].fields);
      });
  };

  useEffect(() => {
    getUserInfo('aaronqqshi@gmail.com');
  }, []);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        <Icon style={{ fontSize: 30 }} name="account-circle" />
        ProfileScreen
      </Title>
      <Title style={{ fontSize: 25 }}>
        Temporary User Information
      </Title>
      <Subheading style={styles.bodyText}>
        {'Name: '}
        {profile['first name']}
      </Subheading>
      <Subheading style={styles.bodyText}>
        {'Email: '}
        {profile.email}
      </Subheading>
      <Subheading style={styles.bodyText}>
        {'Address: '}
        {profile.address}
      </Subheading>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Marketplace')}
      >
        MARKETPLACE
      </Button>
    </View>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
