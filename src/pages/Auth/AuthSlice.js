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
    check: false,
  },
  reducers: {
    AuthenticationStart: (state) => {
      state.userData.isAuthorized = false;
      state.error = '';
      state.success = '';
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
    CheckStart: (state) => {
      state.check = false;
    },
    CheckSuccessful: (state, action) => {
      state.userData.token = action.payload.token;
      state.userData.role = action.payload.role;
      state.userData.isAuthorized = true;
      state.check = true;
    },
    CheckFailure: (state, action) => {
      state.error = action.payload;
      state.userData.isAuthorized = false;
      state.check = true;
    },
  },
});

export const {
  AuthenticationStart, AuthenticationSuccessful, AuthenticationSignOut, AuthenticationFailure,
  AlertSuccessful, ClearAlertError, ClearAlertSuccess, CheckSuccessful, CheckFailure, CheckStart,
} = authSlice.actions;

const writeToSession = (data) => {
  localStorage.setItem('TOKEN', data.token);
};

export const signIn = (username, password) => async (dispatch) => {
  dispatch(AuthenticationStart());
  const formdata = new FormData();
  formdata.append('username', username);
  formdata.append('password', password);
  await axios({
    url: 'https://10.188.8.29:5001/api/Users/auth/SignIn',
    method: 'POST',
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
  dispatch(AuthenticationStart());
  const formdata = new FormData();
  formdata.append('username', username);
  await axios({
    url: 'https://10.188.8.29:5001/api/Users/auth/ForgotPassword',
    method: 'POST',
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
  dispatch(AuthenticationStart());
  const formdata = new FormData();
  formdata.append('NewPassword', newPassword);
  formdata.append('ConfimPassword', confimPassword);
  await axios({
    url: `https://10.188.8.29:5001/api/Users/auth/ResetPassword/${code}`,
    method: 'POST',
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

export const checkUser = () => (dispatch) => {
  dispatch(CheckStart());
  axios({
    url: 'https://10.188.8.29:5001/api/users/auth/GetUserRole',
    method: 'GET',
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
      if (status !== 0 && status !== 401) dispatch(CheckFailure(error.request.response));
    });
};

export default authSlice.reducer;
