import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from '../User';

const Home = ({ user }) => {
  if (user && user.role === 1) {
    return <Redirect to="/admin/test-management" />;
  }

  return <User />;
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
