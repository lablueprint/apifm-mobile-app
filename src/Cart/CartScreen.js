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
import SubscribeForm from './Subscribe';

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
    marginTop: '-35%',
  },
  productsContainer: {
    flex: 1,
    // justifyContent: 'start',
    alignItems: 'center',
    marginTop: '5%',
  },
  titleText: {
    marginBottom: '2%',
    marginTop: '40%',
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
  scrollView: {
    flex: 1,
    width: '95%',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  subscribeToggleContainer: {
    width: 300,
    height: 50,
    flexDirection: 'row',
    marginBottom: 150,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 150,
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  subscribeContainerTitle: {
    width: 200,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subscribeTextContainer: {
    width: 250,
    flexDirection: 'column',
    marginLeft: 20,
    marginTop: -5,
  },
  subtotalContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  subtotalText: {
    fontWeight: 'normal',
    fontSize: 18,
    marginLeft: 10,
  },
  subtotal: {
    marginRight: 10,
    marginLeft: 325,
    fontWeight: 'normal',
    fontSize: 18,
  },
});

// const fakeItems = { name: 'daikon', quantity: '2' };

export default function CartScreen({ navigation }) {
  const [itemList, setItemList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [isSubscribed, setSubscribed] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

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

  const calcTotal = () => {
    base('Cart').select({ filterByFormula: "({users}='helen@gmail.com')" }).all()
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
      name={item.name}
      price={item.price}
      type={item.type}
      initialQuantity={String(item.quantity)}
    />
  ));

  useEffect(() => {
    getItems();
    calcTotal();
  }, [refresh]);

  const onSubscribeToggle = () => setSubscribed(!isSubscribed);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        best cart ever omg who made this she must be hot
      </Title>
      {/* probably need this later <Text style={styles.bodyext}> */}
      <ScrollView style={styles.scrollView}>
        {products}

        <View style={styles.subscribeToggleContainer}>
          <Switch value={isSubscribed} onValueChange={onSubscribeToggle} />
          <View style={styles.subscribeTextContainer}>
            <Title style={styles.subscribeContainerTitle}>
              Subscribe
            </Title>
            <Text style={styles.subscribeContainerText}>
              Make this order a repeated order.
              <View style={styles.subscribeToggleContainer}>
                <SubscribeForm
                  hide={!isSubscribed}
                />
              </View>
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.subtotalContainer}>
        <Title style={styles.subtotalText}>
          Subtotal
        </Title>
        <Title style={styles.subtotal}>
          $
          {subtotal}
        </Title>
      </View>
      <Button
        mode="contained"
        onPress={console.log('pressed')}
      >
        CHECKOUT
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Marketplace')}
      >
        MARKETPLACE
      </Button>
    </View>
  );
}

CartScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
