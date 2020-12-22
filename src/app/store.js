import { configureStore } from '@reduxjs/toolkit';
import UserListReduser from '../pages/admin/UserLsit/UserListSlice';
import AuthReduser from '../pages/Auth/AuthSlice';

export default configureStore({
  reducer: {
    auth: AuthReduser,
    userList: UserListReduser,
  },
});
