import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import {
  Text,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';

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
    name,
    price,
    type,
    quantity,
    image,
  } = props;

  const imageurl = { uri: image };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageurl} />
      <View style={styles.container3}>
        <Text style={styles.itemName}>
          {name}
        </Text>
        <View>
          <Text style={styles.itemQuantityType}>
            {`Quantity: ${quantity}`}
          </Text>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.itemTotalPrice}>
          {`$ ${parseFloat((price) * quantity).toFixed(2)}`}
        </Text>
        <Text style={styles.itemPricePer}>
          {`$ ${price} ${type}`}
        </Text>
      </View>
    </View>
  );
}

CartProduct.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
