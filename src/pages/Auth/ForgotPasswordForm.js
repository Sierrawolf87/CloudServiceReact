import {
  Box, Button, Paper, TextField, Typography, withStyles,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import { ForgotPassword } from './AuthSlice';

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

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
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
        <Paper className={classes.signInForm}>
          <Box className={classes.logo}>
            <img src="../icons/chrome/chrome-installprocess-128-128-transparent.png" alt="Logo" className={classes.logoImg} />
            <Typography variant="h5">Cloud Service</Typography>
            <Typography variant="subtitle1">Сброс пароля</Typography>
          </Box>
          <TextField id="authusername" label="Логин" variant="outlined" name="login" onChange={(event) => this.OnChangeInputs(event)} value={this.state.login} />
          <Box className={classes.ButtonDivForgot}>
            <Button variant="contained" color="primary" onClick={() => this.props.ForgotPassword(this.state.login)}> Восстановить </Button>
          </Box>
        </Paper>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = () => (dispatch) => ({
  ForgotPassword: (username) => dispatch(ForgotPassword(username)),
});

export default withSnackbar(withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordForm)));
