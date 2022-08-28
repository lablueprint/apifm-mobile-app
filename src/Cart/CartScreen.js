import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import {
  Title, Button,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Config from 'react-native-config';
import store from '../lib/redux/store';
import CartProduct from './CartProduct';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

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
  const currentUser = store.getState().auth.user;

  const [itemList, setItemList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const getItems = (useremail) => {
    const list = [];
    base('CART V3').select({ filterByFormula: `({shopper}='${useremail}')` }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const item = record;
        list.push(item.fields);
      });
      setItemList(list);
      fetchNextPage();
    });
  };

  const calcTotal = (useremail) => {
    base('CART V3').select({ filterByFormula: `({shopper}='${useremail}')` }).all()
      .then((items) => {
        let sum = 0;
        items.forEach((item) => {
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
    getItems(currentUser.email);
    calcTotal(currentUser.email);
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        Current Cart
      </Title>
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
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('Checkout', { itemList });
        }}
      >
        CHECKOUT
      </Button>
    </View>
  );
}

CartScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
