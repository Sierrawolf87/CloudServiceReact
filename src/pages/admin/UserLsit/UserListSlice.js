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
    ClearUserList: (state) => {
      state.userListData = [];
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
  GetUserListSuccessful, GetUserListFailure, ClearUserList, GetRoleListSuccessful,
  GetRoleListFailure, GetGroupListSuccessful, GetGroupListFailure,
} = UserListSlice.actions;

let oldText = '';
let oldRole = '';
let oldGroup = '';

export const getUserList = (text, role, group, page, size) => (dispatch) => {
  if ((text !== oldText && text !== null) || (role !== oldRole && role !== null) || (group !== oldGroup && group !== null)) { page = 1; dispatch(ClearUserList()); }
  oldText = text;
  oldGroup = group;
  oldRole = role;
  Axios({
    url: 'https://10.188.8.29:5001/api/users/withpage',
    params: {
      text,
      role,
      group,
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

export const getRoleList = () => (dispatch) => {
  Axios({
    url: 'https://10.188.8.29:5001/api/roles',
    method: 'GET',
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
    url: 'https://10.188.8.29:5001/api/groups',
    method: 'GET',
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
