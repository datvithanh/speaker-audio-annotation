import React from 'react';
import { Link } from 'react-router-dom';
import UserManagementStyle from './UserManagement.style';

const UserManagement = () => {
  return <UserManagementStyle>
    <Link className="btn" to='/admin/user-management/add-user'>Thêm User</Link>
    <table id="t01">
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Age</th>
      </tr>
      <tr>
        <td>Jill</td>
        <td>Smith</td>
        <td>50</td>
      </tr>
      <tr>
        <td>Eve</td>
        <td>Jackson</td>
        <td>94</td>
      </tr>
    </table>
  </UserManagementStyle>;
};

export default UserManagement;
