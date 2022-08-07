import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginStyle from './Login.style';
import { login } from '../../../actions/auth';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Login = ({ login, isAuthenticated, user }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (email === '') {
      return toast.error('Email cannot be empty');
    } else if (password === '') {
      return toast.error('Password cannot be empty');
    } else {
      await login(email, password);
    }
  };

  // Redirect if logged in
  if (isAuthenticated && user) {
    if (user && user.role === 1) {
      return <Redirect to="/admin/test-management" />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return (
    <LoginStyle>
      <h1 className="large">Sign in</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign in to your account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Sign in" />
        </div>
        <p className="my-1">
          Don't have an account?{' '}
          <Link style={{ textDecoration: 'underline' }} to="/register">
            Sign up
          </Link>
        </p>
      </form>
    </LoginStyle>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { login },
)(Login);
