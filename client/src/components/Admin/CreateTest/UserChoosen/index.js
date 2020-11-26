import React from 'react';
import UserChoosenStyle from './index.style';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { addUserAndFileupload, setUserChosen } from '../../../../actions/admin';
import { setStepCreateTest } from '../../../../actions/admin';
import { toast } from 'react-toastify';

const UserChoosen = ({
  users,
  setStepCreateTest,
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
      return toast.error(`Bạn phải chọn đủ ${minPeopleJoin} người`);
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
      <Table
        className="table"
        rowSelection={rowSelection}
        columns={columns}
        rowKey="_id"
        bordered
        dataSource={users.filter(
          user => user.role !== 1 && user.type === false,
        )}
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
  { addUserAndFileupload, setStepCreateTest, setUserChosen },
)(UserChoosen);
