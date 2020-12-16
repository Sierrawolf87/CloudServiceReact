import { configureStore } from '@reduxjs/toolkit';
import AuthReduser from '../pages/Auth/AuthSlice';

export default configureStore({
  reducer: {
    auth: AuthReduser
  },
});
