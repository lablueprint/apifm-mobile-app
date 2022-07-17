/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serviceLogin, serviceLogout } from './services';

const user = AsyncStorage.getItem('user');

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const data = await serviceLogin(username, password);
    console.log(data);
    return { user: data };
  } catch (error) {
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk(('auth/logout', async () => {
  await serviceLogout();
}));

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
