import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Root from './pages/Root/root';
import SignInForm from './pages/Auth/SignInForm';
import ForgotPasswordForm from './pages/Auth/ForgotPasswordForm';
import ResetPasswordForm from './pages/Auth/ResetPasswordForm';
import UserList from './pages/admin/UserLsit/UserList';
import PrivateRoute from './PrivateRoute';
import TopAppBar from './modules/TopAppBar/TopAppBar';

function App() {
  return (
    <div>
      <TopAppBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/auth" component={SignInForm} />
          <Route exact path="/auth/ForgotPassword" component={ForgotPasswordForm} />
          <Route exact path="/auth/ResetPassword/:code" component={ResetPasswordForm} />
          <PrivateRoute exact path="/admin/userlist" userRole="root" component={UserList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
