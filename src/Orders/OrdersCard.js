import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const missingImage = require('../assets/missingImage.png');
const Airtable = require('airtable');
import Config from 'react-native-config';

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

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
  favoriteIcon: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginEnd: 10,
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
//    alignSelf: 'flex-top',
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
//    fontSize: 16,
//    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginStart: 90,
  },
  quantity: {
//    fontSize: 10,
//    fontWeight: '500',
    alignSelf: 'flex-start',
    marginStart: 90,
//    marginTop: 20,
  },
});

function OrderCard({
    navigation, orderId, date, items, itemsList,
}) {
  const [names, setNames] = useState("");
  const [itemList, setItemList] = useState(itemsList.get(new Date(items[0]).toString()));
  const onPressCard = () => {
    const dateObj = new Date(items[0]);
    const time = dateObj.toLocaleTimeString('en-US');
    date =  dateObj.toDateString();
    console.log("Items list in card: " + itemsList.get(dateObj.toString()));
    navigation.navigate('OrderDetails', {
        orderId, date, time, items, itemsList,
    });
  };
//
  useEffect(() => {
    setItemList(itemsList.get(new Date(items[0]).toString()));
  }, [items]);

//  const onPressHeart = () => {
//    const newFav = !favorite;
//    setFavorite(newFav);
//  };

//  const imageurl = { uri: image };
//        <Image style={styles.image} source={missingImage} />
    const produceNames = [];
    const constItemsList = "Apple, Bokchoy, Strawberry, ...";
//        setItemList("");
//    const checkInItems = (items, check) => {
//        for(var i = 0; i < items[1].length; i++){
//
//        }
//    };
//    const getProduceNames = () => {
//        base('Produce').select({}).eachPage((records, fetchNextPage) => {
//          records.forEach((record) => {
//            const produce = record;


//      console.log("itemsslit" + itemsList);
//    };


  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View style={styles.cardContainer}>
        <View style={styles.image} />
        <Text style={styles.name}>Order ID #{orderId}</Text>
        <View style={styles.bottom}>
          <Text style={styles.date}>
            Delivered on {new Date(items[0]).toDateString()}
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
  date: PropTypes.instanceOf(Date).isRequired,
  items: PropTypes.arrayOf(PropTypes.Object).isRequired,
  itemsList: PropTypes.object.isRequired,
};

export default OrderCard;
