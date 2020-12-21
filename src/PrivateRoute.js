/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRouteForStudent = ({ component: Component, userData, ...rest }) => {
  PrivateRouteForStudent.prototype = {
    userData: {
      isAuthorized: PropTypes.bool,
      role: PropTypes.string,
    },
  };

  if (userData.isAuthorized === true && userData.role === 'student') {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Component {...props} />
        )}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={() => (
        <Redirect to="/auth" />
      )}
    />
  );
};
export const PrivateRouteForTeacher = ({ component: Component, userData, ...rest }) => {
  if (userData.isAuthorized === true && userData.role === 'teacher') {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Component {...props} />
        )}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={() => (
        <Redirect to="/auth" />
      )}
    />
  );
};
export const PrivateRouteForNetworkEditor = ({ component: Component, userData, ...rest }) => {
  if (userData.isAuthorized === true && userData.role === 'network_editor') {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Component {...props} />
        )}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={() => (
        <Redirect to="/auth" />
      )}
    />
  );
};
export const PrivateRouteForRoot = ({ component: Component, userData, ...rest }) => {
  if (userData.isAuthorized === true && userData.role === 'root') {
    return (
      <Route
        {...rest}
        render={() => (
          <Component {...props} />
        )}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={() => (
        <Redirect to="/auth" />
      )}
    />
  );
};
