import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Root from './pages/Root/root';
import SignInForm from './pages/Auth/SignInForm';
import ForgotPasswordForm from './pages/Auth/ForgotPasswordForm';
import ResetPasswordForm from './pages/Auth/ResetPasswordForm';

function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Root} ></Route>
        <Route exact path="/auth" component={SignInForm} ></Route>
        <Route exact path="/auth/ForgotPassword" component={ForgotPasswordForm} ></Route>
        <Route exact path="/auth/ResetPassword/:code" component={ResetPasswordForm}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;