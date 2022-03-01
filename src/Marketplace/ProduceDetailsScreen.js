import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, StyleSheet, TouchableOpacity,
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
    favorited, image, name, price, unit, seller, quantity, minQuantity,
  } = route.params;

  const [favorite, setFavorite] = useState(favorited);

  const onPressHeart = () => {
    const newFav = !favorite;
    setFavorite(newFav);
  };
  // does not favorite on the main screen, probably need to pass in function that does the work?
  // produce.fields.Quantity = Number(record.fields.Quantity);
  // produce.fields['Minimum Quantity'] = Number(record.fields['Minimum Quantity']);

  const imageurl = { uri: image };

  const [orderQuantity, setOrderQuantity] = useState(Number(minQuantity));

  return (
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
        size={15}
        onPress={() => {
          if (orderQuantity - 1 > 0) {
            const updatedValue = orderQuantity - 1;
            setOrderQuantity(updatedValue);
          }
        }}
      />
      <Text style={styles.text}>{orderQuantity}</Text>
      {/* <TextInput
        type="number"
        value={orderQuantity}
        onChangeText={setOrderQuantity}
        keyboardType="numeric"
      /> */}
      <IconButton
        name="plus-circle"
        size={15}
        onPress={() => {
          if (orderQuantity + 1 <= quantity) {
            const updatedValue = orderQuantity + 1;
            setOrderQuantity(updatedValue);
          }
        }}
      />
      <Text>{quantity}</Text>
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
