import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouteForStudent = ({ component: Component, userData, ...rest }) => {
    if (userData.isAuthorized === true && userData.role === "student") {
        return (
            <Route
                {...rest}
                render={props => (
                    <Component {...props} />
                )}
            />
        )
    } else {
        return (
            <Route
                {...rest}
                render={props => (
                    <Redirect to="/auth" />
                )}
            />
        )
    }
};
export const PrivateRouteForTeacher = ({ component: Component, userData, ...rest }) => {
    if (userData.isAuthorized === true && userData.role === "teacher") {
        return (
            <Route
                {...rest}
                render={props => (
                    <Component {...props} />
                )}
            />
        )
    } else {
        return (
            <Route
                {...rest}
                render={props => (
                    <Redirect to="/auth" />
                )}
            />
        )
    }
};
export const PrivateRouteForNetworkEditor = ({ component: Component, userData, ...rest }) => {
    if (userData.isAuthorized === true && userData.role === "network_editor") {
        return (
            <Route
                {...rest}
                render={props => (
                    <Component {...props} />
                )}
            />
        )
    } else {
        return (
            <Route
                {...rest}
                render={props => (
                    <Redirect to="/auth" />
                )}
            />
        )
    }
};
export const PrivateRouteForRoot = ({ component: Component, userData, ...rest }) => {
    if (userData.isAuthorized === true && userData.role === "root") {
        return (
            <Route
                {...rest}
                render={props => (
                    <Component {...props} />
                )}
            />
        )
    } else {
        return (
            <Route
                {...rest}
                render={props => (
                    <Redirect to="/auth" />
                )}
            />
        )
    }
};