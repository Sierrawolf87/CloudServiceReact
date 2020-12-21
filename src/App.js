import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Root from './pages/Root/root';
import SignInForm from './pages/Auth/SignInForm';
import ForgotPasswordForm from './pages/Auth/ForgotPasswordForm';
import ResetPasswordForm from './pages/Auth/ResetPasswordForm';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route exact path="/auth" component={SignInForm} />
        <Route exact path="/auth/ForgotPassword" component={ForgotPasswordForm} />
        <Route exact path="/auth/ResetPassword/:code" component={ResetPasswordForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
