import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Image, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  Text,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import CartProduct from '../Cart/CartProductUntoggle';

import backgroundImage from '../assets/imgs/confirmbg.png';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '8%',
    marginHorizontal: '16%',
    marginBottom: '8%',
  },
  titleText: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'JosefinSans-SemiBold',
  },
  bodyText: {
    fontSize: 14,
    fontFamily: 'JosefinSans-SemiBold',
    width: '62%',
    marginTop: 310,
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  button: {
    width: '60%',
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: '#1D763C',
    borderRadius: 99,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
  },
  subcontainer: {
    marginHorizontal: '8%',
  },
  splash: {
    zIndex: -99,
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
  },
  mainTitleText: {
    marginTop: 60,
    marginBottom: 10,
    fontSize: 22,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default function OrderSuccessfulScreen({ route, navigation }) {
  const { itemList } = route.params;
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const products = itemList.map((item) => (
    <CartProduct
      name={item.name[0]}
      price={item.price[0]}
      key={item.item_id}
      type={`/ ${item.unit[0]}`}
      quantity={item.quantity}
      image={item.image[0].url}
    />
  ));

  const calcTotal = () => {
    let sum = 0;
    let c = 0;
    itemList.forEach((item) => {
      const { price, quantity } = item;
      sum += quantity * price;
      c += 1;
    });
    setTotal(sum);
    setCount(c);
  };

  useEffect(() => {
    calcTotal();
    setDeliveryFee(10);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#FFFFFA' }}>
      <Image source={backgroundImage} style={styles.backgroundImage} />

      <Text style={styles.mainTitleText}>Order Successful!</Text>
      <Text style={styles.bodyText}>
        Your order has been placed!
        You will receive a confirmation email within 24 hours.
        Thank you for choosing Food Roots!
      </Text>

      <View style={styles.subcontainer}>
        <Text style={styles.titleText}>
          Order Overview
        </Text>
        <View>
          {products}
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: '15%',
        }}
        >
          <Text style={styles.titleText}>
            Total due at delivery
          </Text>
          <Text style={styles.titleText}>
            {`$${parseFloat(total + deliveryFee).toFixed(2)}`}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Marketplace')}
      >
        <Text
          style={styles.buttonText}
        >
          Return to Market
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

OrderSuccessfulScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      itemList: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }).isRequired,
};
