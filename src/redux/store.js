import { configureStore } from '@reduxjs/toolkit';
import reducer from './sliceAuth';

const store = configureStore({
  reducer: {
    auth: reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
