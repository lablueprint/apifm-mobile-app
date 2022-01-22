import PropTypes from 'prop-types';
import React from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

function ProduceCard({
  image, name, price, onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} />
      <View>
        <Text>{name}</Text>
        <Text>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

ProduceCard.propTypes = {
  image: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ProduceCard;
