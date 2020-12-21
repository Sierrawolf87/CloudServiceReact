import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: {
      role: '',
      token: '',
      user_id: '',
      isAuthorized: false,
    },
    error: '',
    success: '',
  },
  reducers: {
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
    AuthenticationFailure: (state, action) => {
      state.userData.isAuthorized = false;
      state.error = action.payload;
    },
    AlertSuccessful: (state, action) => {
      state.success = action.payload;
    },
    ClearAlertError: (state) => {
      state.error = '';
    },
    ClearAlertSuccess: (state) => {
      state.success = '';
    },
    CheckSuccessful: (state, action) => {
      state.userData.token = action.payload.token;
      state.userData.role = action.payload.token;
      state.userData.isAuthorized = true;
    },
    CheckFailure: (state, action) => {
      state.error = action.payload;
      state.isAuthorized = false;
    },
  },
});

export const {
  AuthenticationSuccessful, AuthenticationSignOut, AuthenticationFailure, AlertSuccessful,
  ClearAlertError, ClearAlertSuccess, CheckSuccessful, CheckFailure,
} = authSlice.actions;

const writeToSession = (data) => {
  localStorage.setItem('TOKEN', data.token);
};

export const signIn = (username, password) => async (dispatch) => {
  const formdata = new FormData();
  formdata.append('username', username);
  formdata.append('password', password);
  await axios({
    url: 'https://localhost:5001/api/Users/auth/SignIn',
    method: 'POST',
    timeout: 10000,
    data: formdata,
  })
    .then((res) => {
      dispatch(AuthenticationSuccessful(res.data));
      writeToSession(res.data);
    })
    .catch((error) => {
      const { status } = error.request;
      if (status === 0) dispatch(AuthenticationFailure('Ошибка подключения к серверу'));
      if (status >= 400 && status < 500) dispatch(AuthenticationFailure(error.request.response));
    });
};

export const signOut = () => async (dispatch) => {
  localStorage.removeItem('TOKEN');
  dispatch(AuthenticationSignOut());
};

export const ForgotPassword = (username) => async (dispatch) => {
  const formdata = new FormData();
  formdata.append('username', username);
  await axios({
    url: 'https://localhost:5001/api/Users/auth/ForgotPassword',
    method: 'POST',
    timeout: 10000,
    data: formdata,
  })
    .then((res) => {
      dispatch(AlertSuccessful(res.data));
    })
    .catch((error) => {
      const { status } = error.request;
      if (status === 0) dispatch(AuthenticationFailure('Ошибка подключения к серверу'));
      if (status >= 400 && status < 500) dispatch(AuthenticationFailure(error.request.response));
    });
};

export const ResetPassword = (code, newPassword, confimPassword) => async (dispatch) => {
  const formdata = new FormData();
  formdata.append('NewPassword', newPassword);
  formdata.append('ConfimPassword', confimPassword);
  await axios({
    url: `https://localhost:5001/api/Users/auth/ResetPassword/${code}`,
    method: 'POST',
    timeout: 10000,
    data: formdata,
  })
    .then((res) => {
      dispatch(AlertSuccessful(res.data));
    })
    .catch((error) => {
      const { status } = error.request;
      if (status === 0) dispatch(AuthenticationFailure('Ошибка подключения к серверу'));
      if (status >= 400 && status < 500) dispatch(AuthenticationFailure(error.request.response));
    });
};

export const clearError = () => (dispatch) => dispatch(ClearAlertError());
export const clearSuccess = () => (dispatch) => dispatch(ClearAlertSuccess());

export const checkUser = () => async (dispatch) => {
  await axios({
    url: 'https://localhost:5001/api/users/auth/GetUserRole',
    method: 'GET',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
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
      if (status === 0) dispatch(CheckFailure('Ошибка подключения к серверу'));
      if (status === 401) dispatch(CheckFailure(''));
      else dispatch(CheckFailure(error.request.response));
    });
};

export default authSlice.reducer;
