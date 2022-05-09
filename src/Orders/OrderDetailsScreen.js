/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import {
  Text, Button, Title,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';

import OrderItem from './OrderItem';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    marginTop: '8%',
    marginHorizontal: '8%',
    marginBottom: '4%',
  },
  button: {
    width: '40%',
    marginTop: 10,
    backgroundColor: '#0492c2',
  },
  title: {
    fontSize: 18,
    marginBottom: '2%',
    color: 'black',
  },
  details: {
    fontSize: 14,
    marginBottom: '2%',
    color: 'black',
    marginLeft: -5,
  },
  titleText: {
    marginBottom: '3%',
    fontSize: 26,
    marginLeft: -10,
  },
  subdetails: {
    fontSize: 14,
    marginTop: '.5%',
    marginBottom: '.5%',
    color: '#636363',
  },
  header: {
    marginBottom: '4%',
    borderBottomColor: '#868686',
    borderBottomWidth: 2,
    borderBottomWeight: '100',
  },
  subcontainer: {
    marginHorizontal: '8%',
  },
  shippingContainer: {
    marginTop: '8%',
    marginHorizontal: '8%',
    marginBottom: '4%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  shippingSubcontainer: {
    marginLeft: '0%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: '2%',
  },
  deliveryFeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '0%',
    marginRight: '0%',
  },
  conditionalShippingFeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '0%',
    marginRight: '30%',
    marginBottom: '3%',
  },
});

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const CONST_USER = 'helen@gmail.com';
const CONST_USER_ID = 'recIpBFqr2EXNbS7d';

export default function OrderDetailsScreen({ route }) {
  const {
    navigation, orderId, date, time, items,
  } = route.params;

  const [shippingAddress, setShippingAddress] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [freeFee, setFreeFee] = useState(0);
  const [productList, setProductList] = useState([]);

  const setOrderDetails = (useremail) => {
    base('Users').select({
      filterByFormula: `({email}='${useremail}')`,
    }).firstPage()
      .then((records) => {
        if (`${records[0].fields['apartment number']}` !== '') {
          setShippingAddress({
            address: records[0].fields.address,
            zipcode: records[0].fields.zipcode,
            apartmentLine: ` Apt ${records[0].fields['apartment number']}`,
          });
        } else {
          setShippingAddress({
            address: records[0].fields.address,
            zipcode: records[0].fields.zipcode,
            apartmentLine: '',
          });
        }
      });
  };

  // Add current items to airtable in the Cart table
  const orderAgain = () => {
    const cartObj = [];
    for (let i = 0; i < items[1].length; i++) {
      const cartRow = {};
      cartRow.fields = {
        Produce: items[1][i].produce_id,
        shopper: [CONST_USER_ID],
        quantity: items[1][i].Quantity,
      };
      cartObj.push(cartRow);
    }
    base('CART V3').create(cartObj, (err) => {
      if (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    // TODO: replace hardcoded email with logged in user info
    setOrderDetails(CONST_USER);
    setDeliveryFee(10);
    setFreeFee(20);
    setCount(items[1].length);
    const regItemList = [];
    let totalPrice = 0;
    const quantities = [];

    items[1].forEach((item) => {
      base('Produce').find(item.produce_id, ((err, prodRecord) => {
        if (err) { console.error(err); return; }
        const prodItem = prodRecord;
        regItemList.push(prodItem.fields);
        quantities.push(String(item.Quantity));
        totalPrice += parseFloat(item.Quantity) * parseFloat(prodItem.fields.Price);
        setTotal(totalPrice);
        if (regItemList.length === items[1].length) {
          const products = regItemList.map((prodItemIter, ind) => (
            <OrderItem
              name={prodItemIter.Name}
              price={prodItemIter.Price}
              type={prodItemIter.Unit}
              quantity={quantities[ind]}
            />
          ));
          setProductList(products);
        }
      }));
    });
  }, []);

  return (
    <ScrollView styles={styles.centeredContainer}>
      <View style={styles.shippingContainer}>
        <View style={styles.header}>
          <Title style={styles.titleText}>
            {' '}
            Order ID #
            {orderId}
          </Title>
          <Text style={styles.details}>
            {' '}
            Delivered on
            {' '}
            {date}
            {' '}
            at
            {' '}
            {time}
          </Text>
        </View>

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
          <View style={styles.shippingSubcontainer}>
            <Text style={[styles.subdetails, { fontWeight: '600' }]}>
              {`${shippingAddress.address}, ${shippingAddress.apartmentLine}`}
            </Text>
            <Text style={styles.subdetails}>
              {shippingAddress.zipcode}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.subcontainer}>
        <View>
          {productList}
        </View>
      </View>
      <View style={[styles.subcontainer]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.subdetails, { marginLeft: '0%' }]}>
            {`Items (${count})`}
          </Text>
          <Text style={[styles.subdetails, { marginRight: '0%' }]}>
            {`$ ${parseFloat(total).toFixed(2)}`}
          </Text>
        </View>
        <View style={styles.deliveryFeeContainer}>
          <Text style={[styles.subdetails, { marginLeft: '0%' }]}>
            Delivery Fee:
          </Text>
          <Text style={[styles.subdetails, { marginRight: '0%' }]}>
            {`$ ${parseFloat(deliveryFee).toFixed(2)}`}
          </Text>
        </View>
        {deliveryFee > 0
        && (
        <View style={styles.conditionalShippingFeeContainer}>
          <Text style={[styles.subdetails, {
            color: '#C4C4C4',
            marginLeft: '0%',
          }]}
          >
            {`Add $ ${parseFloat(freeFee).toFixed(2)} to qualify for free shipping!`}
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
            {`$ ${parseFloat(total + deliveryFee).toFixed(2)}`}
          </Text>
        </View>
      </View>
      <View style={[styles.container, { marginBottom: '8%' }]}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            // TODO: replace hardcoded email with logged in user info
            orderAgain();
            navigation.navigate('Cart');
          }}
        >
          Order Again
        </Button>
      </View>
    </ScrollView>
  );
}

OrderDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      navigation: PropTypes.shape({ navigate: PropTypes.func }),
      orderId: PropTypes.string,
      date: PropTypes.string,
      time: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.Object),
    }),
  }).isRequired,
};
