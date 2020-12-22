/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import store from './app/store';
import { checkUser } from './pages/Auth/AuthSlice';

store.dispatch(checkUser());

export const PrivateRouteForStudent = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  dispatch(checkUser());
  const userData = useSelector((state) => state.auth.userData);
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
export const PrivateRouteForTeacher = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  dispatch(checkUser());
  const userData = useSelector((state) => state.auth.userData);
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
export const PrivateRouteForNetworkEditor = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  dispatch(checkUser());
  const userData = useSelector((state) => state.auth.userData);
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
const PrivateRouteForRootComponent = ({ component: Component, ...rest }) => {
  debugger;
  if (rest.auth.check === true) {
    if (rest.auth.userData.isAuthorized === true && rest.auth.userData.role === 'root') {
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
          <Redirect to={`/auth?redirectUrl=${window.location.href}`} />
        )}
      />
    );
  }
  return (
    <h1>loading</h1>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = () => (dispatch) => ({
  checkUser: () => dispatch(checkUser()),
});

export const PrivateRouteForRoot = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRouteForRootComponent);
