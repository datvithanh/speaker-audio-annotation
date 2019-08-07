import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = ({ auth: { user } }) => {
  if (user && user.role === 1) {
    return <Redirect to="/admin/test-management" />;
  }
  return <Redirect to="/" />;
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
