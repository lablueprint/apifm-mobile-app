/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import OrderCard from './OrdersCard';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  centeredContainer: {
    marginTop: '10%',
  },
  titleText: {
    marginBottom: 20,
    fontSize: 30,
    marginStart: 20,
    fontFamily: 'JosefinSans-SemiBold',
  },
  subtitleText: {
    marginBottom: 10,
    fontSize: 20,
    marginStart: 27,
    marginTop: 10,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#1D763C',
  },
  orderCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
});

export default function OrderScreen({ navigation }) {
  const { user: currentUser, refresh } = useSelector((state) => state.auth);
  const CONST_USER = currentUser.email;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [orderMap, setOrderMap] = useState(new Map());
  const [itemsList, setItemsList] = useState(new Map());
  const [images, setImages] = useState(new Map());

  const [cardList, setCardList] = useState([]);
  const [flag, setFlag] = useState(false);

  const getOrders = () => {
    let itemsListVar = new Map();
    let itemsListCount = new Map();
    let imagesVar = new Map();
    // This should be a map pointing from "month_year" to an array
    // of order cards for all the orders in that month
    // Each order card should be a map pointing from month to the
    // dates of the orders in that month to the actual order cards
    const monthCondenseOrders = new Map();
    base('Orders').select({ filterByFormula: `({email}='${CONST_USER}')` }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const order = record;
        const currDateObj = new Date(order.fields['Est. Delivery Date'].substring(6, 10), Number(order.fields['Est. Delivery Date'].substring(0, 2)) - 1, order.fields['Est. Delivery Date'].substring(3, 5));
        const currDate = new Date(order.fields['Est. Delivery Date'].substring(6, 10), Number(order.fields['Est. Delivery Date'].substring(0, 2)) - 1, order.fields['Est. Delivery Date'].substring(3, 5)).toString();
        const currMonthYear = new Date(
          currDateObj.getFullYear(),
          currDateObj.getMonth(),
          1,
        ).toString();
        order.fields.orderId = order.id;

        if (!('Est. Delivery Date' in record.fields)) {
          return;
        }
        if (!('Quantity' in record.fields)) {
          return;
        }
        if (('produce_id' in record.fields)) {
          base('Produce').find(record.fields.produce_id, ((err, prodRecord) => {
            if (err) { Alert.alert(err); return; }
            order.fields.produceItem = prodRecord;
            if (!itemsListVar.has(currDate)) {
              itemsListVar.set(currDate, prodRecord.fields.Name);
              imagesVar = imagesVar.set(currDate, prodRecord.fields.Image[0].url);
            } else if (itemsListVar.get(currDate).indexOf(',') === -1) {
              itemsListVar.set(currDate, `${itemsListVar.get(currDate)}, ${prodRecord.fields.Name}`);
            } else {
              const ind = itemsListVar.get(currDate).indexOf('+');
              if (ind === -1) {
                itemsListVar = itemsListVar.set(currDate, `${itemsListVar.get(currDate)} + 1 more`);
                itemsListCount = itemsListCount.set(currDate, 1);
              } else {
                itemsListCount = itemsListCount.set(currDate, itemsListCount.get(currDate) + 1);
                let newStr = itemsListVar.get(currDate);
                newStr = newStr.substring(0, itemsListVar.get(currDate).indexOf('+') - 1);
                newStr += ` + ${itemsListCount.get(currDate)} more`;
                itemsListVar = itemsListVar.set(currDate, newStr);
              }
            }
            setItemsList(itemsListVar);
            setImages(imagesVar);
            setFlag((f) => !f);
          }));
        } else {
          Alert.alert('ERR: misssing produce id in orders record');
        }

        if (!monthCondenseOrders.has(currMonthYear)) {
          monthCondenseOrders.set(currMonthYear, new Map([[currDate, [order.fields]]]));
        } else if (!monthCondenseOrders.get(currMonthYear).has(currDate)) {
          monthCondenseOrders.get(currMonthYear).set(currDate, [order.fields]);
        } else {
          monthCondenseOrders.get(currMonthYear).get(currDate).push(order.fields);
        }
      });
      setOrderMap(new Map(
        [...monthCondenseOrders].sort((a, b) => new Date(a[0]) - new Date(b[0])),
      ));
      fetchNextPage();
    }, (err) => {
      if (err) {
        Alert.alert(err.message);
      }
    });
  };

  useEffect(() => {
    getOrders();
  }, [refresh]);

  // This useEffect is supposed to update the ordercards once all the produce
  // items are fully downloaded from the airtable api call
  useEffect(() => {
    let i = 0;
    const OrderCards = (Array.from(orderMap)).map((items) => (
      <>
        <Title style={styles.subtitleText}>
          {' '}
          {MONTHS[new Date(items[0]).getMonth()]}
          {' '}
          Orders
          {' '}
        </Title>
        <View style={styles.orderCardsContainer}>
          {
        (Array.from(new Map(
          [...items[1]].sort((a, b) => new Date(a[0]) - new Date(b[0])),
        ))).map((card) => (
          <OrderCard
            style={styles.orderCard}
            navigation={navigation}
            orderId={(i++).toString()}
            key={(i).toString()}
            items={card}
            itemsList={itemsList}
            images={images}
          />
        ))
        }
        </View>
      </>
    ));
    setCardList(OrderCards);
  }, [itemsList, flag]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centeredContainer}>
        <Title style={styles.titleText}> Past Orders </Title>
        <View style={styles.orderCardsContainer}>
          { cardList }
        </View>
      </View>
    </ScrollView>
  );
}

OrderScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
