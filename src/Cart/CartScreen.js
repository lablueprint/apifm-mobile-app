import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Text,
} from 'react-native';
import {
  Title, Button, Switch,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
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
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '3%',
  },
  productsContainer: {
    flex: 1,
    // justifyContent: 'start',
    alignItems: 'center',
    marginTop: '5%',
  },
  titleText: {
    marginBottom: '2%',
    marginTop: '4%',
  },
  bodyText: {
    marginLeft: '0%',
    marginRight: '0%',
  },
  button: {
    width: '30%',
    marginTop: '4%',
    backgroundColor: '#0492c2',
  },
  scrollView: {
    flex: 1,
    width: '95%',
    marginBottom: '2%',
  },
  subtotalContainer: {
    flexDirection: 'row',
    marginBottom: '4%',
    marginTop: '0%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  subtotalText: {
    fontWeight: 'normal',
    fontSize: 18,
    marginLeft: '4%',
  },
  subtotal: {
    marginRight: '4%',
    marginLeft: '4%',
    fontWeight: 'normal',
    fontSize: 18,
  },
});

export default function CartScreen({ navigation }) {
  const [itemList, setItemList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const getItems = () => {
    const list = [];
    base('CART V3').select({ filterByFormula: "({shopper}='helen@gmail.com')" }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const item = record;
        console.log(record.fields);
        list.push(item.fields);
      });
      setItemList(list);
      fetchNextPage();
    });
  };

  const calcTotal = () => {
    base('CART V3').select({ filterByFormula: "({shopper}='helen@gmail.com')" }).all()
      .then((items) => {
        let sum = 0;
        // eslint-disable-next-line array-callback-return
        items.map((item) => {
          const price = item.get('price');
          sum += item.fields.quantity * price;
        });
        setSubtotal(sum);
      });
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
    />
  ));

  useEffect(() => {
    getItems();
    calcTotal();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        Current Cart
      </Title>
      {/* probably need this later <Text style={styles.bodyext}> */}
      <ScrollView style={styles.scrollView}>
        {products}
      </ScrollView>
      <View style={styles.subtotalContainer}>
        <Title style={styles.subtotalText}>
          Subtotal
        </Title>
        <Title style={styles.subtotal}>
          $
          {parseFloat(subtotal).toFixed(2)}
        </Title>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Checkout')}
      >
        CHECKOUT
      </Button>
      {/* <Button
        mode="contained"
        style={[styles.button, { marginBottom: '4%' }]}
        onPress={() => navigation.navigate('Marketplace')}
      >
        MARKETPLACE
      </Button> */}
    </View>
  );
}

CartScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
