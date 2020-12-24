import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const UserListSlice = createSlice({
  name: 'userList',
  initialState: {
    userListData: [{
      id: '',
      name: '',
      surname: '',
      patronymic: '',
      initials: '',
      email: '',
      role: {
        id: '',
        name: '',
      },
    }],
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
  },
});

export const { GetUserListSuccessful, GetUserListFailure } = UserListSlice.actions;

export const getUserList = (page = 1, size = 1) => (dispatch) => {
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
      dispatch(GetUserListSuccessful({ data: res.data, headers: res.headers }));
    })
    .catch((error) => {
      const { status } = error.request;
      let currentError;
      if (status === 0) currentError = 'Ошибка подключения к серверу';
      if (status === 401) this.props.history.push(`/auth?redirectUrl=${window.location.href}`);
      if (status >= 400 && status < 500) currentError = error.request.response;
      dispatch(GetUserListFailure(currentError));
    });
};

export default UserListSlice.reducer;
