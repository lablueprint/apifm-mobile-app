import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import ProduceCard from './ProduceCard';

import Config from 'react-native-config';
const Airtable = require('airtable');
const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    marginTop: '40%',
    alignItems: 'center',
  },
  titleText: {
    marginBottom: 10,
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  button: {
    width: '30%',
    marginTop: 5,
    backgroundColor: '#0492c2',
  },
  buttonContainer: {
    marginTop: 5,
    marginRight: 5,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
});

export default function MarketplaceScreen({ navigation }) {
  const getProduce = () => {
    base('Produce').select({
      maxRecords: 20,
    }).eachPage(function page(records, fextNextPage) {
      records.forEach(function(record) {
        console.log(record.fields);
        // append to an object to get all the fields and map from there
      })
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          icon="account-circle"
          style={styles.button}
          color="white" // Text + icon colour
          onPress={() => navigation.navigate('Profile')}
        >
          Profile
        </Button>
        <Button
          mode="outlined"
          icon="cart"
          style={styles.button}
          color="white"
          onPress={() => navigation.navigate('Cart')}
        >
          Cart
        </Button>
      </View>
      <View style={styles.centeredContainer}>
        <Title style={styles.titleText}> MarketplaceScreen :) </Title>
        <Text style={styles.bodyText}> This is the Marketplace Home. Buy food from me! </Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          SIGN OUT
        </Button>
      </View>
      <View style={styles.centeredContainer}>
        <ProduceCard navigation={navigation} image={require('../assets/carrot.png')} name="Carrots" price="4.99" />
      </View>
      <View style={styles.centeredContainer}>
        <Button style={styles.button} onPress={getProduce}>Test</Button>
      </View>
    </ScrollView>
  );
}

MarketplaceScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
