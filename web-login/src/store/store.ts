import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loaderSlice from './loaderSlice';
import errorSlice from './errorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderSlice,
    error: errorSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;