import {
  Box, Button, TextField, Typography, withStyles,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { signIn } from './AuthSlice';
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
  ButtonDivAuth: {
    display: 'flex',
    justifyContent: 'space-between',
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
    const { classes } = this.props;
    console.log(classes);
    const redirect = new URLSearchParams(this.props.location.search).get('redirectUrl');
    if (this.props.auth.userData.isAuthorized && redirect !== '' && redirect !== null) {
      window.location.replace(redirect);
    } else if (this.props.auth.userData.isAuthorized === true) {
      window.location.assign('/');
    }
    return (
      <Box className={classes.main}>
        <Box className={classes.signInForm} boxShadow={2}>
          <Box className={classes.logo}>
            <img src="logo105.png" alt="Logo" className={classes.logoImg} />
            <Typography variant="h5">Cloud Service</Typography>
            <Typography variant="subtitle1">Вход</Typography>
          </Box>
          <TextField id="authusername" label="Логин" variant="outlined" name="username" onChange={(event) => this.OnChangeInputs(event)} value={this.state.username} />
          <TextField id="authpassword" type="password" label="Пароль" variant="outlined" name="password" onChange={(event) => this.OnChangeInputs(event)} value={this.state.password} />
          <Box className={classes.ButtonDivAuth}>
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
});

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInForm));
