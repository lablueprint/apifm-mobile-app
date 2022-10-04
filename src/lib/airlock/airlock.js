import Config from 'react-native-config';
import Airtable from '@calblueprint/airlock';
import { Alert } from 'react-native';
import { serviceLogin, serviceLogout } from '../redux/services';

Airtable.configure({
  apiKey: 'airlock',
  // this must be updated by the tester
  endpointUrl: Config.ENDPOINT_URL,
});
const base = Airtable.base(Config.REACT_APP_AIRTABLE_BASE_KEY);

const wait = (ms, message) => new Promise((_, reject) => {
  setTimeout(() => reject(new Error(message)), ms);
});

const registerUser = async (userData) => {
  try {
    await Promise.race([wait(5000, 'An account with your email already exists'),
      base.register({
        username: userData.email,
        password: userData.password,
        fields: {
          'first name': userData.firstName,
          'last name': userData.lastName,
          organization: userData.organization,
          'personal phone': userData.number,
          'business phone': userData.busPhone,
          'delivery recipient': userData.recipient,
          address: userData.address,
          'apartment number': userData.apt,
          city: userData.city,
          state: userData.state,
          zipcode: userData.zip,
          instructions: userData.instr,
          'billing name': userData.fullName,
          'billing address': userData.billAddress,
          'billing apartment number': userData.billApt,
          'billing city': userData.billCity,
          'billing state': userData.billState,
          'billing zipcode': userData.billZip,
          'accounting name': userData.accFullName,
          'accounting email': userData.accEmail,
          'accounting phone': userData.accNumber,
        },
      })]);
    return true;
  } catch (err) {
    Alert.alert(err.message);
    return false;
  }
};

const loginUser = async (username, password) => {
  try {
    const response = await Promise.race([wait(5000, 'Incorrect email or password.'),
      base.login({
        username,
        password,
      })]);
    const result = response.body.user.fields;
    const userData = {
      id: result['user id'],
      email: result.email,
      firstName: result['first name'],
      lastName: result['last name'],
      organization: result.organization,
      phoneNumber: result['personal phone'],
      address: result.address,
      aptNum: result['apartment number'],
      city: result.city,
      avatarNum: result.avatarNum,
      approved: result['account approved'],
    };
    serviceLogin(userData);
    return true;
  } catch (err) {
    Alert.alert(err.message);
    return false;
  }
};

const logoutUser = async () => {
  try {
    const response = await base.logout();
    if (!response.body.success) {
      return false;
    }
    serviceLogout();
    return true;
  } catch (err) {
    return false;
  }
};

export { registerUser, loginUser, logoutUser };
