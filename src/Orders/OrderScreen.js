import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
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
  },
  centeredContainer: {
    marginTop: '10%',
  },
  titleText: {
    marginBottom: 20,
    fontSize: 30,
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
  const [orderMap, setOrderMap] = useState(new Map());
  const [orderList, setOrderList] = useState([]);
  const [itemsList, setItemsList] = useState(new Map());
  const [cardList, setCardList] = useState([]);
  const [flag, setFlag] = useState(false);

  const getOrders = () => {
    var list = [];
    const condenseOrders = new Map();
    var itemsListVar = new Map();

    base('Orders').select({ filterByFormula: "({user_id}='helen@gmail.com')" }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const order = record;
        order.fields.orderId = order.id;
        if (!('delivery date (temp)' in record.fields)) {
          order.fields['delivery date (temp)'] = 'September 5, 2022';
        }
        if (('produce_id' in record.fields)) {
            base('Produce').find(record.fields.produce_id, ((err, prodRecord) => {
                if (err) { console.error(err); return; }
                order.fields.produceItem = prodRecord;
                const currDate = (new Date(order.fields['delivery date (temp)'])).toString();
                if(!itemsListVar.has(currDate)) {
                    itemsListVar.set(currDate, prodRecord.fields.Name);
                }
                else if(itemsListVar.get(currDate).length < 25) {
                    itemsListVar.set(currDate,itemsListVar.get(currDate) + ", " +  prodRecord.fields.Name);
                } else {
                    itemsListVar = itemsListVar.set(currDate, itemsListVar.get(currDate).substring(0, 22) + "...");
                }
                setItemsList(itemsListVar);
                setFlag(flag => !flag);
            }));
        } else {
            console.log("ERR: misssing produce id in orders record");
        }
        if (!('Quantity' in record.fields)) {
            order.fields.Quantity = 1;
        }
        list.push(order.fields);
        const currDate = new Date(order.fields['delivery date (temp)']).toString();
        if(!condenseOrders.has(currDate)){
          condenseOrders.set(currDate, [order.fields]);
        } else {
          condenseOrders.get(currDate).push(order.fields);
        }
      });
      setOrderList(list);
      setOrderMap(new Map([...condenseOrders].sort((a, b) => new Date(a[0]) - new Date(b[0]))));
      fetchNextPage();
    }, (err) => {
        if (err) {
          Alert.alert(err.message);
        }
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
      var i = 0;
        const OrderCards = (Array.from(orderMap)).map((items, orderDate, index) => (
          <OrderCard
            style={styles.orderCard}
            navigation={navigation}
            orderId={(i++).toString()}
            key={(i++).toString()}
            date={orderDate}
            items={items}
            itemsList={itemsList}
          />
        ));
     setCardList(OrderCards);
  }, [itemsList, flag])

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
