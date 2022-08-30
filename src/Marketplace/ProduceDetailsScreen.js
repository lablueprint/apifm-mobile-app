import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, StyleSheet, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import {
  Button, Text, Provider, Portal, Modal,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from 'react-native-vector-icons/AntDesign';
import ArrowIcon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

const Airtable = require('airtable');
const missingImage = require('../assets/missingImage.png');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  arrowCircle: {
    position: 'absolute',
    borderRadius: 100 / 2,
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFA',
    top: '3%',
    left: '5%',
  },
  arrowIcon: {
    color: '#34221D',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 2,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  imageContainer: {
    position: 'absolute',
    alignSelf: 'center',
    height: '60%',
    width: '100%',
  },
  bottomContainer: {
    position: 'absolute',
    top: '57%',
    display: 'flex',
    flexDirection: 'column',
    height: '43%',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#FFFFFA',
  },
  tagsLine: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  tagText: {
    marginTop: 5,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'JosefinSans-Regular',
  },
  tagContainer: {
    backgroundColor: '#C1DDA9',
    borderRadius: 4,
    width: 70,
    height: 30,
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 8,
  },
  favoriteIcon: {
    alignSelf: 'flex-end',
    color: '#FF5353',
    marginEnd: 13,
    marginTop: 35,
  },
  icons: {
    color: '#1D763C',
    margin: 5,
  },
  textName: {
    fontSize: 28,
    color: '#34221D',
    alignSelf: 'flex-start',
    fontFamily: 'JosefinSans-Regular',
    marginStart: 18,
    marginTop: 20,
  },
  textSeller: {
    fontSize: 16,
    color: '#34221D',
    fontFamily: 'JosefinSans-Regular',
    marginStart: 20,
    marginTop: 5,
  },
  priceUnitLine: {
    display: 'flex',
    flexDirection: 'row',
  },
  textPrice: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#34221D',
    marginStart: 18,
    marginTop: 50,
  },
  textUnit: {
    fontSize: 16,
    color: '#34221D',
    marginStart: 5,
    marginTop: 65,
  },
  textInput: {
    fontSize: 32,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#1D763C',
    marginStart: 10,
    marginEnd: 10,
    borderColor: '#1D763C',
    borderWidth: 2,
    borderRadius: 5,
    height: '90%',
  },
  numberChange: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    marginEnd: 15,
    marginTop: 40,
  },
  sameLineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cartButton: {
    height: 50,
    width: 328,
    borderRadius: 20,
    backgroundColor: '#1D763C',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  cartText: {
    fontSize: 20,
    color: '#FFFFFA',
    fontFamily: 'JosefinSans-SemiBold',
  },
  addedPopUpContainer: {
    height: 232,
    width: 252,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    alignItems: 'center',
  },
  addedIcon: {
    color: '#9CC555',
    margin: 10,
  },
  addedText: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 24,
  },
});

