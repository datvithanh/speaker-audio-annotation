import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginStyle from './Login.style';
import { login } from '../../../actions/auth';
import { setAlert } from '../../../actions/alert';
import PropTypes from 'prop-types';
import Alert from '../../../components/Layout/Alert/Alert';

const Login = ({ login, isAuthenticated, user, setAlert }) => {
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
      return setAlert('Email không được bỏ trống', 'danger', 1000);
    } else if (password === '') {
      return setAlert('Mật khẩu không được bỏ trống', 'danger', 1000);
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
      <Alert />
      <h1 className="large">Đăng nhập</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Đăng nhập vào tài khoản của bạn
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
            placeholder="Mật khẩu"
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { login, setAlert },
)(Login);
