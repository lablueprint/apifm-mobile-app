import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';

const middleware = [thunk];
const store = configureStore(authReducer, applyMiddleware(...middleware));

export default store;
