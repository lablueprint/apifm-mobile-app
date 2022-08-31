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
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  container2: {
    alignItems: 'flex-end',
    justifyConent: 'flex-end',
    flexDirection: 'column',
    marginLeft: 0,
    marginTop: 10,
    marginRight: 5,
    flex: 1,
  },
  container3: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 0,
    marginTop: 18,
    width: '100%',
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

  itemQuantityType: {
    fontFamily: 'JosefinSans-Regular',
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
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    marginBottom: '0%',
    marginLeft: '45%',
    marginTop: 10,
    color: '#34221D',
  },
  itemPricePer: {
    color: '#868686',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 0,
    marginLeft: '20%',
    textAlign: 'right',
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,

  },
  quantityBox: {
    borderRadius: 5,
    borderColor: '#C4C4C4',
    fontFamily: 'JosefinSans-Regular',
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
          {`$${parseFloat((price) * quantity).toFixed(2)}`}
        </Text>
        <Text style={styles.itemPricePer}>
          {`$${price} ${type}`}
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
