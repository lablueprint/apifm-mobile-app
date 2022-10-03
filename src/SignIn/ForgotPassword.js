import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput, Text,
  ImageBackground, Image, Alert, Keyboard, Pressable,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
    alignItems: 'flex-start',
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
  button: {
    marginTop: 10,
    width: 300,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#1D763C',
    borderRadius: 30,
    fontFamily: 'JosefinSans-SemiBold',
    paddingTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    color: 'white',
  },
  smallText: {
    fontSize: 16,
    fontFamily: 'JosefinSans-Regular',
    textAlign: 'center',
    color: '#868686',
    alignSelf: 'center',
    width: 225,
    marginTop: '1%',
    marginBottom: '40%',
  },
  icon: {
    paddingLeft: '5%',
    paddingBottom: '1%',
  },
  eye: {
    marginRight: 5,
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    width: 350,
  },
  inputs: {
    borderWidth: 1,
    height: 38,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#F0EFEF',
    backgroundColor: '#FFFFFA',
    marginTop: 20,
    marginBottom: 10,
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
  title: {
    fontFamily: 'JosefinSans-SemiBold',
    color: '#1D763C',
    fontSize: 26,
    maxWidth: '60%',
    marginTop: 60,
    marginBottom: 15,
  },
  body: {
    fontFamily: 'JosefinSans-Regular',
    color: '#34221D',
    fontSize: 13,
    maxWidth: '90%',
  },
  textInput: {
    marginLeft: 7,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 14,
    color: '#34221D',
  },
  numTextInput: {
    marginLeft: 19,
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 20,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 40,
    width: '100%',
  },
  image: {
    width: 155,
    height: 45,
    marginLeft: 'auto',
    marginRight: 'auto',
    right: 25,
  },
  digitInput: {
    borderColor: '#1D763C',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    height: 70,
    width: 65,
    marginTop: 10,
    marginBottom: 174,
  },
  digitInputEmpty: {
    borderColor: '#e5e5e5',
    backgroundColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 8,
    height: 70,
    width: 65,
    marginTop: 10,
    marginBottom: 174,
  },
  digitTextInput: {
    fontFamily: 'JosefinSans-Medium',
    fontSize: 30,
    textAlign: 'center',
    color: '#34221D',
    marginTop: 9,
  },
  digitsContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
});

