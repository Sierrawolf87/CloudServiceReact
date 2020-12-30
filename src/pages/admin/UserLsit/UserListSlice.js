import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const UserListSlice = createSlice({
  name: 'userList',
  initialState: {
    userListData: [],
    userRoleData: [],
    userGroupData: [],
    nextPage: 1,
    nextSearchPage: 1,
    error: '',
    loading: true,
  },
  reducers: {
    GetUserListSuccessful: (state, action) => {
      state.userListData = state.userListData.concat(action.payload.data);
      state.nextPage = JSON.parse(action.payload.headers['x-pagination']).Next;
      state.loading = false;
    },
    GetUserListFailure: (state, action) => {
      state.userListData = [];
      state.error = action.payload;
      state.loading = true;
    },
    SearchSuccessful: (state, action) => {
      state.userListData = action.payload.data;
      // state.nextSearchPage = JSON.parse(action.payload.headers['x-pagination']).Next;
      state.loading = false;
    },
    SearchFailure: (state, action) => {
      state.userListData = [];
      state.error = action.payload;
      state.loading = true;
    },
    GetRoleListSuccessful: (state, action) => {
      state.userRoleData = action.payload;
    },
    GetRoleListFailure: (state, action) => {
      state.userRoleData = [];
      state.error = action.payload;
    },
    GetGroupListSuccessful: (state, action) => {
      state.userGroupData = action.payload;
    },
    GetGroupListFailure: (state, action) => {
      state.userGroupData = [];
      state.error = action.payload;
    },
  },
});

export const {
  GetUserListSuccessful, GetUserListFailure, GetRoleListSuccessful, GetRoleListFailure,
  GetGroupListSuccessful, GetGroupListFailure, SearchSuccessful, SearchFailure,
} = UserListSlice.actions;

export const getUserList = (page, size) => (dispatch) => {
  Axios({
    url: 'https://localhost:5001/api/users/withpage',
    params: {
      page,
      size,
    },
    method: 'GET',
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      if (res.status !== 204) {
        dispatch(GetUserListSuccessful({ data: res.data, headers: res.headers }));
      }
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

export const getSearchList = (text, role, group) => (dispatch) => {
  Axios({
    url: 'https://localhost:5001/api/users/search',
    params: {
      text,
      role,
      group,
    },
    method: 'GET',
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      if (res.status !== 204) {
        dispatch(SearchSuccessful({ data: res.data, headers: res.headers }));
      }
    })
    .catch((error) => {
      const { status } = error.request;
      let currentError;
      if (status === 0) currentError = 'Ошибка подключения к серверу';
      if (status === 401) window.location.assign(`/auth?redirectUrl=${window.location.href}`);
      if (status >= 400 && status < 500) currentError = error.request.response;
      dispatch(SearchFailure(currentError));
    });
};

export const getRoleList = () => (dispatch) => {
  Axios({
    url: 'https://localhost:5001/api/roles',
    method: 'GET',
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      res.data.unshift({ id: '', name: 'Все' });
      dispatch(GetRoleListSuccessful(res.data));
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

export const getGroupList = () => (dispatch) => {
  Axios({
    url: 'https://localhost:5001/api/groups',
    method: 'GET',
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      res.data.unshift({ id: '', name: 'Все' });
      dispatch(GetGroupListSuccessful(res.data));
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

export default UserListSlice.reducer;
