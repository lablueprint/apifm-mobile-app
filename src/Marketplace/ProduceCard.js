import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

function ProduceCard({ name, price }) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );
}

ProduceCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProduceCard;
