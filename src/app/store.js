import { configureStore } from '@reduxjs/toolkit';
import AlertReducer from '../modules/Alert/AlertSlice';
import DisciplineListReduser from '../pages/admin/DisciplineList/DisciplineListSlice';
import UserListReduser from '../pages/admin/UserLsit/UserListSlice';
import AuthReduser from '../pages/Auth/AuthSlice';
import LaboratoryReducer from '../pages/discipline/laboratory/LaboratorySlice';
import DisciplineReducer from '../pages/discipline/DisciplineSliсe';

export default configureStore({
  reducer: {
    alert: AlertReducer,
    auth: AuthReduser,
    userList: UserListReduser,
    disciplineList: DisciplineListReduser,
    laboratory: LaboratoryReducer,
    discipline: DisciplineReducer,
  },
});
