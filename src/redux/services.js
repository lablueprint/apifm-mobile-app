import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export const serviceLogin = (username, password) => {
  const userInfo = null;
  base('Users').find('jameshe@ucla.edu', (record, err) => {
    console.log('test');
    console.log(record);
  });
  // base('Users').find(username, (err, record) => {
  //   console.log(username);
  //   if (err) { console.error(err); }
  //   console.log(record.fields.password);
  //   if (record.fields.password === password) {
  //     userInfo = {
  //       id: record.id,
  //       email: record.fields.email,
  //       firstName: record.fields['first name'],
  //       lastName: record.fields['last name'],
  //     };
  //     AsyncStorage.setItem('user', userInfo);
  //   }
  // });
  if (userInfo) {
    return userInfo;
  }
  return null;
};

export const serviceLogout = () => {
  AsyncStorage.removeItem('user');
};
