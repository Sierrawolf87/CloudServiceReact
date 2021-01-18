import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { ShowNotification } from '../../../modules/Alert/AlertSlice';

export const UserListSlice = createSlice({
  name: 'userList',
  initialState: {
    userListData: [],
    userRoleData: [],
    userGroupData: [],
    userById: {},
    userByIdLoading: true,
    nextPage: 1,
    loading: true,
  },
  reducers: {
    GetUserListSuccessful: (state, action) => {
      state.userListData = state.userListData.concat(action.payload.data);
      state.nextPage = JSON.parse(action.payload.headers['x-pagination']).Next;
      state.loading = false;
    },
    GetUserListFailure: (state) => {
      state.userListData = [];
      state.loading = true;
    },
    ClearUserList: (state) => {
      state.userListData = [];
    },
    GetRoleListSuccessful: (state, action) => {
      state.userRoleData = action.payload;
    },
    GetRoleListFailure: (state) => {
      state.userRoleData = [];
    },
    GetGroupListSuccessful: (state, action) => {
      state.userGroupData = action.payload;
    },
    GetGroupListFailure: (state) => {
      state.userGroupData = [];
    },
    GetUserByIdStart: (state) => {
      state.userById = {};
      state.userByIdLoading = true;
    },
    GetUserByIdSuccessful: (state, action) => {
      state.userById = action.payload;
      state.userByIdLoading = false;
    },
    GetUserByIdFailure: (state) => {
      state.userByIdLoading = true;
    },
  },
});

export const {
  GetUserListSuccessful, GetUserListFailure, ClearUserList, GetRoleListSuccessful,
  GetRoleListFailure, GetGroupListSuccessful, GetGroupListFailure, GetUserByIdStart,
  GetUserByIdSuccessful, GetUserByIdFailure,
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
    url: 'users/withpage',
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
      dispatch(GetUserListFailure());
      return error;
    });
};

export const getRoleList = () => (dispatch) => {
  Axios({
    url: 'roles',
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
      dispatch(GetUserListFailure());
      return error;
    });
};

export const getGroupList = () => (dispatch) => {
  Axios({
    url: 'groups',
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
      dispatch(GetUserListFailure());
      return error;
    });
};

export const getUserById = (id) => (dispatch) => {
  dispatch(GetUserByIdStart());
  Axios({
    url: `users/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      dispatch(GetUserByIdSuccessful(res.data));
    })
    .catch((error) => {
      dispatch(GetUserByIdFailure());
      return error;
    });
};

export const putChanges = (data) => (dispatch) => {
  Axios({
    url: `users/${data.id}`,
    method: 'PUT',
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
    .then((res) => {
      if (res.request.status === 204) dispatch(ShowNotification('Изменения сохранены', 'success'));
    })
    .catch((error) => error);
};

export default UserListSlice.reducer;
