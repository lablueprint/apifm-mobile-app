import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Title, Button,
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
    width: '100%',
    marginBottom: 10,
  },
});

// const fakeItems = { name: 'daikon', quantity: '2' };

export default function CartScreen({ navigation }) {
  const [itemList, setItemList] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const getItems = () => {
    const list = [];
    base('Cart').select({}).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const item = record;
        console.log(record.fields);
        list.push(item.fields);
      });
      setItemList(list);
      fetchNextPage();
    });
  };

  // LEFT TO DO LATER BECAUSE RIGHT NOW IT DOESNT WORK
  // const handleCheckout = (itemList) => {
  //   forEach (something) => {
  //     base('Cart').update([
  //       {
  //         id: item.item_id,
  //         fields: {
  //           checkout: 'checked out',
  //         },
  //       },
  //     ], (err, records) => {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       records.forEach((record) => {
  //         console.log(record.get('type'));
  //       });
  //     });
  //   }
  // };

  const products = itemList.map((item) => (
    <CartProduct
      itemID={item.item_id}
      key={item.item_id}
      setRefresh={setRefresh}
      refresh={refresh}
    />
  ));

  useEffect(() => {
    getItems();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        best cart ever omg who made this she must be hot
      </Title>
      {/* probably need this later <Text style={styles.bodyext}> */}
      <ScrollView style={styles.scrollView}>
        {products}

      </ScrollView>
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
