/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const user = AsyncStorage.getItem('user');

const initialState = user ? {
  isLoggedIn: true, refresh: 0, user, selectedDeliveryDay: null,
}
  : {
    isLoggedIn: false, refresh: 0, user: null, selectedDeliveryDay: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.refresh = 0;
    },
    refresh: (state) => {
      state.refresh += 1;
    },
    selectDeliveryDay: (state, action) => {
      state.selectedDeliveryDay = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  login,
  logout,
  refresh,
  selectDeliveryDay,
  updateUser,
} = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
