import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import ProduceCard from './ProduceCard';

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
    marginTop: '40%',
    alignItems: 'center',
  },
  titleText: {
    marginBottom: 10,
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  button: {
    width: '30%',
    marginTop: 5,
    backgroundColor: '#0492c2',
  },
  buttonContainer: {
    marginTop: 5,
    marginRight: 5,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  produceCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  produceCard: {
    padding: 15,
  },
});

export default function MarketplaceScreen({ navigation }) {
  const [produceList, setProduceList] = useState([]);

  const getProduce = () => {
    const list = [];
    base('Produce').select({}).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const produce = record;

        if (!('Name' in record.fields)) {
          produce.fields.Name = '';
        }
        if (!('Image' in record.fields)) {
          produce.fields.Image = [{ url: 'test' }];
        }
        if (!('Quantity' in record.fields)) {
          produce.fields.Quantity = 1;
        }
        if (!('Unit' in record.fields)) {
          produce.fields.Unit = 'Uknown';
        }
        if (!('Seller' in record.fields)) {
          produce.fields.Seller = 'Unknown';
        }
        if (!('Minimum Quantity' in record.fields)) {
          produce.fields['Minimum Quantity'] = 1;
        }
        if (!('Price' in record.fields)) {
          produce.fields.Price = 'Unknown';
        }
        if (!('Type Tags' in record.fields)) {
          produce.fields['Type Tags'] = 'Unknown';
        }
        produce.fields.Favorited = 0;
        list.push(produce.fields);
      });
      setProduceList(list);
      fetchNextPage();
    });
  };

  const produceCards = produceList.map((produce) => (
    <ProduceCard
      style={styles.produceCard}
      key={produce.Name}
      navigation={navigation}
      favorited={produce.Favorited}
      image={produce.Image[0].url}
      name={produce.Name}
      price={produce.Price}
      unit={produce.Unit}
    />
  ));

  useEffect(() => {
    getProduce();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          icon="account-circle"
          style={styles.button}
          color="white" // Text + icon colour
          onPress={() => navigation.navigate('Profile')}
        >
          Profile
        </Button>
        <Button
          mode="outlined"
          icon="cart"
          style={styles.button}
          color="white"
          onPress={() => navigation.navigate('Cart')}
        >
          Cart
        </Button>
      </View>
      <View style={styles.centeredContainer}>
        <Title style={styles.titleText}> MarketplaceScreen :) </Title>
        <Text style={styles.bodyText}> This is the Marketplace Home. Buy food from me! </Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Contact')}
        >
          {/* TODO: CHANGE THIS BACK TO SIGN OUT navigates to sign in */}
          Contact Screen
        </Button>
      </View>
      <View style={styles.produceCardsContainer}>
        { produceCards }
      </View>
    </ScrollView>
  );
}

MarketplaceScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
