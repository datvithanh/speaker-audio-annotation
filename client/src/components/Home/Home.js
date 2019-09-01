import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import User from '../User';

const Home = ({ user }) => {
  if (user && user.role === 1) {
    return <Redirect to="/admin/test-management" />;
  } 
  
  return <User />
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
