import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, View, Image, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from 'react-native-vector-icons/Feather';

const missingImage = require('../assets/missingImage.png');

const styles = StyleSheet.create({
  detailsContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    width: 380,
    height: 380,
  },
  text: {
    fontSize: 30,
  },
});

function ProduceDetailsScreen({ route }) {
  const {
    favorited, image, name, price, unit, seller, maxQuantity,
  } = route.params;

  const [favorite, setFavorite] = useState(favorited);

  const onPressHeart = () => {
    const newFav = !favorite;
    setFavorite(newFav);
  };
  // does not favorite on the main screen, probably need to pass in function that does the work?

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
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{seller}</Text>
        <TouchableOpacity style={styles.favoriteIcon} onPress={onPressHeart}>
          <Icon name={favorite ? 'heart' : 'heart-o'} size={15} />
        </TouchableOpacity>
        <Text style={styles.text}>{price}</Text>
        <Text style={styles.text}>{unit.substring(0, 2)}</Text>
        <IconButton
          name="minus-circle"
          size={30}
          onPress={() => {
            if (Number(orderQuantity) - 1 > 0) {
              const updatedValue = Number(orderQuantity) - 1;
              setOrderQuantity(updatedValue.toString());
            }
          }}
        />
        <TextInput
          style={styles.text}
          value={orderQuantity}
          onChangeText={onChangeQuantity}
          onSubmitEditing={onSubmitQuantity}
          onEndEditing={onSubmitQuantity}
          placeholder={orderQuantity}
          placeholderTextColor="black"
          keyboardType="numeric"
        />
        <IconButton
          name="plus-circle"
          size={30}
          onPress={() => {
            if (Number(orderQuantity) + 1 <= maxQuantity) {
              const updatedValue = Number(orderQuantity) + 1;
              setOrderQuantity(updatedValue.toString());
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

ProduceDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      favorited: PropTypes.number.isRequired,
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
