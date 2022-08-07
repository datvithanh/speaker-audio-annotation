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
      return toast.error('Name cannot be empty');
    } else if (!isValidEmail(email)) {
      return toast.error('Invalid email');
    } else if (!password) {
      return toast.error('Password cannot be empty');
    } else if (!isStrongPassword(password)) {
      return toast.error('Password not strong enough');
    } else if (password !== password2) {
      return toast.error('Incorrect confirmation password');
    } else if (!isValidYear(birthYear)) {
      return toast.error('Invalid birth year');
    } else if (sex === 'GioiTinh' || sex === '') {
      return toast.error('Gender not selected');
    } else if (job === '') {
      return toast.error('Job cannot be empty');
    } else if (hometown === '') {
      return toast.error('Hometown cannot be empty');
    } else if (!isValidNumbersOfLiveYear(yearLivingInHaNoi)) {
      return toast.error('Year living in Hanoi is invalid');
    } else if (!isValidNumbersOfLiveYear(yearLivingInHCM)) {
      return toast.error('Year living in Ho Chi Minh City is invalid');
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
      <h1 className="large">Sign up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Register account for speech evaluation
      </p>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="container">
          <div className="column1">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
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
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirmation password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Year of birth (eg. 1998)"
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
                <option value="GioiTinh">Gender</option>
                <option value="Nam">Male</option>
                <option value="Nu">Female</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Job"
                name="job"
                value={job}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Hometown"
                name="hometown"
                value={hometown}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Year living in Hanoi"
                name="yearLivingInHaNoi"
                value={yearLivingInHaNoi}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Year living in Ho Chi Minh City"
                name="yearLivingInHCM"
                value={yearLivingInHCM}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="button">
          <input type="submit" className="btn btn-primary" value="Sign up" />
          <p className="my-1">
            Already have an account?{' '}
            <Link style={{ textDecoration: 'underline' }} to="/login">
              Sign in
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
