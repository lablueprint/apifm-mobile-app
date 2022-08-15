import { configureStore } from '@reduxjs/toolkit';
import reducer from './sliceAuth';

const store = configureStore({
  reducer: {
    auth: reducer,
  },
});

export default store;
