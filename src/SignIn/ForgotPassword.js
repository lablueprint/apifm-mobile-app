import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput, Text,
  ImageBackground, Image, Alert,
} from 'react-native';
import {
  Provider, Portal, Modal,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import EyeIcon from 'react-native-vector-icons/FontAwesome5';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import Config from 'react-native-config';

const bcrypt = require('react-native-bcrypt');
const Airtable = require('airtable');
const backgroundImage = require('../assets/imgs/signin.png');
const foodrootslogo = require('../assets/imgs/frh.png');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

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
  alertContainer: {
    width: 290,
    height: 164,
    backgroundColor: '#FFFFFA',
    alignSelf: 'center',
    borderRadius: 20,
  },
  alertTitle: {
    width: 192,
    height: 80,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 18,
    color: '#1D763C',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default function ForgotPassword({ navigation }) {
  const [page, setPage] = useState(1);

  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  const [successful, setSuccessful] = useState(false);

  const passwordInput = useRef();

  // function that submits an email to the user if the email exists in the users table
  const checkEmailExists = async () => {
    let isFound = false;
    await base('Users').select({ filterByFormula: `({email}='${email}')` }).eachPage((records, fetchNextPage) => {
      // if the email is in the users table, then we can send a reset code
      if (records.length !== 0) {
        isFound = true;
        setUserID(records[0].fields['user id']);
      }
      fetchNextPage();
    });
    if (isFound) {
      const resetCode = Math.floor(1000 + Math.random() * 9000);
      await base('Password Reset').create([
        {
          fields: {
            email,
            code: resetCode,
          },
        },
      ], (err) => {
        if (err) {
          Alert.alert(err.error, err.message);
        } else {
          // only when the record is created can page be redirected
          setPage(2);
        }
      });
    } else {
      Alert.alert('User email does not exist.');
    }
  };

  // function that checks the code inputted matches the code sent to the user
  const checkCodeValid = async () => {
    let correctCode = false;
    await base('Password Reset').select({ filterByFormula: `({email}='${email}')` }).eachPage((records, fetchNextPage) => {
      // if the code matches, then the user can reset their password on the next page
      if (records[0].fields.code === Number(code)) {
        correctCode = true;
      }
      fetchNextPage();
    });
    if (correctCode) {
      setPage(3);
    } else {
      Alert.alert('Incorrect recovery code');
    }
  };

  // function that converts the new password and updates the password field in the Users table
  const handleResetPassword = async () => {
    if (password.length >= 8 && password === confirmpass) {
      const salt = bcrypt.genSaltSync(10);
      // create a new hashed password to replace the existing hashed password
      const newHashedPassword = bcrypt.hashSync(password, salt);
      await base('Users').update([
        {
          id: userID,
          fields: {
            password: newHashedPassword,
          },
        },
      ], (err) => {
        if (err) {
          Alert.alert(err.error, err.message);
        } else {
          // shows alert that the password reset was successful
          setSuccessful(true);
          // automatically redirect the user
          setTimeout(
            () => {
              navigation.navigate('Log In');
            },
            3000,
          );
        }
      });
    } else if (password.length < 8) {
      // check that the password is the correct length
      Alert.alert('Password is not at least 8 characters long.');
    } else {
      Alert.alert('Password was not confirmed.');
    }
  };

  if (page === 1) {
    return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.container}>
          <View>
            <Text>
              Forgot your password?
            </Text>
          </View>
          <View>
            <Text>
              That&apos;s okay! Enter the email address associated with your
              account and we&apos;ll send an email to reset your password.
            </Text>
          </View>
          <View>
            <Text>Email address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              keyboardType="email-address"
              blurOnSubmit={false}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={checkEmailExists}
            >
              <Text>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  if (page === 2) {
    return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.container}>
          <View>
            <Text>
              Enter 4-digit recovery code
            </Text>
          </View>
          <View>
            <Text>
              The recovery code was sent to your email.
              Please check your inbox and enter the recovery code.
            </Text>
          </View>
          <View>
            <TextInput
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              returnKeyType="done"
              textContentType="oneTimeCode"
              maxLength={4}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={checkCodeValid}
            >
              <Text>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  if (page === 3) {
    return (
      <Provider>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.container}>
            <View style={styles.text}>

              <TouchableOpacity onPress={() => { setPage(2); }}>
                <ArrowIcon
                  style={styles.backArrow}
                  name="arrowleft"
                  size={34}
                  color="#FF9F00"
                />
              </TouchableOpacity>

              <Image style={styles.image} source={foodrootslogo} />
            </View>

            <Text style={styles.bigText}> Reset your password </Text>

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
          <View>
            <Portal>
              <Modal
                visible={successful}
                contentContainerStyle={styles.alertContainer}
                onDismiss={() => {
                  setSuccessful(false);
                }}
              >
                <Text style={styles.alertTitle}>
                  Password reset successful! You will now be returned to the login screen.
                </Text>
              </Modal>
            </Portal>

          </View>

        </ImageBackground>
      </Provider>
    );
  }
}

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
