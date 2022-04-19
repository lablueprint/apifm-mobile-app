import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Avatar, Title, Text, TextInput, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'JosefinSans-SemiBold',
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '30%',
    marginTop: 10,
    backgroundColor: '#0492c2',
  },
  textLabel: {
    marginBottom: 10,
    fontFamily: 'JosefinSans-Regular',
    color: 'grey',
  },
  textBoxes: {
    height: '15%',
    marginTop: 30,
    // marginBottom: 70,
    width: '80%',
  },
});

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line global-require */}
      <Avatar.Image size={100} source={require('./square_logo.png')} />
      <Title style={styles.titleText}>
        Profile
      </Title>
      <Text style={styles.titleText}>
        Organization Name
      </Text>
      {/* Email, phone number, and address fields */}
      <View style={styles.textBoxes}>
        <Text style={styles.textLabel}> Email </Text>
        <TextInput
          value="hello"
          placeholder="Email address"
          keyboardType="email-address"
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
      <View style={styles.textBoxes}>
        <Text style={styles.textLabel}> Phone Number </Text>
        <TextInput
          placeholder="phone number"
          keyboardType="phone-pad"
          style={{ paddingLeft: -5, backgroundColor: 'transparent' }}
        />
      </View>
      <View style={styles.textBoxes}>
        <Text style={styles.textLabel}> Address </Text>
        <TextInput
          placeholder="Address"
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Marketplace')}
      >
        MARKETPLACE
      </Button>
    </View>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
