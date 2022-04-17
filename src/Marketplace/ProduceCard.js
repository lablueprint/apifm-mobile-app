import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    marginTop: 5,
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
  navigation, userId, produceId, favorited, image, name, price, unit, seller, maxQuantity,
}) {
  const [favorite, setFavorite] = useState(favorited);

  const addToFavorites = async (user, produce, favcondition) => {
    await base('Users').find(user, (err, record) => {
      if (err) {
        console.error(err);
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
      console.log(currentFavorites);
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
    const newFav = !favorite;
    addToFavorites(userId, produceId, newFav);
    setFavorite(newFav);
  };

  const onPressCard = () => {
    navigation.navigate('ProduceDetails', {
      produceId, userId, favorite, addToFavorites, image, name, price, unit, seller, maxQuantity,
    });
  };

  const imageurl = { uri: image };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.favoriteIcon} onPress={onPressHeart}>
          <Icon name={favorite ? 'heart' : 'heart-o'} size={15} />
        </TouchableOpacity>
        <Image style={styles.image} source={image === '' ? missingImage : imageurl} />
        <Text style={styles.name}>{name}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>
            {`$${price}`}
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
  userId: PropTypes.string.isRequired,
  produceId: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  maxQuantity: PropTypes.number.isRequired,
};

export default ProduceCard;
