import {
  Box, Button, Slide, TextField, Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { connect } from 'react-redux';
import { ForgotPassword, clearError, clearSuccess } from './AuthSlice';
import './AuthForms.css';

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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

  renderSuccessAlert() {
    const open = this.props.auth.success === '';
    if (!open) {
      setTimeout(() => this.props.clearSuccess(), 5000);
    }
    return (
      <Slide className="alert" direction="up" in={!open} mountOnEnter unmountOnExit>
        <Alert severity="success">{this.props.auth.success}</Alert>
      </Slide>
    );
  }

  render() {
    return (
      <Box className="main">
        <Box className="signInForm" boxShadow={2}>
          <Box className="logo">
            <img src="../logo105.png" alt="Logo" />
            <Typography variant="h5">Cloud Service</Typography>
            <Typography variant="subtitle1">Сброс пароля</Typography>
          </Box>
          <TextField id="authusername" label="Логин" variant="outlined" name="username" onChange={(event) => this.OnChangeInputs(event)} value={this.state.username} />
          <Box className="ButtonDivForgot">
            <Button variant="contained" color="primary" onClick={() => this.props.ForgotPassword(this.state.username)}> Восстановить </Button>
          </Box>
        </Box>
        {this.renderErrorAlert()}
        {this.renderSuccessAlert()}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = () => (dispatch) => ({
  ForgotPassword: (username) => dispatch(ForgotPassword(username)),
  clearError: () => dispatch(clearError()),
  clearSuccess: () => dispatch(clearSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordForm);
