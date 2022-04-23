import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import {
  Title, Text, Button, Provider, Portal, Modal,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
// for Calendar icon import Feather from 'react-native-vector-icons/Feather';
import ProduceGrid from './ProduceGrid';
import FilterPopup from './FilterPopup';

// constant user id to test for all features
const userId = 'rec8yzLkLY6VrCKOX';

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
  const [unsortedProduce, setUnsortedProduce] = useState([]);
  const [produceList, setProduceList] = useState([]);

  const [filterVisibility, setFilterVisibility] = useState(false);

  const getProduce = async () => {
    let favorites = [];
    await base('Users').find(userId, (err, record) => {
      if (err) {
        console.error(err);
        return;
      }
      favorites = record.fields.favorites;
    });
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
        if (favorites.includes(produce.id)) {
          produce.fields.Favorited = true;
        } else {
          produce.fields.Favorited = false;
        }
        list.push(produce.fields);
      });
      fetchNextPage();
    });
    setAllProduce(list);
    setUnsortedProduce(list);
    setProduceList(list);
  };

  useEffect(() => {
    getProduce();
  }, []);

  const [aZSort, setAZSort] = useState(false);
  const [zASort, setZASort] = useState(false);
  const [lowHighSort, setLowHighSort] = useState(false);
  const [highLowSort, setHighLowSort] = useState(false);

  const sortProduce = (listToSort) => {
    if (aZSort) {
      listToSort.sort((x, y) => {
        if (x.Name > y.Name) {
          return 1;
        }
        return -1;
      });
    } else if (zASort) {
      listToSort.sort((x, y) => {
        if (x.Name < y.Name) {
          return 1;
        }
        return -1;
      });
    } else if (lowHighSort) {
      listToSort.sort((x, y) => {
        if (Number(x.Price) > Number(y.Price)) {
          return 1;
        }
        return -1;
      });
    } else if (highLowSort) {
      listToSort.sort((x, y) => {
        if (Number(x.Price) < Number(y.Price)) {
          return 1;
        }
        return -1;
      });
    }
    return listToSort;
  };

  const [seasonalFilter, setSeasonalFilter] = useState(false);
  const [vegetablesFilter, setVegetablesFilter] = useState(false);
  const [fruitsFilter, setFruitsFilter] = useState(false);
  const [favoritesFilter, setFavoritesFilter] = useState(false);

  const filterProduce = (listToFilter) => {
    let filteredList = [];
    if (seasonalFilter) {
      filteredList = filteredList.concat(listToFilter.filter((item) => item['Type Tags'] === 'Seasonal'));
    }
    if (vegetablesFilter) {
      filteredList = filteredList.concat(listToFilter.filter((item) => item['Type Tags'] === 'Vegetables'));
    }
    if (fruitsFilter) {
      filteredList = filteredList.concat(listToFilter.filter((item) => item['Type Tags'] === 'Fruits'));
    }
    if (filteredList.length) {
      if (favoritesFilter) {
        filteredList = filteredList.filter((item) => item.Favorited);
      }
      return filteredList;
    }
    return listToFilter;
  };

  const filterFavorites = () => {
    const showFavorites = !favoritesFilter;
    setFavoritesFilter(showFavorites);
    if (showFavorites) {
      const filteredList = allProduce.filter((item) => item.Favorited);
      setUnsortedProduce(filteredList);
      setProduceList(filteredList);
    } else {
      setProduceList(sortProduce(filterProduce(allProduce)));
      setUnsortedProduce(filterProduce(allProduce));
    }
  };

  useEffect(() => {
    setProduceList(sortProduce(filterProduce(unsortedProduce)));
  }, [aZSort, zASort, lowHighSort, highLowSort]);

  useEffect(() => {
    setProduceList(sortProduce(filterProduce(allProduce)));
  }, [seasonalFilter, vegetablesFilter, fruitsFilter]);

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
        </View>
        <View>
          <View>
            <TouchableOpacity>
              <FontIcon name={favoritesFilter ? 'heart' : 'heart-o'} onPress={filterFavorites} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcon onPress={() => { setFilterVisibility(true); }} name="settings-input-composite" size={20} />
            </TouchableOpacity>

          </View>
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
                  setVisibility={setFilterVisibility}
                  aZ={aZSort}
                  setAZ={setAZSort}
                  zA={zASort}
                  setZA={setZASort}
                  lowHigh={lowHighSort}
                  setLowHigh={setLowHighSort}
                  highLow={highLowSort}
                  setHighLow={setHighLowSort}
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
          <ProduceGrid navigation={navigation} userId={userId} produceList={produceList} />
        </View>
      </ScrollView>
    </Provider>

  );
}

MarketplaceScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