function ProduceDetailsScreen({ navigation, route }) {
  const {
    userId, produceId, favorite, setFavorite,
    image, name, tags, price, unit, seller, maxQuantity, minQuantity,
    mondayDelivery, deliveryDate,
  } = route.params;

  const produceTags = tags.map((tag) => (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  ));

  const [favorited, setFavorited] = useState(favorite);

  const addToFavorites = async (user, produce, favcondition) => {
    await base('Users').find(user, (err, record) => {
      if (err) {
        Alert.alert(err.error, err.message);
        return;
      }
      let currentFavorites = record.fields.favorites;
      if (typeof currentFavorites === 'undefined') {
        currentFavorites = [];
      }
      if (favcondition) {
        currentFavorites.push(produce);
      } else {
        currentFavorites = currentFavorites.filter((item) => item !== produce);
      }
      base('Users').update([
        {
          id: user,
          fields: {
            favorites: currentFavorites,
          },
        },
      ]);
    });
  };

  const onPressHeart = () => {
    const newFav = !favorited;
    addToFavorites(userId, produceId, newFav);
    setFavorited(newFav);
    setFavorite(newFav);
  };

  const imageurl = { uri: image };

  const [orderQuantity, setOrderQuantity] = useState(minQuantity.toString());

  const onSubmitQuantity = () => {
    if (orderQuantity === '') {
      setOrderQuantity(minQuantity.toString());
    } else {
      let value = Number(orderQuantity);
      if (value < minQuantity) {
        value = minQuantity;
      } else if (value > maxQuantity) {
        value = maxQuantity;
      }
      setOrderQuantity(value.toString());
    }
  };

  const [visible, setVisible] = useState(false);

  const onAddToCart = async () => {
    try {
      setVisible(true);
      const quantityToUpdate = [];
      await base('CART V3').select({
      }).eachPage((records, fetchNextPage) => {
        records.forEach(
          (record) => {
            if (produceId === record.fields.Produce[0] && record.fields.shopper[0] === userId) {
              quantityToUpdate.push(record);
            }
            fetchNextPage();
          },
          (err) => {
            if (err) { Alert.alert(err.error, err.message); }
          },
        );
      });
      if (quantityToUpdate.length) {
        let newQuantity = quantityToUpdate[0].fields.quantity + Number(orderQuantity);
        if (newQuantity < minQuantity) {
          newQuantity = minQuantity;
        } else if (newQuantity > maxQuantity) {
          newQuantity = maxQuantity;
        }
        await base('CART V3').update([
          {
            id: quantityToUpdate[0].id,
            fields: {
              quantity: newQuantity,
              'Delivery Day': mondayDelivery ? 'Monday' : 'Friday',
              'Delivery Date': deliveryDate,
            },
          },
        ], (err) => {
          if (err) {
            Alert.alert(err.error, err.message);
          }
        });
      } else {
        await base('CART V3').create([
          {
            fields: {
              Produce: [produceId],
              quantity: Number(orderQuantity),
              shopper: [userId],
              'Delivery Day': mondayDelivery ? 'Monday' : 'Friday',
              'Delivery Date': deliveryDate,
            },
          },
        ], (err) => {
          if (err) {
            Alert.alert(err.error, err.message);
          }
        });
      }
    } catch (err) {
      Alert.alert(err.error, err.message);
    }
  };

  return (
    <Provider>
      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => {
              setVisible(false);
            }}
            contentContainerStyle={styles.addedPopUpContainer}
          >
            <IconButton style={styles.addedIcon} name="checkcircleo" size={50} />
            <Text style={styles.addedText}>Added!</Text>
          </Modal>
        </Portal>

        <View style={styles.detailsContainer}>
          <Image style={styles.imageContainer} source={image === '' ? missingImage : imageurl} />
          <View style={styles.bottomContainer}>
            <View style={styles.sameLineContainer}>
              <Text style={styles.textName}>{name}</Text>
              <TouchableOpacity onPress={onPressHeart}>
                <Icon style={styles.favoriteIcon} name={favorited ? 'heart' : 'heart-o'} size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.tagsLine}>
              {produceTags}
            </View>
            <Text style={styles.textSeller}>
              Fresh from
              {' '}
              {seller}
              {' '}
              farm
            </Text>
            <View style={styles.sameLineContainer}>
              <View style={styles.priceUnitLine}>
                <Text style={styles.textPrice}>
                  $
                  {price}
                </Text>
                <Text style={styles.textUnit}>
                  {'/ '}
                  {unit}
                </Text>
              </View>
              <View style={styles.numberChange}>
                <TouchableOpacity
                  onPress={() => {
                    if (Number(orderQuantity) - 1 >= minQuantity) {
                      const updatedValue = Number(orderQuantity) - 1;
                      setOrderQuantity(updatedValue.toString());
                    }
                  }}
                >
                  <IconButton
                    style={styles.icons}
                    name="minuscircle"
                    size={24}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  value={orderQuantity}
                  onChangeText={setOrderQuantity}
                  onSubmitEditing={onSubmitQuantity}
                  onEndEditing={onSubmitQuantity}
                  placeholder={orderQuantity}
                  placeholderTextColor="black"
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => {
                    if (Number(orderQuantity) + 1 <= maxQuantity) {
                      const updatedValue = Number(orderQuantity) + 1;
                      setOrderQuantity(updatedValue.toString());
                    }
                  }}
                >
                  <IconButton
                    style={styles.icons}
                    name="pluscircle"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={onAddToCart}>
              <Button style={styles.cartButton} color="#868686"><Text style={styles.cartText}>Add to Cart</Text></Button>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.arrowCircle}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Marketplace');
          }}
          >
            <ArrowIcon style={styles.arrowIcon} name="arrow-back-outline" size={34} />
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
}

ProduceDetailsScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      produceId: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired,
      setFavorite: PropTypes.func.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      price: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      seller: PropTypes.string.isRequired,
      maxQuantity: PropTypes.number.isRequired,
      minQuantity: PropTypes.number.isRequired,
      mondayDelivery: PropTypes.bool.isRequired,
      deliveryDate: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProduceDetailsScreen;
