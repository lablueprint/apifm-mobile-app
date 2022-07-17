/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serviceLogin, serviceLogout } from './services';

const user = AsyncStorage.getItem('user');
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const data = await serviceLogin(username, password);
    return { user: data };
  } catch (error) {
    thunkAPI.dispatch(error);
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk(('auth/logout', async () => {
  await serviceLogout();
}));

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
