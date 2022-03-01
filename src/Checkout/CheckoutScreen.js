import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginBottom: 10,
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
  },
  button: {
    width: '30%',
    marginTop: 10,
    backgroundColor: '#0492c2',
  },
  topIcon: {
    height: 70,
    marginHorizontal: 8.0,
    paddingTop: 12.0,
  },
  title: {
    fontSize: 18,
    // marginLeft: '2%',
    marginBottom: '2%',
    color: 'black',
  },
  subdetails: {
    fontSize: 14,
    marginTop: '.5%',
    // marginLeft: '2%',
    marginBottom: '.5%',
    color: 'grey',
  },
  subcontainer: {
    marginHorizontal: '8%',
  },
});

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function CheckoutScreen({ navigation }) {
  const [shippingAddress, setShippingAddress] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [freeFee, setFreeFee] = useState(0);

  const calcTotal = () => {
    base('Cart').select({ filterByFormula: "({Users UPDATED}='helen@gmail.com')" }).all()
      .then((items) => {
        let sum = 0;
        let c = 0;
        items.map((item) => {
          sum += item.fields.Quantity * item.fields.price;
          c += 1;
        });
        setTotal(sum);
        setCount(c);
      });
  };

  useEffect(() => {
    base('Users UPDATED').select({
      filterByFormula: '{email} = "helen@gmail.com"',
    }).firstPage()
      .then((records) => {
        if (`${records[0].fields['apartment number']}` !== '') {
          setShippingAddress({
            address: records[0].fields.address,
            zipcode: records[0].fields['zip code'],
            apartmentLine: ` Apt ${records[0].fields['apartment number']}`,
          });
        } else {
          setShippingAddress({
            address: records[0].fields.address,
            zipcode: records[0].fields['zip code'],
            apartmentLine: '',
          });
        }
      });
    calcTotal();

    base('Orders').select({
      filterByFormula: '{user_id} = "helen@gmail.com"',
    }).firstPage()
      .then((records) => {
        if (records[0].fields['delivery fee (temp)'] > 0) {
          setDeliveryFee(records[0].fields['delivery fee (temp)']);
          setFreeFee(records[0].fields['fee to be free (temp)']);
        }
      });
  }, []);

  return (
    <View>
      <View style={[styles.subcontainer, {
        marginTop: '8%', marginHorizontal: '8%', marginBottom: '4%', borderBottomColor: 'grey', borderBottomWidth: 2,
      }]}
      >
        <Text style={[styles.title, { fontWeight: '700', marginLeft: '0%', marginBottom: '0%' }]}>
          Shipping Address
        </Text>
        <View style={{
          flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '4%',
        }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '3%' }}>
            <Icon size={25} color="grey" name="location-sharp" />
          </View>
          <View style={{
            marginLeft: '0%', flexDirection: 'column', justifyContent: 'center', marginVertical: '2%',
          }}
          >
            <Text style={[styles.title, { fontWeight: '600' }]}>
              {shippingAddress.address}
              ,
              {shippingAddress.apartmentLine}
            </Text>
            <Text style={styles.subdetails}>
              {shippingAddress.zipcode}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.subcontainer, { borderBottomColor: 'grey', borderBottomWidth: 2 }]}>
        <View style={styles.title}>
          <Text style={[styles.title, {
            fontWeight: '700', marginLeft: '0%', marginBottom: '0%',
          }]}
          >
            Review Items
          </Text>
          <Text style={[styles.subdetails, { marginLeft: '0%' }]}>
            Delivery Date:
          </Text>
        </View>
        <Text style={[styles.bodyText, { marginBottom: '4%' }]}> Cart (multiple produce cards) reused here  </Text>
      </View>
      <View style={[styles.subcontainer]}>
        <View style={styles.title}>
          <Text style={[styles.title, {
            fontWeight: '700', marginLeft: '0%', marginBottom: '0%', marginTop: '8%',
          }]}
          >
            Order Summary
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.subdetails, { marginLeft: '0%' }]}>
            Items(
            {count}
            )
          </Text>
          <Text style={[styles.subdetails, { marginRight: '0%' }]}>
            $
            {total}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginLeft: '0%', marginRight: '0%',
        }}
        >
          <Text style={[styles.subdetails, { marginLeft: '0%' }]}>
            Delivery Fee:
          </Text>
          <Text style={[styles.subdetails, { marginRight: '0%' }]}>
            $
            {deliveryFee}
          </Text>
        </View>
        {deliveryFee > 0
        && (
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginLeft: '0%', marginRight: '30%', marginBottom: '3%',
        }}
        >
          <Text style={[styles.subdetails, {
            marginLeft: '0%',
          }]}
          >
            Add
            {' $'}
            {freeFee}
            {' '}
            to qualify for free shipping!
          </Text>
        </View>
        )}
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%',
        }}
        >
          <Text style={[styles.title, { marginLeft: '0%' }]}>
            Order Total
          </Text>
          <Text style={[styles.title, { marginRight: '0%' }]}>
            $
            {total}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Marketplace')}
        >
          MARKET
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Marketplace')}
        >
          Buy TBD
        </Button>
      </View>
    </View>
  );
}

CheckoutScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
