import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#C4C4C4',
    width: 334,
    height: 116,
    borderRadius: 15,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    marginTop: 12,
    width: 90,
    height: 90,
    alignSelf: 'flex-start',
    marginStart: 10,
    backgroundColor: '#A1A1A1',
  },
  name: {
    height: 25,
    fontSize: 19,
    marginStart: -10,
    marginTop: -80,
    fontWeight: '700',
  },
  bottom: {
    height: 50,
    flexDirection: 'column',
    marginStart: -20,
    fontSize: 12,
    fontWeight: '100',
  },
  date: {
    alignSelf: 'flex-start',
    marginStart: 90,
  },
  quantity: {
    alignSelf: 'flex-start',
    marginStart: 90,
  },
});

function OrderCard({
  navigation, orderId, items, itemsList,
}) {
  const [itemList, setItemList] = useState(itemsList.get(new Date(items[0]).toString()));
  const dateObj = new Date(items[0]);
  const date = dateObj.toDateString();

  const onPressCard = () => {
    const time = dateObj.toLocaleTimeString('en-US');
    navigation.navigate('OrderDetails', {
      navigation, orderId, date, time, items,
    });
  };

  useEffect(() => {
    setItemList(itemsList.get(new Date(items[0]).toString()));
  }, [items]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View style={styles.cardContainer}>
        <View style={styles.image} />
        <Text style={styles.name}>
          Order ID #
          {orderId}
        </Text>
        <View style={styles.bottom}>
          <Text style={styles.date}>
            Delivered on
            {' '}
            {date}
          </Text>
          <Text style={styles.quantity}>
            {itemList}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

OrderCard.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  orderId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.Object).isRequired,
  itemsList: PropTypes.instanceOf(Map).isRequired,
};

export default OrderCard;
