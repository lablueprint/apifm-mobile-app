import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Button, TextInput
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'react-native-config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#0492c2',
  },
});

export default function ProfileScreen({ navigation }) {


  const Airtable = require('airtable');

  const airtableConfig = {
    apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
    baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
  };

  const base = new Airtable({apiKey: airtableConfig.apiKey}).base(airtableConfig.baseKey);


  base('Users').find('recIpBFqr2EXNbS7d', function(err, record) {
       if (err) { console.error(err); return; }
      console.log('Retrieved', record.id);
  });

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        <Icon style={{ fontSize: 20 }} name="account-circle" />
          Joe Bruin
      </Title>

     <Subheading></Subheading>
      
      <Text style={styles.bodyText}> This is my account page. I am a happy farmer. </Text>
    
      <TextInput
        mode="transparent"
        label="Email"
        placeholder="Email"
        right={<TextInput.Affix text=" " />}
      />

      <TextInput
        mode="transparent"
        label="Phone Number"
        placeholder="Phone Number"
        right={<TextInput.Affix text=" " />}
      />

      <TextInput
        mode="transparent"
        label="Address"
        placeholder="Address"
        right={<TextInput.Affix text=" " />}
      />
    
      
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
