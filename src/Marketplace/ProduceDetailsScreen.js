import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, View, Image, StyleSheet, TouchableOpacity, TextInput,
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
    height: 380,
    width: '100%',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 366,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#868686',
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
    marginTop: 100,
  },
  textUnit: {
    fontSize: 16,
    color: '#FFFFFF',
    marginStart: 5,
    marginTop: 115,
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
    marginTop: 80,
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
    produceId, favorite, setFavorite, image, name, price, unit, seller, maxQuantity,
  } = route.params;

  const [favorited, setFavorited] = useState(favorite);

  const onPressHeart = () => {
    const newFav = !favorited;
    setFavorited(newFav);
    setFavorite(newFav);
  };

  const imageurl = { uri: image };

  const [orderQuantity, setOrderQuantity] = useState('1');

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
      setOrderQuantity('1');
    }
  };

  const [visible, setVisible] = useState(false);

  const onAddToCart = () => {
    setVisible(true);
    base('Cart TBD').create([
      {
        fields: {
          'Produce Record': [produceId],
          Quantity: Number(orderQuantity),

        },
      },
    ]);
  };

  return (
    <Provider>
      <ScrollView>

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
                    if (Number(orderQuantity) - 1 > 0) {
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
      </ScrollView>
    </Provider>
  );
}

ProduceDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      produceId: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired,
      setFavorite: PropTypes.func.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      seller: PropTypes.string.isRequired,
      maxQuantity: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default ProduceDetailsScreen;
