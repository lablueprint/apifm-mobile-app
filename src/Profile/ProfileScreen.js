import React from 'react';
import { View, StyleSheet } from 'react-native';
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
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '30%',
    marginTop: 10,
    backgroundColor: '#0078E8',
  },
});

// airtable configuration
// const Airtable = require('airtable');

// const airtableConfig = {
//   apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
//   baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
// };

// const base = new Airtable({ apiKey: airtableConfig.apiKey })
//   .base(airtableConfig.baseKey);

const temporaryUser = { name: 'Jordan', email: 'gmail@gmail.com', address: '1200 covid begone' };

export default function ProfileScreen({ navigation }) {
  // base('Users').find('aaronqqshi@gmail.com', (err, user) => {
  //   if (err) { console.error(err); return; }
  //   console.log('Retrieved', user.id);
  // });

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        <Icon style={{ fontSize: 30 }} name="account-circle" />
        ProfileScreen
      </Title>
      <Title style={{ fontSize: 25 }}>
        Temporary User Information
      </Title>
      <Subheading style={{ fontSize: 20 }}>
        {'Name: '}
        {temporaryUser.name}
      </Subheading>
      <Subheading style={{ fontSize: 20 }}>
        {'Email: '}
        {temporaryUser.email}
      </Subheading>
      <Subheading style={{ fontSize: 20 }}>
        {'Address: '}
        {temporaryUser.address}
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

// {'Name: '}
// {temporaryUser.name}
// {'\n'}
// {'Email: '}
// {temporaryUser.email}
// {' '}
// {'\n'}
// {'Address: '}
// {temporaryUser.address}
// {' '}
// {'\n'}
// </List>
