import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import AuthReduser from '../pages/Auth/AuthSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: AuthReduser
  },
});
