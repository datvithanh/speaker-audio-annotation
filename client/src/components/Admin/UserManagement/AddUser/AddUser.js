import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../../../actions/admin';
import AddUserStyle from './AddUserStyle';
import { toast } from 'react-toastify';

const AddUser = ({ addUser }) => {
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
      toast.error('Tên không được bỏ trống');
    } else if (email === '') {
      toast.error('Email không được bỏ trống');
    } else if (password === '') {
      toast.error('Mật khẩu không được bỏ trống');
    } else if (password2 === '') {
      toast.error('Xác thực mật khẩu không được bỏ trống');
    } else if (password !== password2) {
      toast.error('Mật khẩu không khớp');
    } else {
      addUser({ name, email, password });
    }
  };

  return (
    <AddUserStyle>
      <h1 className="fas fa-user large"> Thêm User</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Thêm User" />
        </div>
      </form>
    </AddUserStyle>
  );
};

export default connect(
  null,
  { addUser },
)(AddUser);
