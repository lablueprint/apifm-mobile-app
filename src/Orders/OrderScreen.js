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
//    alignItems: 'left',
  },
  titleText: {
    marginBottom: 20,
    fontSize: 30,
//    textAlign: 'left',
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  button: {
    width: '30%',
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: '#0492c2',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 5,
    marginRight: 5,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  orderCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  orderCard: {
    padding: 15,
  },
});

export default function OrderScreen({ navigation }) {
  const [orderMap, setOrderMap] = useState(new Map());
  const [orderList, setOrderList] = useState([]);

  const getOrders = () => {
    var list = [];
    var condenseOrders = new Map();
    // loop through all records with a certain user
    // aggregate the records into a list
    base('Orders').select({ filterByFormula: "({user_id}='helen@gmail.com')" }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const order = record;
        console.log("Order");

        order.fields.orderId = order.id;
        console.log(order.id);
        if (!('delivery date (temp)' in record.fields)) {
          order.fields['delivery date (temp)'] = 'September 5, 2022';
        }
//        if (!('Image' in record.fields)) {
//          order.fields.Image = [{ url: '' }];
//        }
//        if (!('Quantity' in record.fields)) {
//          order.fields.Quantity = 1;
//        }
//        if (!('Unit' in record.fields)) {
//          order.fields.Unit = 'Uknown';
//        }
//        if (!('Seller' in record.fields)) {
//          order.fields.Seller = 'Unknown';
//        }
//        if (!('Price' in record.fields)) {
//          order.fields.Price = 'Unknown';
//        }
//        if (!('Type Tags' in record.fields)) {
//          order.fields['Type Tags'] = 'Unknown';
//        }
//        order.fields.Favorited = false;
        list.push(order.fields);
        const currDate = new Date(order.fields['delivery date (temp)']);
        console.log("currDate: " + currDate);
        console.log(order.fields['delivery date (temp)']);
        if(!condenseOrders.has(currDate)){
          console.log("true");
          condenseOrders.set(currDate, [order.fields]);
        } else {
          console.log("false");
          condenseOrders[currDate].push(order.fields);
        }
        console.log("order one:" + order.fields);
      });
      setOrderList(list);
      setOrderMap(condenseOrders);

//      var tempMap = orderMap;
//      if(!orderMap.has(currDate)){
//          tempMap.set(currDate, [rec]);
//      } else {
//          tempMap[currDate].push(rec);
//      }
//      console.log("tempmap: " + tempMap);
//      setOrderMap(tempMap);
      fetchNextPage();
    }, (err) => {
        if (err) {
          Alert.alert(err.message);
        }
    });
//    list.push(30);
//    console.log("list: " + list);
//    console.log("condense: " + condenseOrders);

//    setOrderMap(condenseOrders);
    console.log("oorderList:");
    console.log(orderList);
    console.log("orderMap:");
    console.log(orderMap);
  };
    console.log("orderList:");
    console.log(orderList);
    console.log("orderMap:");
    console.log(orderMap);
//    var condenseOrders = new Map();

//    orderList.forEach((rec, ind) => {
//        console.log("hello");
//        const currDate = new Date(rec['delivery date (temp)']);
//        console.log("currDate: " + currDate);
//        console.log("orig date: " + rec['delivery date (temp)']);
//        console.log(condenseOrders.has(currDate));
//        if(!condenseOrders.has(currDate)){
//            console.log("true");
//            condenseOrders.set(currDate, [rec]);
//        } else {
//            console.log(condenseOrders);
//            console.log("first: " + condenseOrders[currDate]);
//            console.log("second: " + condenseOrders[currDate].push(rec));
//            condenseOrders[currDate].push(rec);
//        }
//    });

//    condenseOrders = new Map([...condenseOrders].sort((a, b) => b[0] - a[0]));
////    setOrderMap(condenseOrders);
//    console.log("condenseOrders:");
//    console.log(condenseOrders);
    orderMap.forEach((e, items) => console.log("elem" + e[0] + "date" + items));
  const OrderCards = (Array.from(orderMap)).map((items, orderDate, index) => (
    <OrderCard
      style={styles.orderCard}
//      key={1}
      navigation={navigation}
      orderId={"1"}
      date={orderDate}
      items={items}
      address={items[0].user_id}
    />

  ));
//  console.log(OrderCards);

  useEffect(() => {
//    console.log(1);
    getOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centeredContainer}>
        <Title style={styles.titleText}> Past Orders </Title>
        <Text style={styles.bodyText}> February Orders </Text>
        <View style={styles.orderCardsContainer}>
          { OrderCards }
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Marketplace')}
        >
          Marketplace
        </Button>
      </View>
    </ScrollView>
  );
}

OrderScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
