/* eslint-disable global-require */
import React from 'react';
import {
  Text, View, Image, StyleSheet,
} from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  master: {
    backgroundColor: '#FFFFFA',
    height: 1000,
  },

  text: {
    color: '#34221D',
    fontSize: 18,
    marginTop: 40,
    marginBottom: 25,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
  },

  mainPhoto: {
    height: 160,
    width: 160,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  viewport: {
    height: 160,
    width: 160,
    borderRadius: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },

  elevation: {
    elevation: 10,
    shadowColor: '#34221D',
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  photo: {
    height: 125,
    width: 125,
    margin: 10,
  },
});

export default function EditAvatarScreen() {
  return (
    <View style={styles.master}>
      <Text style={styles.text}>Select an avatar</Text>
      <View style={[styles.viewport, styles.elevation]}>
        <Image
          source={require('../assets/imgs/placeholder.png')}
          style={styles.mainPhoto}
        />
      </View>
      <View style={styles.container}>
        <Image
          source={require('../assets/imgs/pipa.png')}
          style={styles.photo}
        />
        <Image
          source={require('../assets/imgs/eggplant.png')}
          style={styles.photo}
        />
        <Image
          source={require('../assets/imgs/mango.png')}
          style={styles.photo}
        />
        <Image
          source={require('../assets/imgs/dragonfruit.png')}
          style={styles.photo}
        />
        <Image
          source={require('../assets/imgs/lychee.png')}
          style={styles.photo}
        />
        <Image
          source={require('../assets/imgs/bokchoy.png')}
          style={styles.photo}
        />
      </View>
    </View>
  );
}
