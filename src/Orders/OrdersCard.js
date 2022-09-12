import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TouchableOpacity, Image, Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

const missingImage = require('../assets/imgs/square_logo.png');

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
    width: 136,
    height: 136,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    resizeMode: 'contain',
    aspectRatio: 1,
    marginTop: -10,
  },
  name: {
    height: 25,
    fontSize: 17,
    marginStart: 10,
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
    marginStart: 150,
    marginTop: -120,
    fontFamily: 'JosefinSans-Regular',
  },
  quantity: {
    alignSelf: 'flex-start',
    marginStart: 150,
    fontFamily: 'JosefinSans-Regular',
    marginTop: 5,
  },
});

function OrderCard({
  navigation, orderId, items, itemsList, images,
}) {
  const { selectedDeliveryDay } = useSelector((state) => state.auth);
  const [itemList, setItemList] = useState(itemsList.get(new Date(items[0]).toString()));
  const [image, setImage] = useState(images.get(new Date(items[0]).toString()));

  const dateObj = new Date(items[0]);
  const date = dateObj.toDateString();
  const deliveryDay = dateObj.getDay() === 1 ? 'Monday' : 'Friday';
  const today = new Date();
  const closedMarket = ((today.getDay() === 5 && today.getHours() >= 15)
  || today.getDay() === 6 || today.getDay() === 0
  || (today.getDay() === 1 && today.getHours() <= 14));
  const restrictedMarket = ((today.getDay() === 2 && today.getHours >= 17)
  || today.getDay() === 3
  || (today.getDay() === 4 && today.getHours <= 15));

  const onPressCard = () => {
    if (!closedMarket && !restrictedMarket) {
      if (selectedDeliveryDay === deliveryDay) {
        navigation.navigate('OrderDetails', {
          navigation, orderId, deliveryDay, date, items,
        });
      } else {
        Alert.alert(
          'Mismatching Delivery Day',
          'You cannot reorder this if your \n expected delivery day does not match the selected order.',
        );
      }
    } else {
      Alert.alert('Closed/Restricted Market', 'You cannot reorder when the marketplace is restricted or closed.');
    }
  };

  useEffect(() => {
    setItemList(itemsList.get(new Date(items[0]).toString()));
    setImage(images.get(new Date(items[0]).toString()));
  }, [items]);
  const imageurl = { uri: image };
  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View style={styles.cardContainer}>
        <Image resizeMode="cover" style={styles.image} source={image === '' ? missingImage : imageurl} />
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
    ]),
  ).isRequired,
  itemsList: PropTypes.instanceOf(Map).isRequired,
  images: PropTypes.string.isRequired,
};

export default OrderCard;
