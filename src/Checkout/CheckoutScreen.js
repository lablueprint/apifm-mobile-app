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

import CartProduct from '../Cart/CartProduct';

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
  const [deliveryDate, setDeliveryDate] = useState('unavailable');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [freeFee, setFreeFee] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const calcTotal = (useremail) => {
    base('Cart TBD').select({ filterByFormula: `({user}='${useremail}')` }).all()
      .then((items) => {
        let sum = 0;
        let c = 0;
        // eslint-disable-next-line array-callback-return
        items.map((item) => {
          const price = item.get('price of produce');
          sum += item.fields.quantity * price;
          c += 1;
        });
        setTotal(sum);
        setCount(c);
      });
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
  const getItems = () => {
    const list = [];
    base('Cart').select({ filterByFormula: "({users}='helen@gmail.com')" }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const item = record;
        console.log(record.fields);
        list.push(item.fields);
      });
      setItemList(list);
      fetchNextPage();
    });
  };
  const products = itemList.map((item) => (
    <CartProduct
      itemID={item.item_id}
      key={item.item_id}
      setRefresh={setRefresh}
      refresh={refresh}
      name={item.name}
      price={item.price}
      type={item.type}
      initialQuantity={String(item.quantity)}
    />
  ));
  useEffect(() => {
    // hardcoded to helen!
    setOrderDetails('helen@gmail.com');
    calcTotal('helen@gmail.com');
    getItems();
    setDeliveryFee(10);
    setFreeFee(20);
    setDeliveryDate('January 2023!');
  }, []);

  const pushToOrderTable = async (useremail) => {
    const cartIDs = [];
    await base('Cart TBD').select({ filterByFormula: `({user}="${useremail}")` }).all()
      .then((items) => {
      // eslint-disable-next-line array-callback-return
        items.map((item) => {
          cartIDs.push(item.get('item id'));
          base('Orders').create({
            user_id: useremail,
            produce_id: item.get('produce'),
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
    base('Cart TBD').destroy(cartIDs, (err) => {
      if (err) {
        Alert.alert(err.message);
      }
    });
  };
  return (
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

        </View>
        <ScrollView style={styles.scrollView}>
          {products}
        </ScrollView>
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
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginLeft: '0%', marginRight: '30%', marginBottom: '3%',
        }}
        >
          <Text style={[styles.subdetails, {
            color: '#C4C4C4',
            marginLeft: '0%',
          }]}
          >
            Add
            {' $'}
            {parseFloat(freeFee).toFixed(2)}
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
            navigation.navigate('Order Successful');
          }}
        >
          Confirm
        </Button>
      </View>
    </ScrollView>
  );
}

CheckoutScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
