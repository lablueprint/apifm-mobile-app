// SETUP
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Subheading, Button, Card,
} from 'react-native-paper';

// AIRTABLE SETUP
const Airtable = require('airtable');

const base = new Airtable({ apiKey: 'keyGj20G6MYOtAfqI' })
  .base('appp0PyZuRgpzJBn5');

// STYLES
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  titleText: {
    marginBottom: 10,
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '30%',
    marginTop: 10,
    backgroundColor: '#0492c2',
  },
  card: {
    width: '90%',
  },
});

export default function MarketplaceScreen() {
  const [card, setCard] = useState([]);

  useEffect(() => {
    base('APIFM Produce Cards').find('recuOS5skQ04lUxBk', (err, record) => {
      if (err) { console.error(err); return; }
      setCard(record);
    });
  });

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}> Marketplace :) </Title>
      <Text style={styles.bodyText}> This is the Marketplace. </Text>
      <Button
        mode="contained"
        style={styles.button}
      >
        BUTTON
      </Button>
      <Card style={styles.card}>
        <Card.Title title={card.fields.Title} subtitle={card.fields.Subtitle} />
        <Card.Cover source={{ uri: 'https://radio-images.npo.nl/%7Bformat%7D/45ed5691-8bc1-4018-9d67-242150cff944/954ab7c1-23a6-4d11-b30e-dc3abc3b37ec.jpg' }} />
        <Card.Actions>
          <Button>Add to Cart</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
