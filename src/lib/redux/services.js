import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './store';
import {
  login, logout, refresh, selectDeliveryDay,
} from './sliceAuth';

export const serviceLogin = (userData) => {
  AsyncStorage.setItem('user', JSON.stringify(userData));
  store.dispatch(login(userData));
};

export const serviceLogout = () => {
  AsyncStorage.removeItem('user');
  store.dispatch(logout());
};

export const serviceRefresh = () => {
  store.dispatch(refresh());
};

export const serviceSelectDeliveryDay = (day) => {
  store.dispatch(selectDeliveryDay(day));
};
