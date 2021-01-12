import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const UserListSlice = createSlice({
  name: 'userList',
  initialState: {
    userListData: [],
    userRoleData: [],
    userGroupData: [],
    userById: {},
    userByIdLoading: true,
    nextPage: 1,
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
    GetUserByIdStart: (state) => {
      state.userById = {};
      state.userByIdLoading = true;
    },
    GetUserByIdSuccessful: (state, action) => {
      state.userById = action.payload;
      state.userByIdLoading = false;
    },
    GetUserByIdFailure: (state, action) => {
      state.error = action.payload;
      state.userByIdLoading = true;
    },
    ClearAlertError: (state) => {
      state.error = '';
    },
  },
});

export const {
  GetUserListSuccessful, GetUserListFailure, ClearUserList, GetRoleListSuccessful,
  GetRoleListFailure, GetGroupListSuccessful, GetGroupListFailure, GetUserByIdStart,
  GetUserByIdSuccessful, GetUserByIdFailure, ClearAlertError,
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
      console.log(error);
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

export const getUserById = (id) => (dispatch) => {
  dispatch(GetUserByIdStart());
  Axios({
    url: `https://10.188.8.29:5001/api/users/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      dispatch(GetUserByIdSuccessful(res.data));
    })
    .catch((error) => {
      const { status } = error.request;
      let currentError;
      if (status === 0) currentError = 'Ошибка подключения к серверу';
      if (status === 401) window.location.assign(`/auth?redirectUrl=${window.location.href}`);
      if (status >= 400 && status < 500) currentError = error.request.response;
      dispatch(GetUserByIdFailure(currentError));
    });
};

export const putChanges = (data) => (dispatch) => {
  Axios({
    url: `https://10.188.8.29:5001/api/users/${data.id}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      if (res.request.status === 204) dispatch();
    })
    .catch((error) => {
      const { status } = error.request;
      let currentError;
      if (status === 0) currentError = 'Ошибка подключения к серверу';
      if (status === 401) window.location.assign(`/auth?redirectUrl=${window.location.href}`);
      if (status >= 400 && status < 500) currentError = error.request.response;
      dispatch(GetUserByIdFailure(currentError));
    });
};

export default UserListSlice.reducer;
