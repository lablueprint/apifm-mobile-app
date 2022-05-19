import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    width: 334,
    height: 116,
    borderRadius: 15,
    elevation: 1,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 116,
    alignSelf: 'flex-start',
    backgroundColor: '#A1A1A1',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    resizeMode: 'contain',

  },
  name: {
    height: 25,
    fontSize: 17,
    marginStart: -50,
    marginTop: 7,
    fontFamily: 'JosefinSans-SemiBold',
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
    marginStart: 120,
    marginTop: -100,
    fontFamily: 'JosefinSans-Regular',
  },
  quantity: {
    alignSelf: 'flex-start',
    marginStart: 120,
    fontFamily: 'JosefinSans-Regular',
    marginTop: 7,
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
        <View style={styles.image}/>
        <Text style={styles.date}>
          {`Delivered on ${date}`}
        </Text>
        <Text style={styles.name}>
          ID #
          {orderId}
        </Text>
        <Text style={styles.quantity}>
          {itemList}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

OrderCard.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  orderId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.object),
    ])
  ),
  itemsList: PropTypes.instanceOf(Map).isRequired,
};

export default OrderCard;
