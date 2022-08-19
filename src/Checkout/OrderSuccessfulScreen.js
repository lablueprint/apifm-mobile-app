import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet,  ScrollView, ImageBackground, TouchableOpacity,
} from 'react-native';
import {
  Text, 
} from 'react-native-paper';
import PropTypes from 'prop-types';
import logo from '../assets/imgs/square_logo.png';

import CartProduct from '../Cart/CartProductUntoggle';

const background = require('../assets/imgs/checkoutBackground.png');

const styles = StyleSheet.create({
  scrollStyle: {
    backgroundColor: '#FFFFFA',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '6%',
    marginHorizontal: '16%',
    marginBottom: '8%',
  },
  bodyText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
    justifyContent: 'center',
    marginTop: '115%',
    textAlign: 'center',
  },
  subcontainer: {
    marginHorizontal: '8%',
  },
  backgroundStyle: {
    width: '100%',
    height: 1000,
  },
  titleText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 24,
  },
  overviewHeader: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
  },
  totalDueText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
  },
  button: {
    borderRadius: 25,
    height: 50,
    width: 300,
    marginTop: 60,
    marginBottom: 60,
    backgroundColor: '#1D763C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5,
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
      type={item.unit[0]}
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
    <ScrollView style={styles.scrollStyle}>
      <ImageBackground source={background} style={styles.backgroundStyle}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>
            Order Successful!
          </Text>
          <Text style={styles.bodyText}>
            Your order has been placed! You will receive a confirmation email within 24 hours.
            Thank you for choosing Food Roots!
          </Text>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.overviewHeader}>
            {`Order Overview (${count}):`}
          </Text>
          <View>
            {products}
          </View>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%',
          }}
          >
            <Text style={styles.overviewHeader}>
              Total due at delivery:
            </Text>
            <Text style={styles.overviewHeader}>
              {`$ ${parseFloat(total + deliveryFee).toFixed(2)}`}
            </Text>
          </View>
        </View>
        <View style={[styles.container, { marginBottom: '8%' }]}>
          <TouchableOpacity
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('Marketplace')}
          >
            <Text style={styles.buttonText}>
              Return To Marketplace
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

OrderSuccessfulScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      itemList: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }).isRequired,
};