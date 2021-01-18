import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {
  Box,
  createMuiTheme, IconButton, ThemeProvider, useMediaQuery,
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Close } from '@material-ui/icons';

import axios from 'axios';
import Root from './pages/Root/root';
import SignInForm from './pages/Auth/SignInForm';
import ForgotPasswordForm from './pages/Auth/ForgotPasswordForm';
import ResetPasswordForm from './pages/Auth/ResetPasswordForm';
import UserList from './pages/admin/UserLsit/UserList';
import PrivateRoute from './PrivateRoute';
import TopAppBar from './modules/TopAppBar/TopAppBar';
import DisciplineList from './pages/admin/DisciplineList/DisciplineList';
import Notifier from './modules/Alert/Alert';
import { ShowNotification } from './modules/Alert/AlertSlice';
import store from './app/store';

axios.defaults.baseURL = 'https://10.188.8.29:5001/api/';

axios.interceptors.request.use(
  (request) => {
    request.headers = {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    };
    return request;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.request) {
      const { status } = error.request;
      if (status === 0) store.dispatch(ShowNotification('Ошибка подключения к серверу', 'error'));
      if (status === 401 && window.location.pathname !== '/') window.location.assign(`/auth?redirectUrl=${window.location.href}`);
      if (status >= 400 && status < 500) store.dispatch(ShowNotification(error.request.response, 'error'));
    }
    return Promise.reject(error);
  },
);

function App() {
  const darkTheme = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
    },
  });

  document.body.style.background = theme.palette.background.default;

  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        maxSnack={3}
        preventDuplicate
        ref={notistackRef}
        action={(key) => (
          <IconButton onClick={onClickDismiss(key)}>
            <Close style={{ color: 'white' }} />
          </IconButton>
        )}
      >
        <Box>
          <Notifier />
          <BrowserRouter>
            <Route component={TopAppBar} />
            <Switch>
              <Route exact path="/" component={Root} />
              <Route exact path="/auth" component={SignInForm} />
              <Route exact path="/auth/ForgotPassword" component={ForgotPasswordForm} />
              <Route exact path="/auth/ResetPassword/:code" component={ResetPasswordForm} />
              <PrivateRoute exact path="/admin/userlist" userRole="root" component={UserList} />
              <PrivateRoute exact path="/admin/DisciplineList" userRole="root" component={DisciplineList} />
            </Switch>
          </BrowserRouter>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
