import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ShowNotification } from '../../modules/Alert/AlertSlice';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: {
      role: '',
      token: '',
      user_id: '',
      isAuthorized: false,
    },
    check: false,
  },
  reducers: {
    AuthenticationStart: (state) => {
      state.userData.isAuthorized = false;
    },
    AuthenticationSuccessful: (state, action) => {
      state.userData.token = action.payload.token;
      state.userData.user_id = action.payload.user_id;
      state.userData.isAuthorized = true;
    },
    AuthenticationSignOut: (state) => {
      state.userData.role = '';
      state.userData.token = '';
      state.userData.user_id = '';
      state.userData.isAuthorized = false;
    },
    AuthenticationFailure: (state) => {
      state.userData.isAuthorized = false;
    },
    CheckStart: (state) => {
      state.check = false;
    },
    CheckSuccessful: (state, action) => {
      state.userData.token = action.payload.token;
      state.userData.role = action.payload.role;
      state.userData.isAuthorized = true;
      state.check = true;
    },
    CheckFailure: (state) => {
      state.userData.isAuthorized = false;
      state.check = true;
    },
  },
});

export const {
  AuthenticationStart, AuthenticationSuccessful, AuthenticationSignOut, AuthenticationFailure,
  CheckSuccessful, CheckFailure, CheckStart,
} = authSlice.actions;

const writeToSession = (data) => {
  localStorage.setItem('TOKEN', data.token);
};

export const signIn = (username, password) => (dispatch) => {
  dispatch(AuthenticationStart());
  const formdata = new FormData();
  formdata.append('username', username);
  formdata.append('password', password);
  axios({
    url: 'Users/auth/SignIn',
    method: 'POST',
    data: formdata,
  })
    .then((res) => {
      dispatch(AuthenticationSuccessful(res.data));
      writeToSession(res.data);
    })
    .catch((error) => error);
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem('TOKEN');
  dispatch(AuthenticationSignOut());
};

export const ForgotPassword = (username) => (dispatch) => {
  dispatch(AuthenticationStart());
  const formdata = new FormData();
  formdata.append('username', username);
  axios({
    url: 'Users/auth/ForgotPassword',
    method: 'POST',
    data: formdata,
  })
    .then((res) => {
      dispatch(dispatch(ShowNotification(res.data, 'success')));
    })
    .catch((error) => error);
};

export const ResetPassword = (code, newPassword, confimPassword) => (dispatch) => {
  dispatch(AuthenticationStart());
  const formdata = new FormData();
  formdata.append('NewPassword', newPassword);
  formdata.append('ConfimPassword', confimPassword);
  axios({
    url: `Users/auth/ResetPassword/${code}`,
    method: 'POST',
    data: formdata,
  })
    .then((res) => {
      dispatch(dispatch(ShowNotification(res.data, 'success')));
      setTimeout(() => { window.location.assign('/auth'); }, 2000);
    })
    .catch((error) => error);
};

export const checkUser = () => (dispatch) => {
  dispatch(CheckStart());
  axios({
    url: 'users/auth/GetUserRole',
    method: 'GET',
  })
    .then((res) => {
      const data = {
        token: localStorage.getItem('TOKEN'),
        role: res.data,
      };
      dispatch(CheckSuccessful(data));
    })
    .catch((error) => {
      const { status } = error.request;
      if (status === 401) dispatch(CheckFailure());
      return error;
    });
};

export default authSlice.reducer;
