// SETUP
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Button, Card,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';

// AIRTABLE SETUP
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// STYLESHEETS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    marginTop: '20%',
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
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '42%',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 35,
    paddingBottom: 15,
  },
});

export default function MarketplaceScreen({ navigation }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    base('Produce').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 4,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      // This function (`page`) will get called for each page of records.

      records.forEach((record) => {
        alert(record.get('Name'));
        setCards(cards);
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, (err) => {
      if (err) { console.error(err); }
    });
  }, []);

  return (
    <View style={styles.container}>
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
        <View style={styles.cardContainer}>
          {/* look up - how to loop in HTML */}
          {cards.map((cards, index) => (
            <div key={index}>
              <h3>{cards.Name}</h3>
              <p>{cards.Quantity}</p>
            </div>
          ))}
          <Card style={styles.card}>
            <Card.Cover source={require('../assets/imgs/apples.jpg')} />
            <Card.Title title="Apples" subtitle="$2.99 each" />
          </Card>
          <Card style={styles.card}>
            <Card.Cover source={require('../assets/imgs/peanuts.jpg')} />
            <Card.Title title="Peanuts" subtitle="$0.99 / lb" />
          </Card>
          <Card style={styles.card}>
            <Card.Cover source={require('../assets/imgs/apples.jpg')} />
            <Card.Title title="Apples" subtitle="$2.99 each" />
          </Card>
          <Card style={styles.card}>
            <Card.Cover source={require('../assets/imgs/peanuts.jpg')} />
            <Card.Title title="Peanuts" subtitle="$0.99 / lb" />
          </Card>
        </View>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          SIGN OUT
        </Button>
      </View>
    </View>
  );
}

MarketplaceScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
