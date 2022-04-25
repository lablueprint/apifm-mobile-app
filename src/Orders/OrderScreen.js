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
  const [itemsList, setItemsList] = useState(new Map());


  const getOrders = () => {
    var list = [];
    const condenseOrders = new Map();
    var itemsListVar = new Map();
    // loop through all records with a certain user
    // aggregate the records into a list
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
                console.log('Retrieved!', prodRecord.fields.Name);
                const currDate = (new Date(order.fields['delivery date (temp)'])).toString();
                if(!itemsListVar.has(currDate)) {
                    itemsListVar.set(currDate, prodRecord.fields.Name);
                }
                else if(itemsListVar.get(currDate).length < 25) {
                    itemsListVar.set(currDate,itemsListVar.get(currDate) + ", " +  prodRecord.fields.Name);
                } else {
                    itemsListVar = itemsListVar.set(currDate, itemsListVar.get(currDate).substring(0, 22) + "...");
                }
                console.log("itemListVar: " + itemsListVar.get(currDate));
                setItemsList(itemsListVar);
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
//          console.log("Setting " + currDate + " to " + condenseOrders.get(currDate).push(order.fields));
          condenseOrders.get(currDate).push(order.fields);
        }
      });
      console.log("Setting orderList");
      setOrderList(list);

      setOrderMap(new Map([...condenseOrders].sort((a, b) => new Date(a[0]) - new Date(b[0]))));
      console.log("condenseOrders: " + condenseOrders);
      console.log("list: " + list);
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
  };
    const getItemList = (items) => {
            var itemsList = "";
            for(var i = 0; i < items[1].length; i++){
                console.log("prod item in car:" + i + " " + items[1][i].produceItem);
//                itemsList += items[1][i].produceItem.fields.Name;
            }
            return itemsList;
    };
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
//    console.log("ORDERMAP: " + orderMap[0]);
//    orderMap.forEach((e, items) => console.log("elem" + e[0] + "date" + items));
  var i = 0;

  const OrderCards = (Array.from(orderMap)).map((items, orderDate, index) => (
    <OrderCard
      style={styles.orderCard}
//      key={1}
      navigation={navigation}
      orderId={(i++).toString()}
      date={orderDate}
      items={items}
      itemsList={itemsList}
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
        <Text style={styles.bodyText}> September Orders </Text>
        <View style={styles.orderCardsContainer}>
          { OrderCards }
        </View>
      </View>
    </ScrollView>
  );
}

OrderScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
