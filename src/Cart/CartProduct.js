import React from 'react';
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
    width: '100%',
    marginLeft: 0,
  },
  container2: {
    alignItems: 'flex-end',
    justifyConent: 'center',
    flexDirection: 'column',
    marginLeft: -5,
    marginTop: 10,
    marginRight: 8,
    flex: 1,
  },
  container3: {
    flex: 1,
    marginLeft: 0,
    marginTop: 16,
    display: 'flex',
    width: '100%',
  },
  container4: {
    width: '100%',
  },
  quantityContainer: {
    flexDirection: 'row',
    height: 60,
  },

  itemName: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 15,
    marginTop: 0,
    marginBottom: 0,
    color: '#34221D',
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C4C4C4',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 14,
    margin: '1%',
    marginTop: 10,
    marginLeft: 17,
    marginBottom: 20,
    padding: '-3%',
    justifyContent: 'center',
    alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: '#FFFFFA',
  },
  itemQuantityType: {
    fontFamily: 'JosefinSans-Regular',
    fontStyle: 'normal',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 15,
    color: '#868686',
  },
  itemQuantity: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    alignContent: 'center',
  },
  itemTotalPrice: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    marginBottom: '0%',
    marginTop: 10,
    color: '#34221D',
  },
  itemPricePer: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    marginBottom: 0,
    marginLeft: 15,
    marginTop: 7,
    color: '#868686',
  },
  removeItemButton: {
    padding: 0,
    marginTop: 30,
    marginLeft: '45%',
    marginRight: -20,
  },
  image: {
    width: 85,
    height: 85,
    marginLeft: 5,
    marginTop: 21,
    borderRadius: 5,
  },
});

export default function CartProduct(props) {
  const {
    itemID,
    itemRefresh,
    setItemRefresh,
    calcRefresh,
    setCalcRefresh,
    name,
    price,
    type,
    image,
    quantities,
    setQuantities,
    minQuantity,
    maxQuantity,
  } = props;

  const imageurl = { uri: image };
  const totalUnits = type === 'each' ? '' : type;

  const handleQuantityChange = (newQuantity) => {
    setQuantities(() => ({
      ...quantities,
      [name]: newQuantity,
    }));
    setCalcRefresh(calcRefresh + 1);
  };

  const submitQuantity = async () => {
    let updatedQuantity = Number(quantities[name]);
    if (updatedQuantity < minQuantity) {
      updatedQuantity = minQuantity;
    } else if (updatedQuantity > maxQuantity) {
      updatedQuantity = maxQuantity;
    }
    setQuantities(() => ({
      ...quantities,
      [name]: updatedQuantity,
    }));
    await base('CART V3').update([
      {
        id: String(itemID),
        fields: {
          quantity: updatedQuantity,
        },
      },
    ], (err) => {
      if (err) {
        Alert.alert(err.error, err.message);
      }
    });
    setCalcRefresh(calcRefresh + 1);
  };

  const deleteItem = () => {
    base('CART V3').destroy([itemID], (err) => {
      if (err) {
        Alert.alert(err);
      }
    });
    setItemRefresh(itemRefresh + 1);
    setCalcRefresh(calcRefresh + 1);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageurl} />
      <View style={styles.container3}>
        <View style={styles.container4}>
          <Text style={styles.itemName}>
            {name}
          </Text>
        </View>
        <Text style={styles.itemPricePer}>
          {`$${price}/${type}`}
        </Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={String(quantities[name])}
            onChangeText={handleQuantityChange}
            onSubmitEditing={submitQuantity}
            onEndEditing={submitQuantity}
          />
          <Text style={styles.itemQuantityType}>
            {totalUnits}
          </Text>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.itemTotalPrice}>
          {`$${parseFloat((price) * quantities[name]).toFixed(2)}`}
        </Text>
        <Button
          style={styles.removeItemButton}
          onPress={deleteItem}
          color="#000000"
        >
          <Icon style={{ fontSize: 18 }} name="trash-2" />
        </Button>
      </View>
    </View>
  );
}

CartProduct.propTypes = {
  itemID: PropTypes.string.isRequired,
  itemRefresh: PropTypes.number.isRequired,
  setItemRefresh: PropTypes.func.isRequired,
  calcRefresh: PropTypes.number.isRequired,
  setCalcRefresh: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  quantities: PropTypes.object.isRequired,
  setQuantities: PropTypes.func.isRequired,
  minQuantity: PropTypes.number.isRequired,
  maxQuantity: PropTypes.number.isRequired,
};
