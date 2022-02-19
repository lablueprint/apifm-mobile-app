import { React, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
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

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

// const base = new Airtable({ apiKey: airtableConfig.apiKey })
//  .base(airtableConfig.baseKey);

export default function CheckoutScreen({ navigation }) {
  // const [total, setTotal] = useState(0);
  // const [shippingAddress, setShippingAddress] = useState('');

  // const calcTotal = () => {
  // const total = 0;
  // console.log('goddarnnit');
  // base('Cart').select({
  //   filterByFormula: "({email}='helen@gmail.com')",
  // }).all()
  // // base('Users').select({
  // //   filterByFormula: '{email} = "aaronqqshi@gmail.com"',
  // // })
  // // base('Users').select({ view: 'Grid view' }).all()
  //   .then((records) => {
  //     console.log(records);
  //   });
  // };

  // useEffect(() => {
  //   base('Users').find('recOkJcPA7K37psGa', (err, record) => {
  //     if (err) { console.error(err); return; }
  //     console.log(record);
  //     setProfile(record.fields);
  //   });
  // }, []);

  // useEffect(() => {
  //  calcTotal();
  // }, []);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        Checkout
      </Title>
      <Text style={styles.bodyText}> Shipping Address </Text>
      <Text style={styles.bodyText}>
        Shipping Address + icon
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Checkout')}
      >
        MARKETPLACE
      </Button>
    </View>
  );
}

CheckoutScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
