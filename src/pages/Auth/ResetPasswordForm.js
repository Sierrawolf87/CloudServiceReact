import {
  Box, Button, TextField, Typography, withStyles,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { ResetPassword } from './AuthSlice';
import CSAlert from '../../modules/Alerts/CSAlert';

const styles = () => ({
  main: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInForm: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    width: '300px',
    height: '350px',
    padding: '25px',
    boxShadow: '0px 0px 15px 0px rgba(34, 60, 80, 0.2)',
    borderRadius: '8px',
  },
  ButtonDivForgot: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logoImg: {
    width: '50px',
    height: '50px',
  },
});

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

  render() {
    const { classes } = this.props;
    const redirect = new URLSearchParams(this.props.location.search).get('redirectUrl');
    if (this.props.auth.userData.isAuthorized && redirect !== '') {
      window.location.replace(redirect);
    }
    return (
      <Box className={classes.main}>
        <Box className={classes.signInForm} boxShadow={2}>
          <Box className={classes.logo}>
            <img src="../../icons/chrome/chrome-installprocess-128-128-transparent.png" alt="Logo" className={classes.logoImg} />
            <Typography variant="h5">Cloud Service</Typography>
            <Typography variant="subtitle1">Введите новый пароль</Typography>
          </Box>
          <TextField id="authnewPassword" type="password" label="Новый пароль" variant="outlined" name="newPassword" onChange={(event) => this.OnChangeInputs(event)} value={this.state.newPassword} />
          <TextField id="authconfimPassword" type="password" label="Повторите пароль" variant="outlined" name="confimPassword" onChange={(event) => this.OnChangeInputs(event)} value={this.state.confimPassword} />
          <Box className={classes.ButtonDivForgot}>
            <Button variant="contained" color="primary" onClick={() => this.props.ResetPassword(this.props.match.params.code, this.state.newPassword, this.state.confimPassword)}> Восстановить </Button>
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
  // eslint-disable-next-line max-len
  ResetPassword: (code, newPassword, confimPassword) => dispatch(ResetPassword(code, newPassword, confimPassword)),
});

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordForm));
