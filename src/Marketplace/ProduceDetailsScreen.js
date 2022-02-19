import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  detailsContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    width: 380,
    height: 380,
  },
});

function ProduceDetailsScreen({ route }) {
  const {
    favorited, image, name, price, unit, seller, quantity, minQuantity,
  } = route.params;

  const [favorite, setFavorite] = useState(favorited);

  const onPressHeart = () => {
    const newFav = !favorite;
    setFavorite(newFav);
  };
  // does not favorite on the main screen, probably need to pass in function that does the work?

  const imageurl = { uri: image };

  return (
    <View style={styles.detailsContainer}>
      <Image style={styles.imageContainer} source={imageurl} />
      <Text>{name}</Text>
      <Text>{seller}</Text>
      <TouchableOpacity style={styles.favoriteIcon} onPress={onPressHeart}>
        <Icon name={favorite ? 'heart' : 'heart-o'} size={15} />
      </TouchableOpacity>
      <Text>{price}</Text>
      <Text>{unit.substring(0, 2)}</Text>
      <Text>{quantity}</Text>
      <Text>{minQuantity}</Text>
    </View>
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
      quantity: PropTypes.number.isRequired,
      minQuantity: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default ProduceDetailsScreen;
