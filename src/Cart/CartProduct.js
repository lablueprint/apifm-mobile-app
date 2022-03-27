/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import {
  Text, Button, TextInput,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Airtable = require('airtable');

const image = require('../assets/imgs/square_logo.png');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    height: 125,
    marginTop: 5,
    marginBottom: 0,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyConent: 'center',
    flexDirection: 'column',
    marginLeft: 0,
    marginTop: 5,
    marginRight: 5,
  },
  container3: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 0,
    marginTop: 16,
  },
  quantityContainer: {
    // flex: 1,
    flexDirection: 'row',
    height: 65,
  },
  itemName: {
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
    marginRight: 10,
    marginLeft: 8,
    marginTop: 0,
    marginBottom: 0,
  },
  quantityBox: {
    width: 50,
    padding: '2%',
    margin: '1%',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  itemQuantityType: {
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 25,
  },
  itemQuantity: {
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    alignContent: 'center',
  },
  itemTotalPrice: {
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: '0%',
    marginLeft: 100,
    marginTop: 10,
  },
  itemPricePer: {
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    marginBottom: 0,
    marginLeft: 100,
  },
  removeItemButton: {
    width: '5%',
    padding: 0,
    marginTop: 15,
    marginLeft: 135,
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default function CartProduct(props) {
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = React.useState('');

  const {
    itemID,
    refresh,
    setRefresh,
  } = props;

  const getItem = () => {
    base('Cart').select({ maxRecords: 1, filterByFormula: `({item_id}='${itemID}')` }).firstPage()
      .then((records) => {
        const newItem = records[0].fields;
        setItem(newItem);
        setQuantity(String(newItem.Quantity));
        console.log(`new item${newItem.Quantity}`);
      });
  };

  const handleQuantityChange2 = (newQuantity) => {
    setQuantity(newQuantity);
    console.log(`QUANTITY GOT CHANGED${quantity}`);
    base('Cart').update([
      {
        id: String(itemID),
        fields: {
          Quantity: Number(newQuantity),
        },
      },
    ], (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record) => {
        console.log(record.get('Users UPDATED'));
      });
    });
  };

  useEffect(() => {
    getItem();
  }, []);

  const deleteItem = () => {
    base('Cart').destroy([itemID], (err, deletedRecords) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Deleted', deletedRecords.length, 'records');
    });
    setRefresh(refresh + 1);
  };
  // yay product
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.container3}>
        <Text style={styles.itemName}>
          {item.Name}
        </Text>
        <View style={styles.quantityContainer}>
          <TextInput
            keyboardType="numeric"
            value={quantity}
            style={styles.quantityBox}
            onChangeText={handleQuantityChange2}
          />
          <Text style={styles.itemQuantityType}>
            {item.type}
          </Text>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.itemTotalPrice}>
          $
          {item.price * quantity}
        </Text>
        <Text style={styles.itemPricePer}>
          $
          {item.price}
          {' '}
          ea
        </Text>
        <Button
          style={styles.removeItemButton}
          onPress={deleteItem}
          color="#000000"
        >
          <Icon style={{ fontSize: 20 }} name="delete" />
        </Button>
      </View>
    </View>
  );
}

CartProduct.propTypes = {
  itemID: PropTypes.string.isRequired,
  refresh: PropTypes.number.isRequired,
  setRefresh: PropTypes.func.isRequired,
};
