import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import ProduceCard from './ProduceCard';

const styles = StyleSheet.create({
  produceCardsContainer: {
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  produceCard: {
    padding: 15,
    width: 154,
    height: 206,
  },
});

function ProduceGrid({ navigation, userId, produceList }) {
  const produceCards = produceList.map((produce) => (
    <ProduceCard
      style={styles.produceCard}
      key={produce.Name}
      navigation={navigation}
      userId={userId}
      produceId={produce.produceId}
      favorited={produce.Favorited}
      image={produce.Image[0].url}
      name={produce.Name}
      price={produce.Price}
      unit={produce.Unit}
      seller={produce.Seller}
      maxQuantity={produce.Quantity}
    />
  ));

  return (
    <View style={styles.produceCardsContainer}>
      { produceCards }
    </View>
  );
}

ProduceGrid.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  userId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  produceList: PropTypes.array.isRequired,
};

export default ProduceGrid;