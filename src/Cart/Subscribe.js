/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import {
  Text, Button, TextInput,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 35,
    marginBottom: 10,
    width: 250,
  },
  subscribeFormText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: '3%',
  },
  repeatContainer: {
    flexDirection: 'row',
  },
  nameInput: {
    fontSize: 18,
    height: 30,
    padding: '1%',
    margin: '1%',
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  repeatEveryInput: {
    height: 30,
    width: 30,
    fontSize: 20,
    marginLeft: 10,
  },
});

export default function SubscribeForm(props) {
  const { hide } = props;

  if (hide) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.subscribeFormText}>
        <Text>
          Subscription Name
        </Text>
        <TextInput style={styles.nameInput} />
      </View>
      <View style={styles.repeatContainer}>
        <Text>
          Repeat every
        </Text>
        <TextInput style={styles.repeatEveryInput}/>
      </View>
    </View>
  );
}

SubscribeForm.propTypes = {
  hide: PropTypes.bool.isRequired,
};
