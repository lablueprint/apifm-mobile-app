import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import {
  Title, Text, Button, Provider, Portal, Modal,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import ProduceGrid from './ProduceGrid';
import FilterPopup from './FilterPopup';

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
  filterPopup: {
    width: 330,
    height: 470,
    alignSelf: 'center',
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
});

export default function MarketplaceScreen({ navigation }) {
  const [allProduce, setAllProduce] = useState([]);
  const [produceList, setProduceList] = useState([]);

  const [subscriptions, setSubscriptions] = useState(false);

  const [filterVisibility, setFilterVisibility] = useState(false);

  const getProduce = async () => {
    const list = [];
    await base('Produce').select({}).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const produce = record;

        produce.fields.produceId = produce.id;

        if (!('Name' in record.fields)) {
          produce.fields.Name = '';
        }
        if (!('Image' in record.fields)) {
          produce.fields.Image = [{ url: '' }];
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
        if (!('Price' in record.fields)) {
          produce.fields.Price = 'Unknown';
        }
        if (!('Type Tags' in record.fields)) {
          produce.fields['Type Tags'] = 'Unknown';
        }
        produce.fields.Favorited = false;
        list.push(produce.fields);
      });
      setAllProduce(list);
      setProduceList(list);
      fetchNextPage();
    });
  };

  useEffect(() => {
    getProduce();
  }, []);

  const [seasonalFilter, setSeasonalFilter] = useState(false);
  const [vegetablesFilter, setVegetablesFilter] = useState(false);
  const [fruitsFilter, setFruitsFilter] = useState(false);

  const filterProduce = () => {
    let filteredList = [];
    if (seasonalFilter) {
      filteredList = filteredList.concat(allProduce.filter((item) => item['Type Tags'] === 'Seasonal'));
    }
    if (vegetablesFilter) {
      filteredList = filteredList.concat(allProduce.filter((item) => item['Type Tags'] === 'Vegetables'));
    }
    if (fruitsFilter) {
      filteredList = filteredList.concat(allProduce.filter((item) => item['Type Tags'] === 'Fruits'));
    }
    if (filteredList.length) {
      setProduceList(filteredList);
    } else {
      setProduceList(allProduce);
    }
  };

  useEffect(() => {
    filterProduce();
  }, [seasonalFilter, vegetablesFilter, fruitsFilter]);

  if (!subscriptions) {
    return (
      <Provider>
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
              onPress={() => navigation.navigate('SignIn')}
            >
              SIGN OUT
            </Button>
            <Button
              style={styles.button}
              onPress={() => { setSubscriptions(false); }}
            >
              MARKETPLACE
            </Button>
            <Button
              style={styles.button}
              onPress={() => { setSubscriptions(true); }}
            >
              SUBSCRIPTIONS
            </Button>
          </View>
          <View>
            <Button
              style={styles.button}
              onPress={() => { setFilterVisibility(true); }}
            >
              Sort and Filter
            </Button>
            <View>
              <Portal>
                <Modal
                  visible={filterVisibility}
                  onDismiss={() => {
                    setFilterVisibility(false);
                  }}
                  contentContainerStyle={styles.filterPopup}
                >
                  <FilterPopup
                    seasonal={seasonalFilter}
                    setSeasonal={setSeasonalFilter}
                    vegetables={vegetablesFilter}
                    setVegetables={setVegetablesFilter}
                    fruits={fruitsFilter}
                    setFruits={setFruitsFilter}
                  />
                </Modal>
              </Portal>
            </View>
            <ProduceGrid navigation={navigation} produceList={produceList} />
          </View>
        </ScrollView>
      </Provider>

    );
  }
}

MarketplaceScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
