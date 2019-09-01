import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Alert from '../../Layout/Alert/Alert';
import { setAlert } from '../../../actions/alert';
import PropTypes from 'prop-types';
import ChangePasswordStyle from './index.style';
import { changePassword } from '../../../actions/user';

const ChangePassword = ({ setAlert, changePassword, user }) => {
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
      return setAlert('Mật khẩu không được bỏ trống', 'danger', 1000);
    } else if (newPassword === '') {
      return setAlert('Bạn chưa nhập mật khẩu mới', 'danger', 1000);
    } else if (newPassword2 === '') {
      return setAlert('Bạn chưa xác nhận mật khẩu mới', 'danger', 1000);
    } else if (newPassword !== newPassword2) {
      setAlert('Mật khẩu không khớp', 'danger', 1000);
    } else {
      changePassword(user._id, password, newPassword);
    }
  };

  return (
    <ChangePasswordStyle>
      <Alert />
      <h1 className="fas fa-user large"> Đổi mật khẩu</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mật khẩu mới"
            name="newPassword"
            value={newPassword}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            name="newPassword2"
            value={newPassword2}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Xác nhận" />
        </div>
      </form>
    </ChangePasswordStyle>
  );
};

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default withRouter(connect(
  mapStateToProps,
  { setAlert, changePassword },
)(ChangePassword));
