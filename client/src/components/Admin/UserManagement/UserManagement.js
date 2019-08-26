import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserManagementStyle from './UserManagement.style';
import { Table } from 'antd';
import { getListUser } from '../../../actions/admin';
import { connect } from 'react-redux';

const UserManagement = ({ getListUser, users }) => {
  useEffect(() => {
    getListUser();
  }, [getListUser]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  return (
    <UserManagementStyle>
      <Link className="btn" to="/admin/user-management/add-user">
        Thêm User
      </Link>
      <Table
        columns={columns}
        rowKey="_id"
        bordered
        className="table"
        dataSource={users}
        pagination={{ pageSize: 6 }}
      />
    </UserManagementStyle>
  );
};

const mapStateToProps = state => {
  return {
    users: state.admin.users,
  };
};

export default connect(
  mapStateToProps,
  { getListUser },
)(UserManagement);
