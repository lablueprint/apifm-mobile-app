import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4C4C4',
    width: 154,
    height: 206,
    borderRadius: 15
  },
  cardContainer: {
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
  }
})

function ProduceCard({
  navigation, image, name, price,
}) {
  const onPressCard = () => {
    navigation.navigate('ProduceDetails', { image, name, price });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View style={styles.cardContainer}>
        <Icon name="heart" size={20} />
        <Image style={styles.image} source={image} />
        <Text>{name}</Text>
        <Text>${price} each</Text>
      </View>
    </TouchableOpacity>
  );
}

ProduceCard.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  image: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProduceCard;
