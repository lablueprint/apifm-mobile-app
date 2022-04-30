import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView, Alert, TouchableOpacity,
} from 'react-native';
import {
  Text, Provider, Portal, Modal,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
// replace this icon with the one on figma
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ProduceGrid from './ProduceGrid';
import CalendarPopup from './CalendarPopup';
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
  marketplaceTabOpen: {
    color: '#144611',
    backgroundColor: '#FFFFFA',
  },
  marketplaceTabClosed: {
    color: '#ABBD85',
    backgroundColor: '#144611',
  },
});

export default function MarketplaceScreen({ navigation }) {
  const [allProduce, setAllProduce] = useState([]);
  const [unsortedProduce, setUnsortedProduce] = useState([]);
  const [produceList, setProduceList] = useState([]);

  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [favoritesFilter, setFavoritesFilter] = useState(false);

  const [mondayDelivery, setMondayDelivery] = useState(false);
  const [fridayDelivery, setFridayDelivery] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const deliveryProduce = (listToDeliver, mondayState, fridayState) => {
    let deliveryList = listToDeliver;
    if (mondayState) {
      deliveryList = listToDeliver.filter((produce) => (produce['Delivery Date'] === 'Monday' || produce['Delivery Date'] === 'All'));
    }
    if (fridayState) {
      deliveryList = listToDeliver.filter((produce) => (produce['Delivery Date'] === 'Friday' || produce['Delivery Date'] === 'All'));
    }
    return deliveryList;
  };

  const selectDayAlert = () => {
    if (!mondayDelivery && !fridayDelivery) {
      return true;
    }
    return false;
  };

  const getProduce = async () => {
    let favorites = [];
    let mondayState = false;
    let fridayState = false;
    await base('Users').find(userId, (err, record) => {
      if (err) {
        Alert.alert(err.error, err.message);
        return;
      }
      favorites = record.fields.favorites;
      if (record.fields['Delivery Date'] === 'Monday') {
        mondayState = true;
        setMondayDelivery(true);
      }
      if (record.fields['Delivery Date'] === 'Friday') {
        fridayState = true;
        setFridayDelivery(true);
      }
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
        if (!('Maximum Quantity' in record.fields)) {
          produce.fields['Maximum Quantity'] = 1;
        }
        if (!('Minimum Quantity' in record.fields)) {
          produce.fields['Minimum Quantity'] = 1;
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
          produce.fields['Type Tags'] = '';
          // this needs to be accounted for since multiple tags should be an array
        }
        if (!('Delivery Date' in record.fields)) {
          produce.fields['Delivery Date'] = '';
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
    setUnsortedProduce(deliveryProduce(list, mondayState, fridayState));
    setProduceList(deliveryProduce(list, mondayState, fridayState));
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

  // this function likely needs to account for multiple tags
  const filterProduce = (listToFilter, favorites) => {
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
      if (favorites) {
        filteredList = filteredList.filter((item) => item.Favorited);
      }
      return filteredList;
    }
    if (filteredList.length === 0 && favorites) {
      filteredList = listToFilter.filter((item) => item.Favorited);
      return filteredList;
    }
    return listToFilter;
  };

  const filterFavorites = () => {
    const showFavorites = !favoritesFilter;
    setFavoritesFilter(showFavorites);
    base('Users').find(userId, (err, record) => {
      if (err) {
        Alert.alert(err.error, err.message);
        return;
      }
      let { favorites } = record.fields;
      if (typeof favorites === 'undefined') {
        favorites = [];
      }
      const newAllProduce = allProduce.map((produce) => {
        if (favorites.includes(produce.produceId)) {
          return { ...produce, Favorited: true };
        }
        return { ...produce, Favorited: false };
      });

      setAllProduce(newAllProduce);
      if (showFavorites) {
        const filteredList = newAllProduce.filter((item) => item.Favorited);
        setUnsortedProduce(filterProduce(
          deliveryProduce(filteredList, mondayDelivery, fridayDelivery),
          true,
        ));
        setProduceList(sortProduce(filterProduce(
          deliveryProduce(filteredList, mondayDelivery, fridayDelivery),
          true,
        )));
      } else {
        setUnsortedProduce(filterProduce(
          deliveryProduce(newAllProduce, mondayDelivery, fridayDelivery),
          false,
        ));
        setProduceList(sortProduce(filterProduce(
          deliveryProduce(newAllProduce, mondayDelivery, fridayDelivery),
          false,
        )));
      }
    });
  };

  useEffect(() => {
    setUnsortedProduce(filterProduce(
      deliveryProduce(allProduce, mondayDelivery, fridayDelivery),
      favoritesFilter,
    ));
    setProduceList(sortProduce(filterProduce(
      deliveryProduce(allProduce, mondayDelivery, fridayDelivery),
      favoritesFilter,
    )));
    if (!mondayDelivery && !fridayDelivery) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [mondayDelivery, fridayDelivery, seasonalFilter, vegetablesFilter, fruitsFilter]);

  useEffect(() => {
    setProduceList(sortProduce(filterProduce(unsortedProduce, favoritesFilter)));
  }, [aZSort, zASort, lowHighSort, highLowSort]);

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <View>
          <View>
            <TouchableOpacity>
              <FeatherIcon onPress={() => { setCalendarVisibility(true); }} name="calendar" size={20} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcon onPress={() => { setFilterVisibility(true); }} name="settings-input-composite" size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={favoritesFilter ? styles.marketplaceTabClosed : styles.marketplaceTabOpen}
              activeOpacity={1}
              onPress={() => {
                if (favoritesFilter) {
                  filterFavorites();
                }
              }}
            >
              <Text>
                MARKETPLACE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={favoritesFilter ? styles.marketplaceTabOpen : styles.marketplaceTabClosed}
              activeOpacity={1}
              onPress={() => {
                if (!favoritesFilter) {
                  filterFavorites();
                }
              }}
            >
              <Text>
                FAVORITES
              </Text>
            </TouchableOpacity>

          </View>
          <View>
            <Portal>
              <Modal
                visible={calendarVisibility}
                onDismiss={() => {
                  setCalendarVisibility(false);
                }}
                contentContainerStyle={styles.filterPopup}
              >
                <CalendarPopup
                  userId={userId}
                  setVisibility={setCalendarVisibility}
                  mondayDelivery={mondayDelivery}
                  setMondayDelivery={setMondayDelivery}
                  fridayDelivery={fridayDelivery}
                  setFridayDelivery={setFridayDelivery}
                  setShowAlert={setShowAlert}
                />
              </Modal>
            </Portal>
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
          <View>
            <Modal
              visible={showAlert}
              contentContainerStyle={styles.filterPopup}
            >
              <View>
                <Text>
                  Looks like you don&apost have a delivery date
                  yet. Click here to select a delivery date!
                </Text>
              </View>
            </Modal>
          </View>
          <ProduceGrid
            navigation={navigation}
            userId={userId}
            showAlert={selectDayAlert}
            produceList={produceList}
          />
        </View>
      </ScrollView>
    </Provider>

  );
}

MarketplaceScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
