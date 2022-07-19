import React, { useEffect, useState } from 'react';
import {
  Image, ImageBackground, View, StyleSheet, ScrollView, Alert, TouchableOpacity,
} from 'react-native';
import {
  Text, Provider, Portal, Modal,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProduceGrid from './ProduceGrid';
import CalendarPopup from './CalendarPopup';
import FilterPopup from './FilterPopup';
import store from '../redux/store';

const Airtable = require('airtable');

const tabonmarketplace = require('../assets/tabonmarketplace.png');
const tabonfavorites = require('../assets/tabonfavorites.png');
const taboffmarketplace = require('../assets/taboffmarketplace.png');
const tabofffavorites = require('../assets/tabofffavorites.png');

const sadDurianBG = require('../assets/saddurianbg.png');
const exclamation = require('../assets/exclamation.png');
const sadDurian = require('../assets/saddurian.png');
const cart = require('../assets/cart.png');
const filterIcon = require('../assets/filtericon.png');

// constant user id to test for all features
const userId = 'rec8yzLkLY6VrCKOX';

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    marginTop: 10,
    marginLeft: 18,
    backgroundColor: '#FF5353',
  },
  container: {
    backgroundColor: '#FFFFFA',
    height: '100%',
    width: '100%',
  },
  topContainer: {
    backgroundColor: '#144611',
    paddingTop: 10,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingBottom: 20,
  },
  welcomeContainer: {
    width: 305,
    height: 60,
    left: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 24,
    color: '#FFFFFA',
  },
  menuIcon: {
    position: 'absolute',
    marginTop: 9,
    marginLeft: 28,
  },
  filterIcon: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 15,
    marginLeft: 4,
  },
  calendarIcon: {
    color: '#FFFFFF',
    marginTop: 10,
    marginRight: 6,

  },
  calendarPopup: {
    width: 360,
    height: 335,
    alignSelf: 'center',
  },
  errorBackground: {
    width: 290,
    height: 54,
  },
  calendarErrorMessage: {
    position: 'absolute',
    borderRadius: 10,
    width: 300,
    height: 50,
    backgroundColor: '#FF5353',
    alignSelf: 'flex-end',
    top: '5%',
    right: '3.5%',
  },
  calendarErrorFlag: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: '-10%',
    right: '12.5%',
    backgroundColor: '#FF5353',
    transform: [{ rotate: '45deg' }],
  },
  calendarErrorText: {
    fontFamily: 'JosefinSans-Medium',
    fontSize: 13,
    color: '#FCF7F0',
    position: 'absolute',
    left: '14%',
    width: '85%',
  },
  exclamation: {
    left: '5%',
    position: 'absolute',
  },
  alertContainer: {
    width: 360,
    height: 335,
    backgroundColor: '#FFFFFA',
    alignSelf: 'center',
    borderRadius: 20,
  },
  alertTitle: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 18,
    color: '#34221D',
    width: '75%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  alertSubtitle: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    color: '#5D5D5D',
    width: '75%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
  filterPopup: {
    width: 330,
    height: 470,
    alignSelf: 'center',
  },
  sameLineContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  marketplaceTabImage: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  marketplaceTab: {
    width: '50%',
    height: 80,
  },
  marketPlaceTextOpen: {
    fontFamily: 'JosefinSans-SemiBold',
    marginTop: '17%',
    alignSelf: 'center',
    color: '#144611',
    fontSize: 15,
  },
  marketPlaceTextClosed: {
    fontFamily: 'JosefinSans-SemiBold',
    marginTop: '17%',
    alignSelf: 'center',
    color: '#ABBD85',
    fontSize: 15,
  },
  closedMartketContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closedMarketImage: {
    marginTop: '15%',
    width: 124,
    height: 156,
  },
  cartButtonCircle: {
    position: 'absolute',
    bottom: 60,
    right: '5%',
    backgroundColor: '#FF9F00',
    borderRadius: 100 / 2,
    width: 80,
    height: 80,
    alignItems: 'center',
  },
  elevation: {
    elevation: 3,
    shadowColor: '#34221D',
  },
  cartButtonImage: {
    marginTop: 18,
    width: 42,
    height: 42,
  },
});

