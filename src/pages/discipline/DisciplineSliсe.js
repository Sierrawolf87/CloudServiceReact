import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ShowNotification } from '../../modules/Alert/AlertSlice';

export const disciplineSlice = createSlice({
  name: 'discipline',
  initialState: {
    groupList: [],
    disciplineList: [],
    disciplineListLoading: true,
    searchText: '',
  },
  reducers: {
    GetGroupListSuccessful: (state, action) => {
      state.groupList = action.payload;
    },
    GetUserListFailure: (state) => {
      state.groupList = [];
    },
    GetDisciplineListStart: (state) => {
      state.disciplineList = [];
      state.disciplineListLoading = true;
    },
    GetDisciplineListSuccessful: (state, action) => {
      state.disciplineList = action.payload;
      state.disciplineListLoading = false;
    },
    GetDisciplineListFailure: (state) => {
      state.disciplineListLoading = true;
    },
    SetSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  GetDisciplineListStart, GetDisciplineListSuccessful, GetDisciplineListFailure, SetSearchText,
  GetGroupListSuccessful, GetUserListFailure,
} = disciplineSlice.actions;

export const getGroupList = () => (dispatch) => {
  axios({
    url: 'groups',
    method: 'GET',
  })
    .then((res) => {
      // res.data.unshift({ id: '', name: 'Все' });
      dispatch(GetGroupListSuccessful(res.data));
    })
    .catch((error) => {
      dispatch(GetUserListFailure());
      return error;
    });
};

export const getStudentDisciplineList = (text = '') => (dispatch) => {
  dispatch(GetDisciplineListStart());
  axios({
    url: `Disciplines/GetStudentDiscipline?search=${text}`,
    method: 'GET',
  })
    .then((res) => dispatch(GetDisciplineListSuccessful(res.data)))
    .catch((error) => {
      dispatch(GetDisciplineListFailure());
      return error;
    });
};

export const getTeacherDisciplineList = (text = '') => (dispatch) => {
  dispatch(GetDisciplineListStart());
  axios({
    url: `Disciplines/GetTeacherDiscipline?search=${text}`,
    method: 'GET',
  })
    .then((res) => dispatch(GetDisciplineListSuccessful(res.data)))
    .catch((error) => {
      dispatch(GetDisciplineListFailure());
      return error;
    });
};

export const createDiscipline = (data) => (dispatch) => {
  axios({
    url: 'disciplines',
    method: 'POST',
    data,
  })
    .then(() => {
      dispatch(ShowNotification('Дисциплина создана', 'success'));
      dispatch(getTeacherDisciplineList());
    })
    .catch((error) => error);
};

export const deleteDiscipline = (id) => (dispatch) => {
  axios({
    url: `disciplines/${id}`,
    method: 'DELETE',
  })
    .then(() => {
      dispatch(ShowNotification('Дисциплина удалена', 'success'));
      dispatch(getTeacherDisciplineList());
    })
    .catch((error) => error);
};

export default disciplineSlice.reducer;
