import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './store';
import { login, logout } from './sliceAuth';

export const serviceLogin = async (username, password) => {
  const userData = {
    id: 'test',
    email: 'test@gmail.com',
    firstName: 'James',
    lastName: 'He',
    organization: 'Pog University',
  };
  AsyncStorage.setItem('user', JSON.stringify(userData));
  store.dispatch(login(userData));
  return true;
};

export const serviceLogout = () => {
  AsyncStorage.removeItem('user');
  store.dispatch(logout());
};
