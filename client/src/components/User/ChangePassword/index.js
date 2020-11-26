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
      return toast.error('Mật khẩu không được bỏ trống');
    } else if (newPassword === '') {
      return toast.error('Bạn chưa nhập mật khẩu mới');
    } else if (newPassword2 === '') {
      return toast.error('Bạn chưa xác nhận mật khẩu mới');
    } else if (newPassword !== newPassword2) {
      return toast.error('Mật khẩu không khớp');
    } else {
      changePassword(user._id, password, newPassword);
      // setTimeout(() => {
      //   history.push('/team/competitions');
      // }, 3000);
    }
  };

  return (
    <ChangePasswordStyle>
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
