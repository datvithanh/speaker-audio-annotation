import React, { useState } from 'react';
import RegisterStyle from './Register.style';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../../../components/Layout/Alert/Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //[] to tell this refer to dynamic key name
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (name === '') {
      return setAlert('Tên không được bỏ trống', 'danger', 3000);
    } else if (email === '') {
      return setAlert('Email không được bỏ trống', 'danger', 3000);
    } else if (password === '') {
      return setAlert('Mật khẩu không được bỏ trống', 'danger', 3000);
    } else if (password !== password2) {
      setAlert('Mật khẩu không khớp', 'danger', 3000);
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <RegisterStyle>
      <Alert />
      <h1 className="large">Đăng ký</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Tạo tài khoản của bạn
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tên"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
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
          <input
            type="password"
            placeholder="Xác thực mật khẩu"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Đăng ký" />
        </div>
      </form>
      <p className="my-1">
        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </RegisterStyle>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { setAlert, register },
)(Register);
