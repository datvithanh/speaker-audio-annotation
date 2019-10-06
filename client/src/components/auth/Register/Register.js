import React, { useState } from 'react';
import RegisterStyle from './Register.style';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../../../components/Layout/Alert/Alert';
import { isValidEmail, isValidNumbersOfLiveYear, isValidYear, isStrongPassword } from '../../../utils/validation';

const Register = ({ setAlert, register, isAuthenticated }) => {
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
      return setAlert('Họ tên không được bỏ trống', 'danger', 5000);
    } else if (!isValidEmail(email)) {
      return setAlert('Email không hợp lệ', 'danger', 5000);
    } else if (!password) {
      return setAlert('Mật khẩu không được bỏ trống', 'danger', 5000);
    } else if (!isStrongPassword(password)) {
      return setAlert('Mật khẩu không đủ mạnh', 'danger', 5000);
    } else if (password !== password2) {
      setAlert('Mật khẩu xác nhận không khớp', 'danger', 5000);
    } else if (!isValidYear(birthYear)) {
      return setAlert('Năm sinh không hợp lệ', 'danger', 5000);
    } else if (sex === 'GioiTinh' || sex === '') {
      return setAlert('Bạn chưa chọn giới tính', 'danger', 5000);
    } else if (job === '') {
      return setAlert('Nghề nghiệp không được bỏ trống', 'danger', 5000);
    } else if (hometown === '') {
      return setAlert('Quê quán không được bỏ trống', 'danger', 5000);
    } else if (!isValidNumbersOfLiveYear(yearLivingInHaNoi)) {
      return setAlert(
        'Số năm sống ở Hà Nội không hợp lệ',
        'danger',
        5000,
      );
    } else if (!isValidNumbersOfLiveYear(yearLivingInHCM)) {
      return setAlert(
        'Số năm sống ở TPHCM không hợp lệ',
        'danger',
        5000,
      );
    } else {
      console.log(sex);
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
      <h1 className="large">Đăng ký</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Tạo tài khoản của bạn
      </p>
      <Alert />
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
