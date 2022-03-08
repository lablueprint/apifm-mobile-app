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
    marginEnd: 18,
    marginTop: 25,
  },
  icons: {
    color: '#FFFFFF',
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
    margin: 10,
    borderColor: '#FFFFFF',
    borderRadius: 5,
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
});

function ProduceDetailsScreen({ route }) {
  const {
    favorite, image, name, price, unit, seller, maxQuantity,
  } = route.params;

  const [favorited, setFavorited] = useState(favorite);

  const onPressHeart = () => {
    const newFav = !favorited;
    setFavorited(newFav);
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
              <Text style={styles.textUnit}>{unit.substring(0, 2)}</Text>
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
          <TouchableOpacity>
            <Button style={styles.cartButton} color="#868686"><Text>Add to Cart</Text></Button>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

ProduceDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      favorite: PropTypes.bool.isRequired,
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
