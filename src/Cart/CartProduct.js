import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Image, Alert,
} from 'react-native';
import {
  Text, Button, TextInput,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Feather';

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
    height: 130,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    marginTop: 1,
    marginBottom: 1,
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
    flexDirection: 'row',
    height: 60,
  },
  itemName: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 14,
    marginRight: 10,
    marginLeft: 15,
    marginTop: 0,
    marginBottom: 0,
  },
  quantityBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C4C4C4',
    fontSize: 14,
    margin: '1%',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 20,
    padding: '-3%',
    justifyContent: 'center',
    alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: '#FFFFFA',
    // fontFamily: 'Arial',
  },
  itemQuantityType: {
    fontFamily: 'JosefinSans-Regular',
    fontStyle: 'normal',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 20,
  },
  itemQuantity: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    alignContent: 'center',
  },
  itemTotalPrice: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 14,
    marginBottom: '0%',
    marginLeft: 110,
    marginTop: 15,
  },
  itemPricePer: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 12,
    marginBottom: 0,
    marginLeft: 20,
    marginTop: 1,
  },
  removeItemButton: {
    padding: 0,
    marginTop: 30,
    marginLeft: 135,
    marginRight: 10,
  },
  image: {
    width: 62,
    height: 62,
    marginLeft: 5,
    marginTop: 25,
    marginBottom: 20,
    borderRadius: 5,
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
        Alert.alert(err.error, err.message);
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
        console.error(err);
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
        <Text style={styles.itemPricePer}>
          {`$${price} ${type}`}
        </Text>
        <View style={styles.quantityContainer}>
          <TextInput
            keyboardType="numeric"
            value={quantity}
            style={styles.quantityBox}
            onChangeText={handleQuantityChange}
          />
          <Text style={styles.itemQuantityType}>
            {type}
          </Text>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.itemTotalPrice}>
          {`$${parseFloat((price) * quantity).toFixed(2)}`}
        </Text>
        <Button
          style={styles.removeItemButton}
          onPress={deleteItem}
          color="#000000"
        >
          <Icon style={{ fontSize: 20 }} name="trash-2" />
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
