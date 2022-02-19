import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  image: {
    width: 205,
    height: 386,
  },
});

function ProduceDetailsScreen({ route }) {
  const { image, name, price } = route.params; // need help figuring out how to get the prop types

  const imageurl = { uri: image };
  return (
    <View>
      <Text>Produce Details</Text>
      <Image style={styles.image} source={imageurl} />
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );
}

ProduceDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default ProduceDetailsScreen;
