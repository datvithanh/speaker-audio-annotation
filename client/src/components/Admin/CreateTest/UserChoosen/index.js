import React from 'react';
import UserChoosenStyle from './index.style';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { setAlert } from '../../../../actions/alert';
import { addUserAndFileupload, setUserChosen } from '../../../../actions/admin';
import { setStepCreateTest } from '../../../../actions/admin';
import Alert from '../../../Layout/Alert/Alert';

const UserChoosen = ({
  users,
  setStepCreateTest,
  setAlert,
  minPeopleJoin,
  userChosen,
  setUserChosen,
}) => {
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
      setUserChosen(userIds);
    },
  };

  const onClickedHandler = () => {
    if (userChosen.length !== minPeopleJoin) {
      return setAlert(
        `Bạn phải chọn đủ ${minPeopleJoin} người`,
        'danger',
        2000,
      );
    }
    //addUserAndFileupload(userChosen, test._id, sentencePath, audioPath);
    setStepCreateTest('step4');
  };

  return (
    <UserChoosenStyle>
      <h1 style={{ textAlign: 'center' }}>
        Chỉ định user tham gia bài test Private
      </h1>
      <p className="notice">Cần {minPeopleJoin} người cho bài test</p>
      <Alert />
      <Table
        className="table"
        rowSelection={rowSelection}
        columns={columns}
        rowKey="_id"
        dataSource={users.filter(user => user.role !== 1)}
      />
      <button className="btn btn-primary" onClick={onClickedHandler}>
        Xác nhận và chuyển sang bước tiếp theo
      </button>
    </UserChoosenStyle>
  );
};

const mapStateToProps = state => {
  return {
    users: state.admin.users,
    test: state.admin.test,
    minPeopleJoin: state.admin.test.minPeopleJoin,
    userChosen: state.admin.userChosen,
  };
};

export default connect(
  mapStateToProps,
  { addUserAndFileupload, setStepCreateTest, setAlert, setUserChosen },
)(UserChoosen);
