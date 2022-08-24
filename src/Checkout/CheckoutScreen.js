/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Alert, ScrollView,
} from 'react-native';
import {
  Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import store from '../lib/redux/store';

import CartProduct from '../Cart/CartProductUntoggle';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '95%',
    marginBottom: '2%',
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
  title: {
    fontSize: 18,
    marginBottom: '2%',
    color: 'black',
  },
  subdetails: {
    fontSize: 14,
    marginTop: '.5%',
    marginBottom: '.5%',
    color: '#636363',
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

export default function CheckoutScreen({ route, navigation }) {
  const currentUser = store.getState().auth.user;

  const [shippingAddress, setShippingAddress] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('unavailable');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [freeFee, setFreeFee] = useState(0);
  const [itemList] = useState(route.params.itemList);

  const calcTotal = () => {
    let sum = 0;
    let c = 0;
    itemList.forEach((item) => {
      const { price, quantity } = item;
      sum += quantity * price;
      c += 1; // not confirmed if its +1 or +quantity by designers
      // if for instance some one buys 5 lbs of peanuts, I imagine it'd be one item
    });
    setTotal(sum);
    setCount(c);
  };

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

  const checkoutproducts = itemList.map((item) => (
    <CartProduct
      name={item.name[0]}
      price={item.price[0]}
      key={item.item_id}
      type={item.unit[0]}
      quantity={item.quantity}
      image={item.image[0].url}
    />
  ));

  useEffect(() => {
    // TODO: replace hardcoded email with logged in user info
    setOrderDetails(currentUser.email);
    calcTotal();

    setDeliveryFee(10);
    setFreeFee(20);
    setDeliveryDate('January 2023!');
  }, []);

  const pushToOrderTable = async (useremail) => {
    const cartIDs = [];
    await base('CART V3').select({ filterByFormula: `({shopper}='${useremail}')` }).all()
      .then((items) => {
        items.forEach((item) => {
          cartIDs.push(item.get('item_id'));
          base('Orders').create({
            user_id: useremail,
            produce_id: item.get('Produce'),
            Quantity: item.get('quantity'),
            'delivery fee (temp)': deliveryFee,
            'fee to be free (temp)': freeFee,
          }, (err) => {
            if (err) {
              Alert.alert(err.message);
            }
          });
        });
      });
    base('CART V3').destroy(cartIDs, (err) => {
      if (err) {
        Alert.alert(err.message);
      }
    });
  };
  return (
    <View>
      <ScrollView>
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
              {' '}
              {deliveryDate}
            </Text>
            <View style={{ flex: 1 }}>
              <View>
                {checkoutproducts}
              </View>
            </View>
          </View>
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
              {parseFloat(total).toFixed(2)}
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
              {parseFloat(deliveryFee).toFixed(2)}
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
              $
              {parseFloat(total + deliveryFee).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={[styles.container, { marginBottom: '8%' }]}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              pushToOrderTable('helen@gmail.com');
              navigation.navigate('Order Successful', {
                itemList,
              });
            }}
          >
            Confirm
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

CheckoutScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      itemList: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }).isRequired,
};
