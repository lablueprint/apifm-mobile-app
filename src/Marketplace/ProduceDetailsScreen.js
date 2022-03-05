import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, View, Image, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from 'react-native-vector-icons/Feather';

const missingImage = require('../assets/missingImage.png');

const styles = StyleSheet.create({
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    height: 380,
    width: '100%',
  },
  bottomContainer: {
    height: 366,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#868686',
  },
  icons: {
    color: '#FFFFFF',
  },
  textName: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  textSeller: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  textPrice: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  textInput: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  sameLineContainer: {
    flexDirection: 'row',
  },
  cartButton: {
    height: 50,
    width: 328,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 22,
  },
});

function ProduceDetailsScreen({ route }) {
  const {
    favorite, setFavorite, image, name, price, unit, seller, maxQuantity,
  } = route.params;

  const onPressHeart = () => {
    const newFav = !favorite;
    setFavorite(newFav);
  };
  // does not favorite on the main screen, probably need to pass in function that does the work?

  // add to cart functionality: need to create a new record in the airtable with a unique ID and
  // the user's email (default for now)

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

  return (
    <ScrollView>
      <View style={styles.detailsContainer}>
        <Image style={styles.imageContainer} source={image === '' ? missingImage : imageurl} />
        <View style={styles.bottomContainer}>
          <View style={styles.sameLineContainer}>
            <Text style={styles.textName}>{name}</Text>
            <TouchableOpacity style={styles.favoriteIcon} onPress={onPressHeart}>
              <Icon style={styles.icons} name={favorite ? 'heart' : 'heart-o'} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textSeller}>{seller}</Text>
          <View style={styles.sameLineContainer}>
            <Text style={styles.textPrice}>{price}</Text>
            <Text style={styles.textSeller}>{unit.substring(0, 2)}</Text>
            <IconButton
              style={styles.icons}
              name="minus-circle"
              size={24}
              onPress={() => {
                if (Number(orderQuantity) - 1 > 0) {
                  const updatedValue = Number(orderQuantity) - 1;
                  setOrderQuantity(updatedValue.toString());
                }
              }}
            />
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
            <IconButton
              style={styles.icons}
              name="plus-circle"
              size={24}
              onPress={() => {
                if (Number(orderQuantity) + 1 <= maxQuantity) {
                  const updatedValue = Number(orderQuantity) + 1;
                  setOrderQuantity(updatedValue.toString());
                }
              }}
            />
          </View>
          <Button style={styles.cartButton} color="#868686">Add to Cart</Button>
        </View>
      </View>
    </ScrollView>
  );
}

ProduceDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
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
