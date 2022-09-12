import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Image, ScrollView,
} from 'react-native';
import {
  Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import logo from '../assets/imgs/square_logo.png';

import CartProduct from '../Cart/CartProductUntoggle';

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
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 14,
  },
  button: {
    width: '60%',
    marginTop: 10,
    backgroundColor: '#0492c2',
  },
  subcontainer: {
    marginHorizontal: '8%',
  },
});

export default function OrderSuccessfulScreen({ route, navigation }) {
  const { itemList } = route.params;
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

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
  }, []);

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Image style={{ width: 275, height: 275 }} source={logo} />
        <Text style={[styles.bodyText, { marginLeft: '0%', marginTop: '8%' }]}>
          Your order has been placed! Our staff will contact you alskjfslfjd lsjfhl sjdfljs
          dflj f delivery shipping money stlsjf lfj lsfj slfj lfdj lkjdnsvnfskv ndfjn sdfn
        </Text>
      </View>

      <View style={styles.subcontainer}>
        <Text style={[styles.titleText, {
          fontSize: 22,
          marginLeft: '0%',
        }]}
        >
          {`Order Overview (${count}):`}
        </Text>
        <View>
          {products}
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%',
        }}
        >
          <Text style={styles.titleText}>
            Total Due at Delivery:
          </Text>
          <Text style={styles.titleText}>
            {`$${parseFloat(total).toFixed(2)}`}
          </Text>
        </View>
      </View>
      <View style={[styles.container, { marginBottom: '8%' }]}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Marketplace')}
        >
          Return To Marketplace
        </Button>
      </View>
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
