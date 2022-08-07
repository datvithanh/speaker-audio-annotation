import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChangePasswordStyle from './index.style';
import { changePassword } from '../../../actions/user';
import { toast } from 'react-toastify';

const ChangePassword = ({ changePassword, user, history }) => {
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    newPassword2: '',
  });

  const { password, newPassword, newPassword2 } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //[] to tell this refer to dynamic key name
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (password === '') {
      return toast.error('Password cannot be empty.');
    } else if (newPassword === '') {
      return toast.error('New password missing');
    } else if (newPassword2 === '') {
      return toast.error('New password is empty');
    } else if (newPassword !== newPassword2) {
      return toast.error('Passwords do not match!');
    } else {
      changePassword(user._id, password, newPassword);
      // setTimeout(() => {
      //   history.push('/team/competitions');
      // }, 3000);
    }
  };

  return (
    <ChangePasswordStyle>
      <h1 className="fas fa-user large"> Change Password</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
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
            placeholder="New password"
            name="newPassword"
            value={newPassword}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="New password"
            name="newPassword2"
            value={newPassword2}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Confirm" />
        </div>
      </form>
    </ChangePasswordStyle>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { changePassword },
  )(ChangePassword),
);
