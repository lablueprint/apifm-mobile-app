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
// TODO: Delivery date in css is hardcoded rn
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  centeredContainer: {
    marginTop: '8%',
    marginHorizontal: '8%',
    marginBottom: '4%',
    backgroundColor: '#FFFFFA',

  },
  background: {
    backgroundColor: '#FFFFFA',

  },
  title: {
    fontSize: 18,
    marginBottom: '2%',
    color: 'black',
    fontFamily: 'JosefinSans-SemiBold',
  },
  details: {
    fontSize: 14,
    marginBottom: '2%',
    color: 'black',
    marginStart: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  titleText: {
    marginBottom: '3%',
    fontSize: 26,
    marginLeft: -10,
    fontFamily: 'JosefinSans-SemiBold',

  },
  subdetails: {
    fontSize: 14,
    marginTop: '.5%',
    marginBottom: '2%',
    color: '#000000',
    fontFamily: 'JosefinSans-Regular',

  },
  header: {
    marginBottom: '4%',
  },
  subcontainer: {
    marginHorizontal: '8%',
  },
  shippingContainer: {
    marginTop: '8%',
    marginHorizontal: '8%',
    marginBottom: '4%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
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
  button: {
    borderRadius: 25,
    height: 50,
    width: 300,
    marginBottom: 60,
    backgroundColor: '#1D763C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: -50,
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

  // Helper function to wait for [ms] milliseconds
  function timer(ms) { return new Promise((res) => setTimeout(res, ms)); }

  // Batch function to serialize airtable calls (since api is rate limited at
  // 10 row updates at a time)
  const cartBatch = async (cartObj) => { // 3
    base('CART V3').create(cartObj, (err) => {
      if (err) {
        console.error(err);
      }
    });
    await timer(1000);
  };

  // Add current items to airtable in the Cart table
  const orderAgain = async () => {
    const cartBatches = [];
    for (let j = 0; j < Math.floor(items[1].length / 10) + 1; j += 1) {
      const cartObj = [];
      let upper = items[1].length % 10;

      if (j < Math.floor(items[1].length / 10)) {
        upper = 10;
      }
      for (let i = 0; i < upper; i += 1) {
        const cartRow = {};
        cartRow.fields = {
          Produce: items[1][i].produce_id,
          shopper: [CONST_USER_ID],
          quantity: items[1][i].Quantity,
        };
        cartObj.push(cartRow);
      }
      cartBatches.push(cartObj);
    }

    for (let i = 0; i < cartBatches.length; i += 1) {
      await cartBatch(cartBatches[i]);
    }
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
              key={ind}
              image={prodItemIter.Image[0].url}
            />
          ));
          setProductList(products);
        }
      }));
    });
  }, []);

  return (
    <ScrollView styles={styles.centeredContainer}>
      <View style={styles.background}>
        <View style={styles.shippingContainer}>
          <View style={styles.header}>
            <Title style={styles.titleText}>
              {` Order ID #${orderId}`}
            </Title>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            >
              <Icon size={15} color="black" name="time" />
              <Text style={styles.details}>
                {`Delivered on ${date} at ${time}`}
              </Text>
            </View>
          </View>
          <Text style={[styles.title, { marginLeft: '0%', marginBottom: '0%' }]}>
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
              <Text style={[styles.subdetails, { fontFamily: 'JosefinSans-SemiBold' }]}>
                {`${shippingAddress.address}, ${shippingAddress.apartmentLine}`}
              </Text>
              <Text style={[styles.subdetails, { fontFamily: 'JosefinSans-Regular' }]}>
                {shippingAddress.zipcode}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.subcontainer, { borderBottomColor: 'grey', borderBottomWidth: 1, marginBottom: '4%' }]}>
          <Text style={[styles.title]}>
            Review Items
          </Text>
          <Text style={[styles.subdetails, { fontFamily: 'JosefinSans-Regular' }]}>
            Delivery Date: Mon, Sep 10, 2022
          </Text>
          <View>
            {productList}
          </View>
        </View>
        <View style={[styles.subcontainer]}>
          <Text style={[styles.title]}>
            Order Summary
          </Text>
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
            uppercase={false}
            onPress={() => {
              orderAgain();
              navigation.navigate('Cart');
            }}
          >
            <Text style={styles.buttonText}>
              Order Again
            </Text>
          </Button>
        </View>
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
      items: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.object),
        ]),
      ),
    }),
  }).isRequired,
};
