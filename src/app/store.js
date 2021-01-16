import { configureStore } from '@reduxjs/toolkit';
import AlertReducer from '../modules/Alert/AlertSlice';
import DisciplineListReduser from '../pages/admin/DisciplineList/DisciplineListSlice';
import UserListReduser from '../pages/admin/UserLsit/UserListSlice';
import AuthReduser from '../pages/Auth/AuthSlice';

export default configureStore({
  reducer: {
    alert: AlertReducer,
    auth: AuthReduser,
    userList: UserListReduser,
    disciplineList: DisciplineListReduser,
  },
});
