import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import { Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';

const missingImage = require('../assets/imgs/square_logo.png');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: 125,
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
    marginLeft: 0,
    marginTop: 25,
    width: 100,

  },

  itemName: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 13,
    marginTop: 0,
    marginBottom: 0,
    width: 150,
  },

  itemQuantityType: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 15,
    marginTop: 5,
  },
  itemTotalPrice: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 15,
    marginBottom: '0%',
    marginLeft: 100,
    marginTop: 10,
  },
  itemPricePer: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 12,
    marginBottom: 0,
    marginLeft: 100,
    color: 'grey',
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default function OrderItem(props) {
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
      <Image style={styles.image} source={image === '' ? missingImage : imageurl} />
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
          {`$ ${Math.trunc((price * quantity) * 100) / 100}`}
        </Text>
        <Text style={styles.itemPricePer}>
          {`$ ${price} ${type}`}
        </Text>
      </View>
    </View>
  );
}

OrderItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