export default function ForgotPassword({ navigation }) {
  const [page, setPage] = useState(1);

  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState('');

  const [code, setCode] = useState('');
  const codeDigitsArray = new Array(4).fill(0);
  const ref = useRef(null);

  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  const [successful, setSuccessful] = useState(false);

  const passwordInput = useRef();

  // function that submits an email to the user if the email exists in the users table
  const checkEmailExists = async () => {
    const results = {
      isFound: false,
      resetCodeExists: false,
      userID: '',
    };
    await base('Users').select({ filterByFormula: `({email}='${email}')` }).eachPage((records, fetchNextPage) => {
      // if the email is in the users table, then we can send a reset code
      if (records.length !== 0) {
        results.isFound = true;
        setUserID(records[0].fields['user id']);
        results.userID = records[0].fields['user id'];
        if (records[0].fields['Reset Code']) {
          results.resetCodeExists = true;
        }
      }
      fetchNextPage();
    });
    return results;
  };

  const sendEmail = async () => {
    const results = await checkEmailExists();
    if (results.isFound && !results.resetCodeExists) {
      const resetCode = Math.floor(1000 + Math.random() * 9000);
      await base('Users').update([
        {
          id: results.userID,
          fields: {
            'Reset Code': resetCode,
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
    } else if (results.isFound && results.resetCodeExists) {
      Alert.alert('Please wait', 'The team has already been notified. Please wait patiently for them to send you your reset code.');
    } else {
      Alert.alert('User email does not exist.', 'Enter a correct email.');
    }
  };

  const checkResetCode = async () => {
    const results = await checkEmailExists();
    if (results.isFound && results.resetCodeExists) {
      setPage(2);
    } else if (results.isFound && !results.resetCodeExists) {
      Alert.alert('Missing code', 'You do not have a reset code, please click the Send Email instead');
    } else {
      Alert.alert('User email does not exist.', 'Enter a correct email.');
    }
  };

  // function that allows users to repress the digits containers to focus
  const handleDigitsPress = () => {
    ref?.current?.focus();
  };

  // function that breaks down the input to digits
  const digitInput = (index) => {
    const digit = code[index] || ' ';

    return (
      <View key={index} style={(digit === ' ') ? styles.digitInputEmpty : styles.digitInput}>
        <Text style={styles.digitTextInput}>{digit}</Text>
      </View>
    );
  };

  // function that checks the code inputted matches the code sent to the user
  const checkCodeValid = async () => {
    let correctCode = false;
    await base('Users').select({ filterByFormula: `({email}='${email}')` }).eachPage((records, fetchNextPage) => {
      // if the code matches, then the user can reset their password on the next page
      if (records[0].fields['Reset Code'] === Number(code)) {
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
            'Reset Code': null,
            Notified: false,
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
          <View style={[styles.top, { marginBottom: 50 }]}>
            <TouchableOpacity onPress={() => { navigation.navigate('Log In'); }}>
              <ArrowIcon
                name="arrowleft"
                size={34}
                color="#FF9F00"
              />
            </TouchableOpacity>
            <Image style={styles.image} source={foodrootslogo} />
          </View>
          <View>
            <Text style={styles.title}>
              Forgot your password?
            </Text>
          </View>
          <View>
            <Text style={styles.body}>
              That&apos;s okay! Enter the email address associated with your
              account and we&apos;ll send an email to reset your password.
              If you already received an email, enter your reset code in the next
              page.
            </Text>
          </View>
          <View style={[styles.inputs, styles.elevation, { marginBottom: 200 }]}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              keyboardType="email-address"
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
              style={styles.textInput}
              width={280}
            />
          </View>
        </View>
        <View style={{ marginBottom: '20%' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={sendEmail}
          >
            <Text style={styles.buttonText}>
              Send Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={checkResetCode}
          >
            <Text style={styles.buttonText}>
              Enter Reset Code
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  if (page === 2) {
    return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={[styles.top, { marginBottom: 46 }]}>
            <TouchableOpacity onPress={() => { setPage(1); }}>
              <ArrowIcon
                name="arrowleft"
                size={34}
                color="#FF9F00"
              />
            </TouchableOpacity>
            <Image style={styles.image} source={foodrootslogo} />
          </View>
          <View>
            <Text style={styles.title}>
              Enter 4-digit recovery code
            </Text>
          </View>
          <View>
            <Text style={styles.body}>
              The recovery code was sent to your email.
              Please check your inbox and enter the recovery code.
            </Text>
          </View>
          <View>
            <Pressable style={styles.digitsContainer} onPress={handleDigitsPress}>
              {codeDigitsArray.map((element, index) => digitInput(index))}
            </Pressable>
            <TextInput
              ref={ref}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              textContentType="oneTimeCode"
              maxLength={4}
              style={styles.hiddenCodeInput}
            />
          </View>
          <View style={{ marginBottom: '20%' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={checkCodeValid}
            >
              <Text style={styles.buttonText}>
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
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
              <View style={[styles.top, { marginBottom: 82 }]}>
                <TouchableOpacity onPress={() => { setPage(2); }}>
                  <ArrowIcon
                    name="arrowleft"
                    size={34}
                    color="#FF9F00"
                  />
                </TouchableOpacity>
                <Image style={styles.image} source={foodrootslogo} />
              </View>

              <Text style={styles.title}>Reset your password</Text>

              <View style={[styles.inputs, { marginBottom: 0 }]}>

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

              <View style={[styles.inputs, { marginTop: 10 }]}>
                <TextInput
                  style={styles.textInput}
                  value={confirmpass}
                  onChangeText={setConfirmPass}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  placeholder="Confirm Password"
                  secureTextEntry={!!hidePass2}
                  returnKeyType="done"
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

              <Text style={styles.smallText}>
                Passwords must be 8 or more characters in length.
              </Text>

              <TouchableOpacity
                mode="contained"
                style={styles.button}
                onPress={() => {
                  Keyboard.dismiss();
                  handleResetPassword();
                }}
              >
                <Text
                  style={styles.buttonText}
                >
                  Reset Password
                </Text>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
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