export default function MarketplaceScreen({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  // const currentUser = JSON.parse(user._W);
  // temporary for approved users, will be replaced by 'redux' branch merge
  const currentUser = {
    approved: true,
  };
  if (!currentUser) {
    navigation.navigate('Login');
  }

  const today = new Date();
  const tempToday = new Date();
  const thisFriday = new Date(tempToday.setDate((tempToday.getDate() - tempToday.getDay() + 5)));
  const displayFriday = `${String(thisFriday.getMonth() + 1).padStart(2, '0')}/${String(thisFriday.getDate()).padStart(2, '0')}`;
  const thisTuesday = new Date(tempToday.setDate((tempToday.getDate() - tempToday.getDay() + 2)));
  const displayTuesday = `${String(thisTuesday.getMonth() + 1).padStart(2, '0')}/${String(thisTuesday.getDate()).padStart(2, '0')}`;
  const nextMonday = new Date(tempToday.setDate((tempToday.getDate() - tempToday.getDay() + 8)));
  const displayMonday = `${String(nextMonday.getMonth() + 1).padStart(2, '0')}/${String(nextMonday.getDate()).padStart(2, '0')}`;

  const closedMarket = ((today.getDay() === 5 && today.getHours() >= 15)
  || today.getDay() === 6 || today.getDay() === 0
  || (today.getDay() === 1 && today.getHours() <= 14));
  const restrictedMarket = ((today.getDay() === 2 && today.getHours >= 17)
  || today.getDay() === 3
  || (today.getDay() === 4 && today.getHours <= 15));

  const [allProduce, setAllProduce] = useState([]);
  const [unsortedProduce, setUnsortedProduce] = useState([]);
  const [produceList, setProduceList] = useState([]);

  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [favoritesFilter, setFavoritesFilter] = useState(false);

  const [unapprovedAlert, setUnapprovedAlert] = useState(false);
  const [mondayDelivery, setMondayDelivery] = useState(false);
  const [fridayDelivery, setFridayDelivery] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [wednesdayAlert, setWednesdayAlert] = useState(false);

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

  const showProduce = () => {
    if (!currentUser.approved
      || closedMarket || restrictedMarket
      || (!mondayDelivery && !fridayDelivery)) {
      return false;
    }
    return true;
  };

  const getProduce = async () => {
    let favorites = [];
    let mondayState = false;
    if (!currentUser.approved) {
      setUnapprovedAlert(true);
    }
    if (restrictedMarket) {
      mondayState = true;
      setMondayDelivery(true);
      setWednesdayAlert(true);
    }
    const fridayState = false;
    await base('Users').find(userId, (err, record) => {
      if (err) {
        Alert.alert(err.error, err.message);
        return;
      }
      if (typeof record.fields.favorites !== 'undefined') {
        favorites = record.fields.favorites;
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
          produce.fields['Type Tags'] = [];
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

  const filterProduce = (listToFilter, favorites) => {
    let filteredList = [];
    if (seasonalFilter) {
      filteredList = filteredList.concat(listToFilter.filter((item) => item['Type Tags'].includes('Seasonal')));
    }
    if (vegetablesFilter) {
      filteredList = filteredList.concat(listToFilter.filter((item) => item['Type Tags'].includes('Vegetables')));
    }
    if (fruitsFilter) {
      filteredList = filteredList.concat(listToFilter.filter((item) => item['Type Tags'].includes('Fruits')));
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
    if (!mondayDelivery && !fridayDelivery && !closedMarket) {
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
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => { setFilterVisibility(true); }}>
            <Icon
              size={26}
              name="menu"
              color="#FFFFFF"
              style={styles.menuIcon}
              onPress={() => { navigation.toggleDrawer(); }}
            />
          </TouchableOpacity>
          <View style={styles.topBarContainer}>

            <TouchableOpacity onPress={() => { setCalendarVisibility(true); }}>
              <FeatherIcon style={styles.calendarIcon} name="calendar" size={24} />
            </TouchableOpacity>
            {currentUser.approved
            && !mondayDelivery && !fridayDelivery && !closedMarket && !restrictedMarket
              && <View style={styles.circle} />}

            <TouchableOpacity onPress={() => { setFilterVisibility(true); }}>
              <Image
                style={styles.filterIcon}
                source={filterIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Hello
              {' '}
              {currentUser.firstName}
              {' '}
              {currentUser.lastName}
              ,
            </Text>
            <Text style={styles.welcomeText}>Order your produce here!</Text>
          </View>

          <View style={styles.sameLineContainer}>
            <TouchableOpacity
              style={styles.marketplaceTab}
              activeOpacity={1}
              onPress={() => {
                if (favoritesFilter) {
                  filterFavorites();
                }
              }}
            >
              <ImageBackground
                style={styles.marketplaceTabImage}
                source={favoritesFilter ? taboffmarketplace : tabonmarketplace}
              >
                <Text style={favoritesFilter
                  ? styles.marketPlaceTextClosed : styles.marketPlaceTextOpen}
                >
                  MARKETPLACE
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.marketplaceTab}
              activeOpacity={1}
              onPress={() => {
                if (!favoritesFilter) {
                  filterFavorites();
                }
              }}
            >
              <ImageBackground
                style={styles.marketplaceTabImage}
                source={favoritesFilter ? tabonfavorites : tabofffavorites}
              >
                <Text style={favoritesFilter
                  ? styles.marketPlaceTextOpen : styles.marketPlaceTextClosed}
                >
                  FAVORITES
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        </View>
        <View>
          <Portal>
            <Modal
              visible={calendarVisibility && !closedMarket && !restrictedMarket}
              onDismiss={() => {
                setCalendarVisibility(true);
              }}
              contentContainerStyle={styles.calendarPopup}
            >
              <CalendarPopup
                setVisibility={setCalendarVisibility}
                mondayDelivery={mondayDelivery}
                setMondayDelivery={setMondayDelivery}
                fridayDelivery={fridayDelivery}
                setFridayDelivery={setFridayDelivery}
                setShowAlert={setShowAlert}
                displayMonday={displayMonday}
                displayFriday={displayFriday}
              />
            </Modal>
          </Portal>
        </View>
        <View>
          <Portal>
            <Modal
              visible={filterVisibility && !closedMarket}
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
          <Portal>
            <Modal
              visible={showAlert && currentUser.approved}
              contentContainerStyle={styles.calendarErrorMessage}
              onDismiss={() => {
                setShowAlert(false);
              }}
              theme={{
                colors: {
                  backdrop: 'transparent',
                },
              }}
            >
              <View style={styles.calendarErrorFlag} />
              <Image
                source={exclamation}
                style={styles.exclamation}
              />
              <Text style={styles.calendarErrorText}>
                Looks like you don&apos;t have a delivery date
                yet. Click here to select a delivery date!
              </Text>
            </Modal>
          </Portal>
        </View>
        <View>
          <Portal>
            <Modal
              visible={wednesdayAlert}
              contentContainerStyle={styles.alertContainer}
              onDismiss={() => {
                setWednesdayAlert(false);
              }}
            >
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 15 }} onPress={() => { setWednesdayAlert(false); }}>
                <Icon
                  name="close"
                  size={22}
                  color="#000"
                  style={{
                    marginBottom: 20,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.alertTitle}>
                Sorry! We&apos;re currently updating the produce list.
              </Text>
              <Text style={styles.alertSubtitle}>
                You can currently preview produce for Monday deliveries,
                but you cannot place an order.
                Please come back on Thursday to place an order!
              </Text>
              <Image
                source={sadDurianBG}
                style={{
                  width: 150, height: 150, alignSelf: 'center',
                }}
              />
            </Modal>
          </Portal>
        </View>
        <View>
          <Portal>
            <Modal
              visible={unapprovedAlert}
              contentContainerStyle={styles.alertContainer}
              onDismiss={() => {
                setUnapprovedAlert(false);
              }}
              theme={{
                colors: {
                  backdrop: 'transparent',
                },
              }}
            >
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 15 }} onPress={() => { setUnapprovedAlert(false); }}>
                <Icon
                  name="close"
                  size={22}
                  color="#000"
                  style={{
                    marginBottom: 20,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.alertTitle}>
                Sorry! Your account has not been approved yet.
              </Text>
              <Text style={styles.alertSubtitle}>
                You won&apos;t be able to place any orders yet,
                but feel free to browse the marketplace
                while our staff reveiws your information.
              </Text>
              <Image
                source={sadDurianBG}
                style={{
                  width: 150, height: 150, alignSelf: 'center', marginTop: 20,
                }}
              />
            </Modal>
          </Portal>
        </View>

        {((mondayDelivery || fridayDelivery) && !closedMarket)
          && (
            <TouchableOpacity onPress={() => {
              if (!closedMarket && !restrictedMarket) {
                const newCalVis = !calendarVisibility;
                setCalendarVisibility(newCalVis);
              }
            }}
            >
              <View style={styles.sameLineContainer}>
                <Text style={{ marginLeft: 15, fontFamily: 'JosefinSans-SemiBold', paddingBottom: 5 }}>
                  Delivery:
                  {' '}
                  {(mondayDelivery) ? `Mon. ${displayMonday}` : `Fri. ${displayFriday}`}
                  {'. '}
                </Text>
                <Text style={{ fontFamily: 'JosefinSans-SemiBold', color: '#FF0000' }}>
                  Order by
                  {' '}
                  {(mondayDelivery) ? `${displayFriday} @ 3 PM!` : `${displayTuesday} @ 5 PM!`}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        <ScrollView>
          {closedMarket
            ? (
              <View style={styles.closedMartketContainer}>
                <Image source={sadDurian} style={styles.closedMarketImage} />
                <Text style={{ fontFamily: 'JosefinSans-SemiBold', fontSize: 18, padding: 10 }}>Aw that stinks!</Text>
                <Text style={{
                  fontFamily: 'JosefinSans-Regular',
                  width: 250,
                  height: 50,
                  textAlign: 'center',
                  color: '#5D5D5D',
                }}
                >
                  The Marketplace is closed at the moment.
                  Please come back when the produce list gets updated on Monday.
                </Text>
              </View>
            )
            : (
              <ProduceGrid
                navigation={navigation}
                userId={userId}
                showProduce={showProduce}
                produceList={produceList}
                favorites={favoritesFilter}
                mondayDelivery={mondayDelivery}
              />
            )}
        </ScrollView>
        <TouchableOpacity onPress={() => { navigation.navigate('Cart'); }}>
          <View style={[styles.cartButtonCircle, styles.elevation]}>
            <Image source={cart} style={styles.cartButtonImage} />
          </View>
        </TouchableOpacity>

      </View>
    </Provider>

  );
}

MarketplaceScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    DrawerActions: PropTypes.shape({
      openDrawer: PropTypes.func,
    }),
    toggleDrawer: PropTypes.func,
  }).isRequired,
};
