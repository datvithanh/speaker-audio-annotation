import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginStyle from './Login.style';
import { login } from '../../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../../../components/Layout/Alert/Alert';

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
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return user && user.role === 0 ? <Redirect to="/" /> : <Redirect to="/admin/test-management" />
  }

  return (
    <LoginStyle>
      <Alert />
      <h1 className="large">Đăng nhập</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Đăng nhập vào tài khoản của bạn
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
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
          <input type="submit" className="btn btn-primary" value="Đăng nhập" />
        </div>
        <p className="my-1">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </form>
    </LoginStyle>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { login },
)(Login);
