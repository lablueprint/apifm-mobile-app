import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import store from './store';
import { login, logout } from './sliceAuth';

export const serviceLogin = (userData) => {
  try {
    AsyncStorage.setItem('user', JSON.stringify(userData));
    store.dispatch(login(userData));
    return true;
  } catch (err) {
    Alert.alert(err.error, err.message);
    return err;
  }
};

export const serviceLogout = () => {
  AsyncStorage.removeItem('user');
  store.dispatch(logout());
};
