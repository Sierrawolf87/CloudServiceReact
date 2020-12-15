import { Box, Button, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { connect } from 'react-redux';
import { signIn, clearError } from './AuthSlice';
import './AuthForms.css';


class SignInForm extends React.Component{
    renderAlert() {
        if (this.props.auth.userData.error !== "") {
            setTimeout(() => this.props.clearError(), 5000);
            return (<Alert className="alert" severity="error">{this.props.auth.userData.error}</Alert>)
        };
    }

    render(){  
        return(
            <Box className="main">
                <Box className="signInForm" boxShadow={2}>
                    <Box className="logo">
                        <img src="logo105.png" alt="Logo"/>
                        <Typography variant="h5">Cloud Service</Typography>
                    </Box>
                    <TextField id="outlined-basic" label="Имя пользователя" variant="outlined" />
                    <TextField id="outlined-basic" label="Пароль" variant="outlined" />
                    <Box className="ButtonDiv">
                        <Button> Забыли пароль? </Button>
                        <Button variant="contained" color="primary" onClick={() => this.props.signIn()}> Войти </Button>
                    </Box>
                </Box>
                {this.renderAlert()}
            </Box>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = () => dispatch => {
    return {
        signIn: () => dispatch(signIn()),
        clearError: () => dispatch(clearError())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInForm);
