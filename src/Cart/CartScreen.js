import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Text, TouchableOpacity,
} from 'react-native';
import {
  Title,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Config from 'react-native-config';

import CartProduct from './CartProduct';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  entireScreen: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '2%',
  },
  productsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%',
  },
  titleText: {
    marginBottom: '2%',
    marginTop: '2%',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 24,
  },
  bodyText: {
    marginLeft: '0%',
    marginRight: '0%',
  },
  button: {
    width: '30%',
    marginTop: '4%',
    backgroundColor: '#FF9F00',
  },
  scrollView: {
    flex: 1,
    width: '98%',
    marginBottom: 30,
    marginTop: 15,
  },
  subtotalContainer: {
    flexDirection: 'row',
    marginBottom: '4%',
    marginTop: '0%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  subtotalText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
    marginLeft: 15,
    marginRight: 140,
  },
  subtotal: {
    marginRight: '4%',
    marginLeft: 140,
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
  },
  continueButton: {
    borderRadius: 25,
    height: 50,
    width: 300,
    marginBottom: 60,
    backgroundColor: '#1D763C',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default function CartScreen({ navigation }) {
  const [itemList, setItemList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [quantities, setQuantities] = useState({});

  const getItems = (useremail) => {
    const list = [];
    // comments: trying to calculate in getItems function 
    // let subtotal = 0;
    base('CART V3').select({ filterByFormula: `({shopper}='${useremail}')` }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const item = record;
        quantities[item.fields.name] = item.fields.quantity;
        // subtotal += item.fields.quantity * item.fields.price;
        list.push(item.fields);
      });
      setItemList(list);
      // setSubtotal(subtotal);
      fetchNextPage();
    });
  };

  // old function: kept up with updating quantities beautifully, didn't 
  // show when screen opened tho 

  // const calcTotal = () => {
  //   let sum = 0;
  //   itemList.forEach((item) => {
  //     sum += quantities[item.name] * item.price;
  //   });
  //   setSubtotal(sum);
  // };

  // even older function: pulling from airtable to calculate total 
  // const calcTotal = (useremail) => {
  //   base('CART V3').select({ filterByFormula: `({shopper}='${useremail}')` }).all()
  //     .then((items) => {
  //       let sum = 0;
  //       items.forEach((item) => {
  //         const price = item.get('price');
  //         sum += quantities[item.name] * price;
  //       });
  //       setSubtotal(sum);
  //     });
  // };

  const calcTotal = (itemList) => {
    let sum = 0;
    // throwing error that there is no forEach function for itemlist
    // itemList.forEach((item) => {
    //   sum += quantities[item.name] * item.price;
    // });

    // still not updating correctly or displaying upon first screen
    // for (let i = 0; i < itemList.length; i++) {
    //   sum+= itemList[i].price * itemList[i].quantity; 
    // }
    // setSubtotal(sum);
  };

  const products = itemList.map((item) => (
    <CartProduct
      itemID={item.item_id}
      key={item.item_id}
      setRefresh={setRefresh}
      refresh={refresh}
      name={item.name[0]}
      price={item.price[0]}
      type={item.unit[0]}
      initialQuantity={String(item.quantity)}
      image={item.image[0].url}
      quantities={quantities}
      setQuantities={setQuantities}
      border
    />
  ));

  useEffect(() => {
    // TODO: replace hardcoded email with logged-in user data
    getItems('jameshe@ucla.edu');
    calcTotal(itemList);
  }, [refresh]);

  return (
    <View style={styles.entireScreen}>
      <View style={styles.container}>
        {/* <Title style={styles.titleText}>
          Cart
        </Title> */}
        <ScrollView style={styles.scrollView}>
          {products}
        </ScrollView>
        <View style={styles.subtotalContainer}>
          <Title style={styles.subtotalText}>
            Subtotal
          </Title>
          <Title style={styles.subtotal}>
            {`$ ${parseFloat(subtotal).toFixed(2)}`}
          </Title>
        </View>
        <TouchableOpacity
          mode="contained"
          style={styles.continueButton}
          onPress={() => navigation.navigate('Checkout', { itemList })}
        >
          <Text style={styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

CartScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
