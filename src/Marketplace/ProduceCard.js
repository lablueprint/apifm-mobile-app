import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

function ProduceCard({
  navigation, name, price,
}) {
  const onPressCard = () => {
    navigation.navigate('ProduceDetails');
  };
  return (
    <TouchableOpacity onPress={onPressCard}>
      {/* <Image source={image} /> */}
      <View>
        <Text>{name}</Text>
        <Text>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

ProduceCard.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProduceCard;
