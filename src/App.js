import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {
  Box,
  createMuiTheme, ThemeProvider, useMediaQuery,
} from '@material-ui/core';
import Root from './pages/Root/root';
import SignInForm from './pages/Auth/SignInForm';
import ForgotPasswordForm from './pages/Auth/ForgotPasswordForm';
import ResetPasswordForm from './pages/Auth/ResetPasswordForm';
import UserList from './pages/admin/UserLsit/UserList';
import PrivateRoute from './PrivateRoute';
import TopAppBar from './modules/TopAppBar/TopAppBar';
import DisciplineList from './pages/admin/DisciplineList/DisciplineList';

/* Axios.defaults.baseURL = 'https://10.188.8.29:5001/api/';
Axios.defaults.headers = {
  Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
};
 */

function App() {
  const darkTheme = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
    },
  });

  document.body.style.background = theme.palette.background.default;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TopAppBar />
        <BrowserRouter>
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
    </ThemeProvider>
  );
}

export default App;
