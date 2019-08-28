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
    {
      title: 'Thời điểm tạo',
      dataIndex: 'createdAt',
      align: 'center',
      render: dateString => {
        const date = new Date(dateString);
        return (
          <span style={{ textAlign: 'center', display: 'block' }}>
            {date.getDate() +
              ' - ' +
              (date.getMonth() + 1) +
              ' - ' +
              date.getFullYear()}
          </span>
        );
      },
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
        dataSource={users.filter(
          user => user.role !== 1 && user.type === false,
        )}
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
