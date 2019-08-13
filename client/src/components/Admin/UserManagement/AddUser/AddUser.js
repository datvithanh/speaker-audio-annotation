import React, { useState } from 'react'
import { connect } from 'react-redux';
import Alert from '../../../Layout/Alert/Alert';
import { setAlert } from '../../../../actions/alert';
import { addUser } from '../../../../actions/admin';
import PropTypes from 'prop-types'
import AddUserStyle from './AddUserStyle';

const AddUser = ({ setAlert, addUser }) => {
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
    if (password !== password2) {
      setAlert('Mật khẩu không khớp', 'danger', 3000);
    } else {
      addUser({ name, email, password });
      setAlert('Thêm thành công', 'success', 2000);
    }
  };

  return (
    <AddUserStyle>
      <Alert />
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
  )
}

AddUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setAlert, addUser },
)(AddUser);
