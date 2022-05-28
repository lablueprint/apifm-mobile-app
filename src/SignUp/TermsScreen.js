import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity,
} from 'react-native';
import { Text, Button, Checkbox } from 'react-native-paper';
import ArrowIcon from 'react-native-vector-icons/AntDesign';

const backgroundImage = require('../assets/imgs/signupbackground.png');
const foodrootslogo = require('../assets/imgs/foodrootsharvest.png');

const styles = StyleSheet.create({
  container: {
    marginLeft: '6%',
    marginRight: '6%',
    width: '88%',
    height: '100%',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1%',
    height: '100%',
    width: '100%',
  },
  backArrow: {
    position: 'absolute',
    right: 0,
    marginLeft: '-100%',
    margin: 'auto',
  },
  headerImage: {
    marginTop: '7%',
    width: '50%',
    height: 50,
  },
  title: {
    marginTop: '5%',
    fontSize: 28,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#1D763C',
    alignSelf: 'center',
  },
  subTitle: {
    marginTop: '9%',
    marginBottom: '3%',
    fontSize: 17,
    fontFamily: 'JosefinSans-Bold',
    color: '#1D763C',
  },
  termsBox: {
    maxHeight: '55%',
  },
  termsBoxText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    fontSize: 16,
    padding: 12,
    fontFamily: 'JosefinSans-Regular',
    color: '#5D5D5D',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '-4%',
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
    marginBottom: '15%',
    borderRadius: 20,
    height: 50,
    backgroundColor: '#E5E5E5',
  },
  signUpButtonChecked: {
    marginTop: 5,
    marginBottom: '15%',
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

export default function TermsScreen({ navigation }) { // unused navigation
  const [checked, setChecked] = useState(false);
  const handleSignUpButton = () => {
    if (checked) {
      navigation.navigate('Sign Up');
    }
  };

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => { navigation.navigate('Log In'); }}>
            <ArrowIcon
              style={styles.backArrow}
              name="arrowleft"
              size={34}
              color="#FF9F00"
            />
          </TouchableOpacity>
          <Image style={styles.headerImage} source={foodrootslogo} />
        </View>
        <Text
          style={styles.title}
        >
          Sign up
        </Text>
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
          />
          <Text style={styles.bottomText}>
            I have read, understood, and agree with the Terms and Conditions.
          </Text>
        </View>
        <Button
          style={checked ? styles.signUpButtonChecked : styles.signUpButtonUnchecked}
          onPress={handleSignUpButton}
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
