import {
  Box, Button, Slide, TextField, Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ResetPassword, clearError, clearSuccess } from './AuthSlice';
import './AuthForms.css';

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confimPassword: '',
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
        <Alert
          severity="success"
          action={(
            <Button color="inherit" size="small" onClick={() => this.props.history.push('/auth')}>
              Вход
            </Button>
                      )}
        >
          {this.props.auth.success}
        </Alert>
      </Slide>
    );
  }

  render() {
    const redirect = new URLSearchParams(this.props.location.search).get('redirectUrl');
    if (this.props.auth.userData.isAuthorized && redirect !== '') {
      window.location.replace(redirect);
    }
    return (
      <Box className="main">
        <Box className="signInForm" boxShadow={2}>
          <Box className="logo">
            <img src="../../logo105.png" alt="Logo" />
            <Typography variant="h5">Cloud Service</Typography>
            <Typography variant="subtitle1">Введите новый пароль</Typography>
          </Box>
          <TextField id="authnewPassword" type="password" label="Новый пароль" variant="outlined" name="newPassword" onChange={(event) => this.OnChangeInputs(event)} value={this.state.newPassword} />
          <TextField id="authconfimPassword" type="password" label="Повторите пароль" variant="outlined" name="confimPassword" onChange={(event) => this.OnChangeInputs(event)} value={this.state.confimPassword} />
          <Box className="ButtonDivForgot">
            <Button variant="contained" color="primary" onClick={() => this.props.ResetPassword(this.props.match.params.code, this.state.newPassword, this.state.confimPassword)}> Восстановить </Button>
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
  // eslint-disable-next-line max-len
  ResetPassword: (code, newPassword, confimPassword) => dispatch(ResetPassword(code, newPassword, confimPassword)),
  clearError: () => dispatch(clearError()),
  clearSuccess: () => dispatch(clearSuccess()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordForm));
