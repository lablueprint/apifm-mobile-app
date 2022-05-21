import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, StyleSheet, TouchableOpacity, Alert,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: '40%',
  },
  elevation: {
    elevation: 3,
    shadowColor: '#34221D',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  favoriteIcon: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
    bottom: 48,
    marginEnd: 10,
  },
  name: {
    alignSelf: 'flex-start',
    fontSize: 15,
    marginStart: 10,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#34221D',
  },
  bottom: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginStart: 10,
    marginBottom: 5,
  },
  price: {
    fontSize: 17,
    fontFamily: 'JosefinSans-SemiBold',
  },
  quantity: {
    fontSize: 12,
    marginLeft: 6,
    marginTop: 6,
    fontFamily: 'JosefinSans-Regular',
  },
});

function ProduceCard({
  navigation, userId, showAlert, produceId, favorited,
  image, name, tags, price, unit, seller, maxQuantity, minQuantity,
  mondayDelivery,
}) {
  const [favorite, setFavorite] = useState(favorited);

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
    const newFav = !favorite;
    addToFavorites(userId, produceId, newFav);
    setFavorite(newFav);
  };

  const onPressCard = () => {
    const display = showAlert();
    if (!display) {
      navigation.navigate('ProduceDetails', {
        produceId,
        userId,
        favorite,
        setFavorite,
        image,
        name,
        tags,
        price,
        unit,
        seller,
        maxQuantity,
        minQuantity,
        mondayDelivery,
      });
    }
  };

  const imageurl = { uri: image };

  return (
    <View style={[styles.container, styles.elevation]}>
      <TouchableOpacity onPress={onPressCard}>
        <View style={styles.cardContainer}>
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
          <TouchableOpacity style={styles.favoriteIcon} onPress={onPressHeart}>
            <Icon name={favorite ? 'heart' : 'heart-o'} size={14} color="#FF6060" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

ProduceCard.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  userId: PropTypes.string.isRequired,
  showAlert: PropTypes.func.isRequired,
  produceId: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  price: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  maxQuantity: PropTypes.number.isRequired,
  minQuantity: PropTypes.number.isRequired,
  mondayDelivery: PropTypes.bool.isRequired,
};

export default ProduceCard;
