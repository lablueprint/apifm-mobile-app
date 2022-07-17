import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export const serviceLogin = (username, password) => base('Users').find('rec8yzLkLY6VrCKOX', (err, record) => {
  if (err) { console.error(err); return; }
  const userData = {
    id: record.id,
    email: record.fields.email,
    firstName: record.fields['first name'],
    lastName: record.fields['last name'],
  };
  AsyncStorage.setItem('user', JSON.stringify(userData));
  return userData;
});

export const serviceLogout = () => {
  AsyncStorage.removeItem('user');
};
