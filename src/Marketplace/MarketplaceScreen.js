import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    marginTop: '40%',
    alignItems: 'center',
  },
  titleText: {
    marginBottom: 10,
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  button: {
    width: '30%',
    marginTop: 5,
    backgroundColor: '#0492c2',
  },
  buttonContainer: {
    marginTop: 5,
    marginRight: 5,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
});

export default function MarketplaceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          icon="account-circle"
          style={styles.button}
          color="white" // Text + icon colour
          onPress={() => navigation.navigate('Profile')}
        >
          Profile
        </Button>
        <Button
          mode="outlined"
          icon="cart"
          style={styles.button}
          color="white"
          onPress={() => navigation.navigate('Cart')}
        >
          Cart
        </Button>
      </View>
      <View style={styles.centeredContainer}>
        <Title style={styles.titleText}> MarketplaceScreen :) </Title>
        <Text style={styles.bodyText}> This is the Marketplace Home. Buy food from me! </Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          SIGN OUT
        </Button>
      </View>
    </View>
  );
}

MarketplaceScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
