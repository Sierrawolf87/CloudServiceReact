import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const disciplineSlice = createSlice({
  name: 'discipline',
  initialState: {
    disciplineList: [],
    disciplineListLoading: true,
    searchText: '',
  },
  reducers: {
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
} = disciplineSlice.actions;

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

export default disciplineSlice.reducer;
