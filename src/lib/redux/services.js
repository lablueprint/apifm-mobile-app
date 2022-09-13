import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import store from './store';
import {
  login, logout, refresh, selectDeliveryDay, updateUser,
} from './sliceAuth';

export const serviceLogin = async (userData) => {
  try {
    store.dispatch(login(userData));
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return true;
  } catch (err) {
    Alert.alert(err.error, err.message);
    return err;
  }
};

export const serviceLogout = async () => {
  store.dispatch(logout());
  await AsyncStorage.removeItem('user');
};

export const serviceRefresh = () => {
  store.dispatch(refresh());
};

export const serviceSelectDeliveryDay = (day) => {
  store.dispatch(selectDeliveryDay(day));
};

export const serviceUpdateUser = (userData) => {
  store.dispatch(updateUser(userData));
};
