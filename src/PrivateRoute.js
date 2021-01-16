import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import CSBackdrop from './modules/components/Backdrop/CSBackdrop';
import { checkUser } from './pages/Auth/AuthSlice';

const PrivateRouteComponent = ({ component: Component, userRole, ...rest }) => {
  if (rest.auth.check === false) {
    rest.checkUser();
  }
  if (rest.auth.check === true) {
    if (rest.auth.userData.isAuthorized === true && rest.auth.userData.role === userRole) {
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
    <CSBackdrop />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = () => (dispatch) => ({
  checkUser: () => dispatch(checkUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRouteComponent);
