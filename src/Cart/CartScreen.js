import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Title, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import CartProduct from './CartProduct';

// airtable
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-35%',
  },
  productsContainer: {
    flex: 1,
    // justifyContent: 'start',
    alignItems: 'center',
    marginTop: '5%',
  },
  titleText: {
    marginBottom: '2%',
    marginTop: '40%',
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
  scrollView: {
    // flex: 1,
    marginHorizontal: '-225%',
    marginVertical: '0%',
  },
});

// const fakeItems = { name: 'daikon', quantity: '2' };

export default function CartScreen({ navigation }) {
  const handleCheckout = (event) => {
    event.preventDefault();
    base('Cart').update([
      {
        id: 'recPlXD1RrF9teBn2',
        fields: {
          Quantity: 5,
          Name: 'carrot',
          'Users UPDATED': [
            'recuN6ZapErmTq8nq',
          ],
        },
      },
    ], (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record) => {
        console.log(record.get('Users UPDATED'));
      });
    });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        Cart
      </Title>
      {/* <Text style={styles.bodyext}> */}
      {/* <ScrollView style={styles.scrollView}> */}
        <View style={styles.container}>
          <CartProduct />
          <CartProduct />
          <CartProduct />
        </View>
      {/* </ScrollView> */}
      <Button
        mode="contained"
        onPress={handleCheckout}
      >
        CHECKOUT
      </Button>
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

CartScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
