import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        userData: {
            token: "",
            user_id: "",
            isAuthorized: false,
            error: ""
        }
    },
    reducers: {
        AuthenticationSuccessful: (state, action) => {
            state.userData.token = action.payload.token;
            state.userData.user_id = action.payload.user_id;
            state.userData.isAuthorized = true;
        },
        AuthenticationFailure: (state, action) => {
            state.userData.isAuthorized = false;
            state.userData.error = action.payload;
        },
        ClearAuthenticationError: (state) => {
            state.userData.error = ""
        }
    }
});

export const { AuthenticationSuccessful, AuthenticationFailure, ClearAuthenticationError } = authSlice.actions;

export const authState = state => state.auth;

export const signIn = () => dispatch => {
    let formdata = new FormData();
    formdata.append("username", "root"); 
    formdata.append("password", "root"); 
    axios({
        url: "https://localhost:5001/api/Users/auth/SignIn",
        method: "POST",
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
        if (status === 400)
            dispatch(AuthenticationFailure("Неверный логин или пароль"));
    }
    );
}

export const clearError = () => dispatch => dispatch(ClearAuthenticationError());

const writeToSession = (data) => {
    localStorage.setItem("TOKEN", data.token);
}

export const getUserToken = () => {
    return localStorage.getItem("TOKEN");
}


export default authSlice.reducer;