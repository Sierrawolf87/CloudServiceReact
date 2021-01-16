import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const DisciplineListSlice = createSlice({
  name: 'disciplineList',
  initialState: {
    userListData: [],
    disciplineListData: [],
    nextPage: 1,
    error: '',
    loading: true,
  },
  reducers: {
    GetDisciplineListSuccessful: (state, action) => {
      state.disciplineListData = state.disciplineListData.concat(action.payload.data);
      state.nextPage = JSON.parse(action.payload.headers['x-pagination']).Next;
      state.loading = false;
    },
    GetDisciplineListFailure: (state, action) => {
      state.disciplineListData = [];
      state.error = action.payload;
      state.loading = true;
    },
    ClearDisciplineList: (state) => {
      state.disciplineListData = [];
    },
    GetUserListSuccessful: (state, action) => {
      state.userListData = action.payload;
    },
    GetUserListFailure: (state, action) => {
      state.userListData = [];
      state.error = action.payload;
    },
  },
});

export const {
  GetDisciplineListSuccessful, GetDisciplineListFailure, ClearDisciplineList, GetUserListSuccessful,
  GetUserListFailure,
} = DisciplineListSlice.actions;

let oldText = '';
let oldOwnerId = '';

export const getDisciplineList = (text, ownerId, page, size) => (dispatch) => {
  if ((text !== oldText && text !== null) || (ownerId !== oldOwnerId && ownerId !== null)) { page = 1; dispatch(ClearDisciplineList()); }
  oldText = text;
  oldOwnerId = ownerId;
  Axios({
    url: 'disciplines/withpage',
    params: {
      text,
      ownerId,
      page,
      size,
    },
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      if (res.status !== 204) {
        dispatch(GetDisciplineListSuccessful({ data: res.data, headers: res.headers }));
      }
    })
    .catch((error) => {
      console.log(error);
      const { status } = error.request;
      let currentError;
      if (status === 0) currentError = 'Ошибка подключения к серверу';
      if (status === 401) window.location.assign(`/auth?redirectUrl=${window.location.href}`);
      if (status >= 400 && status < 500) currentError = error.request.response;
      dispatch(GetDisciplineListFailure(currentError));
    });
};

export const getUserList = () => (dispatch) => {
  Axios({
    url: 'users',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      res.data.unshift({ id: '', userName: 'Все', initials: 'Все' });
      dispatch(GetUserListSuccessful(res.data));
    })
    .catch((error) => {
      const { status } = error.request;
      let currentError;
      if (status === 0) currentError = 'Ошибка подключения к серверу';
      if (status === 401) window.location.assign(`/auth?redirectUrl=${window.location.href}`);
      if (status >= 400 && status < 500) currentError = error.request.response;
      dispatch(GetUserListFailure(currentError));
    });
};

export default DisciplineListSlice.reducer;
