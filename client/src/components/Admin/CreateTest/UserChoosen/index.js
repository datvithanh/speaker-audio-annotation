import React, { useState } from 'react';
import UserChoosenStyle from './index.style';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { addUserChosen } from '../../../../actions/admin';
import {setStepCreateTest} from '../../../../actions/admin';

const UserChoosen = ({ users, test, addUserChosen, setStepCreateTest }) => {
  const [usersChose, setUsersChose] = useState([]);
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

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const userIds = [];

      selectedRows.forEach(selectedRow => {
        userIds.push(selectedRow._id);
      });

      setUsersChose(userIds);
    },
  };

  const onClickedHandler = () => {
    addUserChosen(usersChose, test._id);
    setStepCreateTest('step4');
  };

  return (
    <UserChoosenStyle>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users.filter(user => user.role !== 1)}
      />
      <button className="btn btn-primary" onClick={onClickedHandler}>
        Xác nhận
      </button>
    </UserChoosenStyle>
  );
};

const mapStateToProps = state => {
  return {
    users: state.admin.users,
    test: state.admin.test,
  };
};

export default connect(mapStateToProps, { addUserChosen, setStepCreateTest})(UserChoosen);
