import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  path,
  ...rest
}) => {
  const auth = useSelector(state => state.auth);
  console.log({ auth });

  return (
    <Route
      {...rest}
      path={path}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : path === '/change-password' ? (
          <Component {...props} />
        ) : auth && auth.user && auth.user.actived === false ? (
          <Redirect to="/change-password" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
