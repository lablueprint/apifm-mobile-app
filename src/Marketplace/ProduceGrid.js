import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import ProduceCard from './ProduceCard';

const daikon = require('../assets/daikononly.png');

const styles = StyleSheet.create({
  produceCardsContainer: {
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFA',
  },
  produceCard: {
    padding: 15,
    width: 154,
    height: 206,
  },
  noFavoritesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15%',
  },
  noFavoritesImage: {
    width: 105,
    height: 105,
  },
});

function ProduceGrid({
  navigation, userId, showProduce, produceList, favorites, mondayDelivery,
}) {
  const produceCards = produceList.map((produce) => (
    <ProduceCard
      style={styles.produceCard}
      key={produce.Name}
      navigation={navigation}
      userId={userId}
      showProduce={showProduce}
      produceId={produce.produceId}
      favorited={produce.Favorited}
      image={produce.Image[0].url}
      name={produce.Name}
      tags={produce['Type Tags']}
      price={produce.Price}
      unit={produce.Unit}
      seller={produce.Seller}
      maxQuantity={produce['Maximum Quantity']}
      minQuantity={produce['Minimum Quantity']}
      mondayDelivery={mondayDelivery}
    />
  ));

  return (
    <View>
      {(favorites && produceList.length === 0)
        ? (
          <View style={styles.noFavoritesContainer}>
            <Image source={daikon} style={styles.noFavoritesImage} />
            <Text style={{ fontFamily: 'JosefinSans-SemiBold', fontSize: 18, padding: 10 }}>Your Favorites is Empty</Text>
            <Text style={{
              fontFamily: 'JosefinSans-Regular', width: 200, height: 40, textAlign: 'center',
            }}
            >
              Looks like you don&apos;t
              have any items in your favorites yet.
            </Text>
          </View>
        )
        : (
          <View style={styles.produceCardsContainer}>
            { produceCards }
          </View>
        )}
    </View>
  );
}

ProduceGrid.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  userId: PropTypes.string.isRequired,
  showProduce: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  produceList: PropTypes.array.isRequired,
  favorites: PropTypes.bool.isRequired,
  mondayDelivery: PropTypes.bool.isRequired,
};

export default ProduceGrid;
