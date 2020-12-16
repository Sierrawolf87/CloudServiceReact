import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        userData: {
            token: "",
            user_id: "",
            isAuthorized: false,
        },
        error: "",
        success: ""
    },
    reducers: {
        AuthenticationSuccessful: (state, action) => {
            state.token = action.payload.token;
            state.user_id = action.payload.user_id;
            state.isAuthorized = true;
        },
        AuthenticationFailure: (state, action) => {
            state.isAuthorized = false;
            state.error = action.payload;
        },
        AlertSuccessful: (state, action) => {
            state.success = action.payload;
        },
        ClearAlertError: (state) => {
            state.error = ""
        },
        ClearAlertSuccess: (state) => {
            state.success = ""
        }
    }
});

export const { AuthenticationSuccessful, AuthenticationFailure, AlertSuccessful, ClearAlertError, ClearAlertSuccess} = authSlice.actions;

export const authState = state => state.auth;

export const signIn = (username, password) => async dispatch => {
    let formdata = new FormData();
    formdata.append("username", username); 
    formdata.append("password", password); 
    await axios({
        url: "https://localhost:5001/api/Users/auth/SignIn",
        method: "POST",
        timeout: 10000,
        data: formdata
    })
    .then(res => {
        dispatch(AuthenticationSuccessful(res.data));
        writeToSession(res.data);
    })
    .catch( error => {
        let status = error.request.status;
        if (status === 0)
            dispatch(AuthenticationFailure("Ошибка подключения к серверу"));
        if (status >= 400 && status < 500)
            dispatch(AuthenticationFailure(error.request.response));
    }
    );
}

export const ForgotPassword = (username) => async dispatch => {
    let formdata = new FormData();
    formdata.append("username", username); 
    await axios({
        url: "https://localhost:5001/api/Users/auth/ForgotPassword",
        method: "POST",
        timeout: 10000,
        data: formdata
    })
    .then(res => {
        dispatch(AlertSuccessful(res.data));
    })
    .catch( error => {
        let status = error.request.status;
        if (status === 0)
            dispatch(AuthenticationFailure("Ошибка подключения к серверу"));
        if (status >= 400 && status < 500)
            dispatch(AuthenticationFailure(error.request.response));
    }
    );
}

export const ResetPassword = (code, newPassword, confimPassword) => async dispatch => {
    let formdata = new FormData();
    formdata.append("NewPassword", newPassword); 
    formdata.append("ConfimPassword", confimPassword); 
    await axios({
        url: `https://localhost:5001/api/Users/auth/ResetPassword/${code}`,
        method: "POST",
        timeout: 10000,
        data: formdata
    })
    .then(res => {
        dispatch(AlertSuccessful(res.data));
    })
    .catch(error => {
        let status = error.request.status;
        if (status === 0)
            dispatch(AuthenticationFailure("Ошибка подключения к серверу"));
        if (status >= 400 && status < 500)
            dispatch(AuthenticationFailure(error.request.response));
    }
    );
}

export const clearError = () => dispatch => dispatch(ClearAlertError());
export const clearSuccess = () => dispatch => dispatch(ClearAlertSuccess());

const writeToSession = (data) => {
    localStorage.setItem("TOKEN", data.token);
}

export const getUserToken = () => {
    return localStorage.getItem("TOKEN");
}


export default authSlice.reducer;