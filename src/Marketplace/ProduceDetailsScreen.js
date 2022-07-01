import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, StyleSheet, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import {
  Button, Text, Provider, Portal, Modal,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from 'react-native-vector-icons/Feather';
import IconAdded from 'react-native-vector-icons/AntDesign';
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
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  imageContainer: {
    alignSelf: 'center',
    height: '55%',
    width: '100%',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '45%',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#868686',
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
  },
  tagContainer: {
    backgroundColor: '#C1DDA9',
    borderRadius: 4,
    width: 70,
    height: 30,
    alignItems: 'center',
    marginLeft: 8,
  },
  favoriteIcon: {
    alignSelf: 'flex-end',
    marginEnd: 13,
    marginTop: 25,
  },
  icons: {
    color: '#FFFFFF',
    margin: 5,
  },
  textName: {
    fontSize: 28,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginStart: 18,
    marginTop: 20,
  },
  textSeller: {
    fontSize: 16,
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    marginStart: 18,
    marginTop: 60,
  },
  textUnit: {
    fontSize: 16,
    color: '#FFFFFF',
    marginStart: 5,
    marginTop: 75,
  },
  textInput: {
    fontSize: 32,
    color: '#FFFFFF',
    marginStart: 10,
    marginEnd: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1,
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
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  cartText: {
    fontSize: 20,
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
    color: '#000000',
    margin: 10,
  },
  addedText: {
    fontSize: 24,
  },
});

function ProduceDetailsScreen({ route }) {
  const {
    userId, produceId, favorite, setFavorite,
    image, name, tags, price, unit, seller, maxQuantity, minQuantity,
    mondayDelivery,
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

  const onChangeQuantity = (e) => {
    if (e === '') {
      setOrderQuantity('');
    } else {
      const value = Number(e);
      if (value > 0 && value <= maxQuantity) {
        setOrderQuantity(value.toString());
      }
    }
  };

  const onSubmitQuantity = () => {
    if (orderQuantity === '') {
      setOrderQuantity(minQuantity.toString());
    }
  };

  const [visible, setVisible] = useState(false);

  const onAddToCart = async () => {
    try {
      let deliveryDate = 'Friday';
      if (mondayDelivery) {
        deliveryDate = 'Monday';
      }
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
        const newQuantity = quantityToUpdate[0].fields.quantity + Number(orderQuantity);
        await base('CART V3').update([
          {
            id: quantityToUpdate[0].id,
            fields: {
              quantity: newQuantity,
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
            <IconAdded style={styles.addedIcon} name="checkcircleo" size={50} />
            <Text style={styles.addedText}>Added!</Text>
          </Modal>
        </Portal>

        <View style={styles.detailsContainer}>
          <Image style={styles.imageContainer} source={image === '' ? missingImage : imageurl} />
          <View style={styles.bottomContainer}>
            <View style={styles.sameLineContainer}>
              <Text style={styles.textName}>{name}</Text>
              <TouchableOpacity style={styles.favoriteIcon} onPress={onPressHeart}>
                <Icon style={styles.icons} name={favorited ? 'heart' : 'heart-o'} size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.tagsLine}>
              {produceTags}
            </View>
            <Text style={styles.textSeller}>{seller}</Text>
            <View style={styles.sameLineContainer}>
              <View style={styles.priceUnitLine}>
                <Text style={styles.textPrice}>
                  $
                  {price}
                </Text>
                <Text style={styles.textUnit}>{unit}</Text>
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
                    name="minus-circle"
                    size={24}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  value={orderQuantity}
                  onChangeText={onChangeQuantity}
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
                    name="plus-circle"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={onAddToCart}>
              <Button style={styles.cartButton} color="#868686"><Text>Add to Cart</Text></Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Provider>
  );
}

ProduceDetailsScreen.propTypes = {
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
    }),
  }).isRequired,
};

export default ProduceDetailsScreen;
