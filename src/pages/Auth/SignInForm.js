import {
  Box, Button, TextField, Typography,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn, clearError } from './AuthSlice';
import './AuthForms.css';
import CSAlert from '../../modules/Alerts/CSAlert';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  OnChangeInputs(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const redirect = new URLSearchParams(this.props.location.search).get('redirectUrl');
    if (this.props.auth.userData.isAuthorized && redirect !== '' && redirect !== null) {
      window.location.replace(redirect);
    } else if (this.props.auth.userData.isAuthorized === true) {
      this.props.history.push('/');
    }
    return (
      <Box className="main">
        <Box className="signInForm" boxShadow={2}>
          <Box className="logo">
            <img src="logo105.png" alt="Logo" />
            <Typography variant="h5">Cloud Service</Typography>
            <Typography variant="subtitle1">Вход</Typography>
          </Box>
          <TextField id="authusername" label="Логин" variant="outlined" name="username" onChange={(event) => this.OnChangeInputs(event)} value={this.state.username} />
          <TextField id="authpassword" type="password" label="Пароль" variant="outlined" name="password" onChange={(event) => this.OnChangeInputs(event)} value={this.state.password} />
          <Box className="ButtonDivAuth">
            <Button onClick={() => this.props.history.push(`/auth/ForgotPassword?redirectUrl=${redirect}`)}> Забыли пароль? </Button>
            <Button variant="contained" color="primary" onClick={() => this.props.signIn(this.state.username, this.state.password)}> Войти </Button>
          </Box>
        </Box>
        <CSAlert text={this.props.auth.error} variant="error" />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = () => (dispatch) => ({
  signIn: (username, password) => dispatch(signIn(username, password)),
  clearError: () => dispatch(clearError()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInForm));
