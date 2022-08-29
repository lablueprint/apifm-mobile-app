import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput, Text, ImageBackground, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import EyeIcon from 'react-native-vector-icons/FontAwesome5';
import ArrowIcon from 'react-native-vector-icons/AntDesign';

const backgroundImage = require('../assets/imgs/signin.png');
const foodrootslogo = require('../assets/imgs/frh.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 844,
    width: '100%',
    padding: '8%',
  },
  containerInputs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,

  },
  image: {
    width: 201,
    height: 55,
    marginLeft: 25,
  },
  button: {
    marginTop: 10,
    width: 300,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#1D763C',
    borderRadius: 30,
    fontFamily: 'JosefinSans-SemiBold',
    marginBottom: '20%',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: 'white',
    marginTop: 3,
  },
  bigText: {
    fontSize: 30,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: '#1D763C',
    alignSelf: 'center',
    width: 225,
    marginBottom: 30,
  },
  smallText: {
    fontSize: 16,
    fontFamily: 'JosefinSans',
    textAlign: 'center',
    color: '#868686',
    alignSelf: 'center',
    width: 225,
    marginBottom: '20%',
  },
  icon: {
    paddingLeft: '5%',
    paddingBottom: '1%',
  },

  eye: {
    marginRight: 5,
  },
  backArrow: {
    paddingLeft: 15,

  },
  text: {
    flex: 1,
    flexDirection: 'row',
    width: 350,
  },

  inputs: {
    borderWidth: 1,
    height: 38,
    margin: 8.5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#F0EFEF',
    backgroundColor: '#FFFFFA',

  },

  textInput: {
    marginLeft: 5,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    color: '#868686',
    paddingTop: 1,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default function ForgotPassword({ navigation }) {
  const handleResetPassword = () => {
    navigation.navigate('Log In');
  };

  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');

  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  const passwordInput = useRef();

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.text}>

          <TouchableOpacity onPress={() => { navigation.navigate('Log In'); }}>
            <ArrowIcon
              style={styles.backArrow}
              name="arrowleft"
              size={34}
              color="#FF9F00"
            />
          </TouchableOpacity>

          <Image style={styles.image} source={foodrootslogo} />
        </View>

        <Text style={styles.bigText}> Forgot your password? </Text>

        <View style={styles.inputs}>

          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!!hidePass1}
            returnKeyType="next"
            onSubmitEditing={() => { passwordInput.current.focus(); }}
            blurOnSubmit={false}
            width={280}
          />

          <EyeIcon
            style={styles.eye}
            name={hidePass1 ? 'eye-slash' : 'eye'}
            size={15}
            color="grey"
            onPress={() => setHidePass1(!hidePass1)}
          />

        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            value={confirmpass}
            onChangeText={setConfirmPass}
            placeholder="Confirm Password"
            secureTextEntry={!!hidePass2}
            returnKeyType="next"
            blurOnSubmit={false}
            ref={passwordInput}
            width={280}
          />

          <EyeIcon
            style={styles.eye}
            name={hidePass2 ? 'eye-slash' : 'eye'}
            size={15}
            color="grey"
            onPress={() => setHidePass2(!hidePass2)}
          />
        </View>

        <Text style={styles.smallText}> Password must be 8 or more characters in length. </Text>

        <TouchableOpacity
          mode="contained"
          style={styles.button}
          onPress={() => handleResetPassword()}
        >
          <Text
            style={styles.buttonText}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
