import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './store';
import { login, logout } from './sliceAuth';

// eslint-disable-next-line no-unused-vars
export const serviceLogin = async (username, password) => {
  const userData = {
    id: 'rec8yzLkLY6VrCKOX',
    email: 'jameshe@ucla.edu',
    firstName: 'James',
    lastName: 'He',
    organization: 'Pog University',
    phoneNumber: '(111) 111-1111',
    address: '330 De Neve Dr, Olympic Hall',
    approved: true,
  };
  AsyncStorage.setItem('user', JSON.stringify(userData));
  store.dispatch(login(userData));
  return true;
};

export const serviceLogout = () => {
  AsyncStorage.removeItem('user');
  store.dispatch(logout());
};
