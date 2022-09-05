/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Alert, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  Text,
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
  backButton: {
    color: 'black',
    paddingLeft: 30,
    paddingTop: 40,
    position: 'absolute',
    zIndex: 99,
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
  title: {
    fontSize: 18,
    marginBottom: '2%',
    color: '#34221D',
    fontFamily: 'JosefinSans-SemiBold',
  },
  subdetails: {
    fontSize: 14,
    marginTop: '.5%',
    marginBottom: '.5%',
    color: '#636363',
    fontFamily: 'JosefinSans-Regular',
  },
  subcontainer: {
    marginHorizontal: '8%',
    paddingTop: 10,
    paddingBottom: 20,
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
  mainTitle: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 22,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    width: '60%',
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: '#1D763C',
    borderRadius: 99,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
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
  const [itemList] = useState(route.params.itemList);

  const calcTotal = () => {
    let sum = 0;
    let c = 0;
    itemList.forEach((item) => {
      const { price, quantity } = item;
      sum += quantity * price;
      c += 1;
    });
    setTotal(sum);
    setCount(c);
  };

  const parseDate = (useremail) => {
    let date = '';
    base('Cart V3').select({
      filterByFormula: `({shopper}='${useremail}')`,
    }).firstPage()
      .then((records) => {
        const [dayOfWeek] = records[0].fields['Delivery Day'];
        switch (dayOfWeek) {
          case 'M': date = 'Mon, ';
            break;
          case 'F': date = 'Fri, ';
            break;
          default: { Alert.alert('Invalid Day of Week');
            return; }
        }
        const [month, day, year] = records[0].fields['Delivery Date'].split('/');
        switch (month) {
          case '01': date = date.concat('Jan');
            break;
          case '02': date = date.concat('Feb');
            break;
          case '03': date = date.concat('Mar');
            break;
          case '04': date = date.concat('Apr');
            break;
          case '05': date = date.concat('May');
            break;
          case '06': date = date.concat('Jun');
            break;
          case '07': date = date.concat('Jul');
            break;
          case '08': date = date.concat('Aug');
            break;
          case '09': date = date.concat('Sep');
            break;
          case '10': date = date.concat('Oct');
            break;
          case '11': date = date.concat('Nov');
            break;
          case '12': date = date.concat('Dec');
            break;
          default: { Alert.alert('Invalid Month');
            return; }
        }
        date = date.concat(` ${day}`);
        date = date.concat(`, ${year}`);
        setDeliveryDate(date);
      });
  };

  const setOrderDetails = (useremail) => {
    base('Users').select({
      filterByFormula: `({email}='${useremail}')`,
    }).firstPage()
      .then((records) => {
        if (records[0].fields['apartment number']) {
          setShippingAddress({
            address: records[0].fields.address,
            zipcode: `, ${records[0].fields.zipcode}`,
            apartmentLine: `, Apt ${records[0].fields['apartment number']}`,
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
    setOrderDetails(currentUser.email);
    calcTotal();
    parseDate(currentUser.email);
  }, []);

  const pushToOrderTable = async (userid, useremail) => {
    const cartIDs = [];
    await base('CART V3').select({ filterByFormula: `({shopper}='${useremail}')` }).all()
      .then((items) => {
        items.forEach((item) => {
          cartIDs.push(item.get('item_id'));
          base('Orders').create({
            Shopper: [userid],
            produce_id: item.get('Produce'),
            Quantity: item.get('quantity'),
            'Est. Delivery Date': item.get('Delivery Date'),
          }, (err) => {
            if (err) {
              Alert.alert(err.message);
            }
          });
        });
      });
    await base('CART V3').destroy(cartIDs, (err) => {
      if (err) {
        Alert.alert(err.message);
      }
    });
  };
  return (
    <View style={{ backgroundColor: '#FFFFFA' }}>
      <ScrollView>
        <TouchableOpacity>
          <Icon
            size={30}
            name="arrow-back"
            style={styles.backButton}
            onPress={() => { navigation.goBack(); }}
          />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Checkout</Text>
        <View style={[styles.subcontainer, {
          marginVertical: '5%', marginHorizontal: '8%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1,
        }]}
        >
          <Text style={styles.title}>
            Shipping Address
          </Text>
          <View style={{
            flexDirection: 'row', justifyContent: 'flex-start',
          }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '3%' }}>
              <Icon size={25} color="#1D763C" name="location-sharp" />
            </View>
            <View style={{
              marginLeft: '0%', flexDirection: 'row', marginVertical: '2%', flexShrink: 1,
            }}
            >
              <Text style={[styles.title, {
                fontWeight: '600',
                flexShrink: 1,
              }]}
              >
                {shippingAddress.address}
                {shippingAddress.apartmentLine}
                {shippingAddress.zipcode}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.subcontainer, { borderBottomColor: '#c4c4c4', borderBottomWidth: 1, marginBottom: '5%' }]}>
          <View style={styles.title}>
            <Text style={styles.title}>
              Review Items
            </Text>
            <Text style={[styles.subdetails, { color: '#34221D' }]}>
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
            <Text style={styles.title}>
              Order Summary
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.subdetails, { marginLeft: '0%' }]}>
              Items (
              {count}
              ):
            </Text>
            <Text style={[styles.subdetails, { marginRight: '0%' }]}>
              $
              {parseFloat(total).toFixed(2)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
            <Text style={[styles.subdetails, { marginLeft: '0%' }]}>
              Delivery Fee:
            </Text>
            <Text style={[styles.subdetails, { marginRight: '0%' }]}>
              TBD
            </Text>
          </View>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', marginTop: '12%',
          }}
          >
            <Text style={[styles.title, { marginLeft: '0%' }]}>
              Order Total
            </Text>
            <Text style={[styles.title, { marginRight: '0%' }]}>
              $
              {parseFloat(total).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={[styles.container, { marginBottom: '8%' }]}>
          <TouchableOpacity
            mode="contained"
            style={styles.button}
            onPress={() => {
              pushToOrderTable(currentUser.id, currentUser.email);
              navigation.navigate('Order Successful', {
                itemList,
              });
            }}
          >
            <Text
              style={styles.buttonText}
            >
              Place Order
            </Text>
          </TouchableOpacity>
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
      // eslint-disable-next-line react/forbid-prop-types
      itemList: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }).isRequired,
};
