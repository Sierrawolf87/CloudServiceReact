import {
  Box, Button, Slide, TextField, Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn, clearError } from './AuthSlice';
import './AuthForms.css';

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

  renderErrorAlert() {
    const open = this.props.auth.error === '';
    if (!open) {
      setTimeout(() => this.props.clearError(), 5000);
    }
    return (
      <Slide className="alert" direction="up" in={!open} mountOnEnter unmountOnExit>
        <Alert severity="error">{this.props.auth.error}</Alert>
      </Slide>
    );
  }

  render() {
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
            <Button onClick={() => this.props.history.push('/auth/ForgotPassword')}> Забыли пароль? </Button>
            <Button variant="contained" color="primary" onClick={() => this.props.signIn(this.state.username, this.state.password)}> Войти </Button>
          </Box>
        </Box>
        {this.renderErrorAlert()}
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
