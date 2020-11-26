import React, { useState } from 'react';
import RegisterStyle from './Register.style';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../actions/auth';
import PropTypes from 'prop-types';
import {
  isValidEmail,
  isValidNumbersOfLiveYear,
  isValidYear,
  isStrongPassword,
} from '../../../utils/validation';
import { toast } from 'react-toastify';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    birthYear: '',
    sex: '',
    job: '',
    hometown: '',
    yearLivingInHaNoi: '',
    yearLivingInHCM: '',
  });

  const {
    name,
    email,
    password,
    password2,
    birthYear,
    sex,
    job,
    hometown,
    yearLivingInHaNoi,
    yearLivingInHCM,
  } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //[] to tell this refer to dynamic key name
    });
  };

  const onChangeSex = e => {
    // console.log(e.target.value);
    setFormData({
      ...formData,
      sex: e.target.value,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (name === '') {
      return toast.error('Họ tên không được bỏ trống');
    } else if (!isValidEmail(email)) {
      return toast.error('Email không hợp lệ');
    } else if (!password) {
      return toast.error('Mật khẩu không được bỏ trống');
    } else if (!isStrongPassword(password)) {
      return toast.error('Mật khẩu không đủ mạnh');
    } else if (password !== password2) {
      return toast.error('Mật khẩu xác nhận không khớp');
    } else if (!isValidYear(birthYear)) {
      return toast.error('Năm sinh không hợp lệ');
    } else if (sex === 'GioiTinh' || sex === '') {
      return toast.error('Bạn chưa chọn giới tính');
    } else if (job === '') {
      return toast.error('Nghề nghiệp không được bỏ trống');
    } else if (hometown === '') {
      return toast.error('Quê quán không được bỏ trống');
    } else if (!isValidNumbersOfLiveYear(yearLivingInHaNoi)) {
      return toast.error('Số năm sống ở Hà Nội không hợp lệ');
    } else if (!isValidNumbersOfLiveYear(yearLivingInHCM)) {
      return toast.error('Số năm sống ở TPHCM không hợp lệ');
    } else {
      register({
        name,
        email,
        password,
        birthYear,
        sex,
        job,
        hometown,
        yearLivingInHaNoi,
        yearLivingInHCM,
      });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <RegisterStyle>
      <h1 className="large">Đăng ký tài khoản</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Tạo tài khoản đánh giá chất lượng giọng
        nói
      </p>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="container">
          <div className="column1">
            <div className="form-group">
              <input
                type="text"
                placeholder="Họ tên"
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
                placeholder="Xác nhận mật khẩu"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Năm sinh (Vd: 1998)"
                name="birthYear"
                value={birthYear}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="column2">
            <div className="form-group">
              <select
                value={sex}
                style={{
                  height: '57px',
                  backgroundColor: 'white',
                  borderRadius: '0px',
                  color: '#6c757d',
                }}
                onChange={e => onChangeSex(e)}
              >
                <option value="GioiTinh">Giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nu">Nữ</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nghề nghiệp"
                name="job"
                value={job}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Quê quán"
                name="hometown"
                value={hometown}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Số năm sống ở Hà Nội (Vd: 2.5)"
                name="yearLivingInHaNoi"
                value={yearLivingInHaNoi}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Số năm sống ở TPHCM (Vd: 2.5)"
                name="yearLivingInHCM"
                value={yearLivingInHCM}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="button">
          <input type="submit" className="btn btn-primary" value="Đăng ký" />
          <p className="my-1">
            Bạn đã có tài khoản?{' '}
            <Link style={{ textDecoration: 'underline' }} to="/login">
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </RegisterStyle>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { register },
)(Register);
