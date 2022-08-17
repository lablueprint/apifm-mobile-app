import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Image, Alert,
} from 'react-native';
import {
  Text, Button, TextInput,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Airtable = require('airtable');

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
    height: 125,
    marginTop: 5,
    marginBottom: 0,
  },
  container2: {
    alignItems: 'center',
    justifyConent: 'center',
    flexDirection: 'column',
    marginLeft: 0,
    marginTop: 10,
    marginRight: 5,
  },
  container3: {
    //    flex: 1,
    //    flexDirection: 'column',
    marginLeft: 0,
    marginTop: 20,
    width: 125,
  },

  itemName: {
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    fontSize: 20,
    marginRight: 10,
    marginLeft: 13,
    marginTop: 0,
    marginBottom: 0,
  },

  itemQuantityType: {
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 15,
    marginTop: 5,
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
  image: {
    width: 80,
    height: 80,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default function CartProduct(props) {
  const {
    itemID,
    refresh,
    setRefresh,
    name,
    price,
    type,
    initialQuantity,
    image,
  } = props;

  const [quantity, setQuantity] = useState(String(initialQuantity));

  const getItem = () => {
    base('CART V3').select({ maxRecords: 1, filterByFormula: `({item_id}='${itemID}')` }).firstPage()
      .then((records) => {
        const newItem = records[0].fields;
        setQuantity(String(newItem.quantity));
      });
  };

  const imageurl = { uri: image };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    base('CART V3').update([
      {
        id: String(itemID),
        fields: {
          quantity: Number(newQuantity),
        },
      },
    ], (err) => {
      if (err) {
        Alert.alert(err);
      }
    });
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    getItem();
  }, []);

  const deleteItem = () => {
    base('CART V3').destroy([itemID], (err) => {
      if (err) {
        Alert.alert(err);
      }
    });
    setRefresh(refresh + 1);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageurl} />
      <View style={styles.container3}>
        <Text style={styles.itemName}>
          {name}
        </Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.itemQuantityType}>
            Quantity:
            {' '}
          </Text>
          <TextInput
            keyboardType="numeric"
            value={quantity}
            style={styles.quantityBox}
            onChangeText={handleQuantityChange}
          />
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.itemTotalPrice}>
          {`$ ${parseFloat((price) * quantity).toFixed(2)}`}
        </Text>
        <Text style={styles.itemPricePer}>
          {`$ ${price} ${type}`}
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
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  initialQuantity: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
