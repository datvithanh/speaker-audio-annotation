import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateAdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => {
  if (isAuthenticated && !loading && user && user.role === 0) {
    return <Redirect to="/" />;
  }
  
  return (
    <Route
      {...rest}
      render={props => (
        // x ? (
        //   <Redirect to="/" />
        // ) :
        <Component {...props} />
      )}
    />
  );
};
PrivateAdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateAdminRoute);
