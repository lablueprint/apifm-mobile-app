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

const registerUser = async (userData) => {
  try {
    const response = await base.register({
      username: userData.email,
      password: userData.password,
      fields: {
        'password copy': userData.password,
        'first name': userData.firstName,
        'last name': userData.lastName,
        organization: userData.organization,
        'personal phone': userData.number,
        'business phone': userData.busPhone,
        'delivery recipient': userData.recipient,
        address: userData.address,
        'apartment number': userData.apt,
        zipcode: userData.zip,
        instructions: userData.instr,
        'billing name': userData.fullName,
        'billing address': userData.billAddress,
        'billing apartment number': userData.billApt,
        'billing zipcode': userData.billZip,
        'accounting name': userData.accFullName,
        'accounting email': userData.accEmail,
        'accounting phone': userData.accNumber,
      },
    });
    if (!response.body.success) {
      return false;
    }
    return true;
  } catch (err) {
    Alert.alert(err.error, err.message);
    return false;
  }
};

const loginUser = async (username, password) => {
  try {
    const response = await base.login({
      username,
      password,
    });
    if (!response.body.success) {
      return false;
    }
    const result = response.body.user.fields;
    const userData = {
      id: result['user id'],
      email: result.email,
      firstName: result['first name'],
      lastName: result['last name'],
      organization: result.organization,
      phoneNumber: result['personal phone'],
      address: result.address,
      approved: result['account approved'],
    };
    serviceLogin(userData);
    return true;
  } catch (err) {
    Alert.alert(err.error, err.message);
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
