import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import User from '../User';
import { RESET_TEAM_STATE } from '../../actions/types';

const Home = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: RESET_TEAM_STATE });
  }, [dispatch]);
  if (user && user.role === 1) {
    return <Redirect to="/admin/test-management" />;
  }

  if (user && user.role === 2) {
    return <Redirect to="/team/competitions" />;
  }

  return <User />;
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
