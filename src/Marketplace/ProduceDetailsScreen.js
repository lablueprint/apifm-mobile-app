import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  image: {
    width: 205,
    height: 386
  }
})

function ProduceDetailsScreen({ route }) {
  const { image, name, price } = route.params; // need help figuring out how to get the prop types

  return (
    <View>
      <Text>Produce Details</Text>
      <Image style={styles.image} source={image} />
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );
}

ProduceDetailsScreen.propTypes = {
  route: PropTypes.shape({ route: PropTypes.func }).isRequired,
};

export default ProduceDetailsScreen;
