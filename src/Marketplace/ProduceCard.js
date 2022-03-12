import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#C4C4C4',
    width: 154,
    height: 206,
    borderRadius: 15,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  favoriteIcon: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginEnd: 10,
  },
  image: {
    width: 120,
    height: 120,
  },
  name: {
    height: 20,
    alignSelf: 'flex-start',
    fontSize: 14,
    marginStart: 10,
    marginTop: 5,
    fontWeight: '700',
  },
  bottom: {
    height: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginStart: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 5,
    marginTop: 7,
  },
});

function ProduceCard({
  navigation, favorited, image, name, price, unit,
}) {
  const onPressCard = () => {
    navigation.navigate('ProduceDetails', {
      image, name, price, unit,
    });
  };

  const [favorite, setFavorite] = useState(favorited);

  const onPressHeart = () => {
    const newFav = !favorite;
    setFavorite(newFav);
  };

  const imageurl = { uri: image };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.favoriteIcon} onPress={onPressHeart}>
          <Icon name={favorite ? 'heart' : 'heart-o'} size={15} />
        </TouchableOpacity>
        <Image style={styles.image} source={imageurl} />
        <Text style={styles.name}>{name}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>
            $
            {price}
          </Text>
          <Text style={styles.quantity}>
            {unit}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

ProduceCard.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  favorited: PropTypes.number.isRequired,
  image: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default ProduceCard;
