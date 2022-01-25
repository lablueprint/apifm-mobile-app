import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

function ProduceDetailsScreen({ route }) {
  const { name, price } = route.params; // need help figuring out how to get the prop types

  return (
    <View>
      <Text>Produce Details</Text>
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );
}

ProduceDetailsScreen.propTypes = {
  route: PropTypes.shape({ route: PropTypes.func }).isRequired,
};

export default ProduceDetailsScreen;
