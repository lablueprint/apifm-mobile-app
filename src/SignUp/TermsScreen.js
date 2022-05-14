import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, ImageBackground, ScrollView,
} from 'react-native';
import { Text, Button, Checkbox } from 'react-native-paper';
import Config from 'react-native-config';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const backgroundImage = require('../assets/imgs/signupbackground.png');

const styles = StyleSheet.create({
  container: {
    marginLeft: '6%',
    marginRight: '6%',
    width: '88%',
    height: '100%',
  },
  title: {
    marginTop: '5%',
    fontSize: 28,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#1D763C',
    alignSelf: 'center',
  },
  subTitle: {
    marginTop: '8%',
    marginBottom: '3%',
    fontSize: 17,
    fontFamily: 'JosefinSans-Bold',
    color: '#1D763C',
  },
  termsBox: {
    maxHeight: '58%',
    marginBottom: '3%',
  },
  termsBoxText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    fontSize: 16,
    padding: 15,
    fontFamily: 'JosefinSans-Regular',
    color: '#5D5D5D',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  checkbox: {
    margin: 16,
    fontSize: 100,
    color: '#1D763C',
    backgroundColor: '#1D763C',
    onTintColor: '#1D763C',
    onCheckColor: '#1D763C',
  },
  bottomText: {
    marginTop: '1%',
    fontSize: 15,
    fontFamily: 'JosefinSans-SemiBold',
  },
  signUpButtonUnchecked: {
    marginTop: 5,
    borderRadius: 20,
    height: 50,
    backgroundColor: '#E5E5E5',
  },
  signUpButtonChecked: {
    marginTop: 5,
    borderRadius: 20,
    height: 50,
    backgroundColor: '#1D763C',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-SemiBold',
  },
});

// eslint-disable-next-line no-unused-vars
export default function TermsScreen({ navigation }) { // unused navigation
  const [checked, setChecked] = useState(false);

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}> Sign up </Text>
        <Text style={styles.subTitle}> Terms and Conditions </Text>
        <ScrollView style={styles.termsBox}>
          <Text
            style={styles.termsBoxText}
          >
            I agree to submit the full invoice amount within 15 days of receipt of the produce.
            (Failure to pay the full invoice amount within 15 days of receipt will result in a
            10% late fee added each week beginning on the 3rd week and continuing until the 5th
            week. Upon the 6th week of no payment the debt will be submitted to a debt
            collection agency.)
            {'\n\n'}
            I understand that I have the right to inspect and certify each produce item I receive
            is in good condition. (Any requests for refunds or exchanges made after signed receipt
            of the produce is at the full discretion of Food Roots. Approved requests for refunds or
            exchanges requires, but is not limited to: photo evidence, a full description of what is
            wrong with the produce and must be received within 24 hours of the initial delivery.)
          </Text>
        </ScrollView>
        <View style={styles.iconContainer}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color="#1D763C"
            uncheckedColor="#1D763C"
            // style={styles.checkbox}
          />
          <Text style={styles.bottomText}>
            I have read, understood, and agree with the Terms and Conditions.
          </Text>
        </View>
        <Button
          // onPress={sendEmailOnPress}
          style={checked ? styles.signUpButtonChecked : styles.signUpButtonUnchecked}
        >
          <Text style={styles.signUpButtonText}>
            Sign up
          </Text>
        </Button>
      </View>
    </ImageBackground>
  );
}

TermsScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
