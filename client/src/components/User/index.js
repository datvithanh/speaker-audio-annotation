import React, { useState, useEffect } from 'react';
import { Table, Divider } from 'antd';
import { connect } from 'react-redux';
import { getPublicTest, getPrivateTest } from '../../actions/user';
import UserStyle from './index.style';

const User = ({
  privateTest,
  publicTest,
  user,
  getPublicTest,
  getPrivateTest,
}) => {
  const [isJoined, setIsJoined] = useState(false);
  const onClickJoin = () => {
    setIsJoined(true);
  }
  const columnsPublic = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng câu',
      dataIndex: 'numberOfSentences',
      key: 'numberOfSentences',
    },
    {
      title: 'Ngày mở',
      dataIndex: 'dateOpened',
      key: 'dateOpened',
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'dateClosed',
      key: 'dateClosed',
    },
    {
      title: 'Action',
      key: 'actionjoin',
      render: (text, record) => (
        <span>
          {!isJoined ? <button onClick={onClickJoin}>Tham gia</button> : <button>Thực hiện</button>}
        </span>
      ),
    },
  ];

  const columnsPrivate = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng câu',
      dataIndex: 'numberOfSentences',
      key: 'numberOfSentences',
    },
    {
      title: 'Ngày mở',
      dataIndex: 'dateOpened',
      key: 'dateOpened',
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'dateClosed',
      key: 'dateClosed',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <button>Thực hiện</button>
          <Divider type="vertical" />
        </span>
      ),
    },
  ];

  useEffect(() => {
    getPublicTest();
    if (user) {
      getPrivateTest(user._id);
    }
  }, [getPrivateTest, getPublicTest, user]);

  return (
    <UserStyle>
      <h4>Danh sách các public test bạn có thể tham gia</h4>
      {publicTest && (
        <Table
          className="table"
          rowKey="_id"
          columns={columnsPublic}
          dataSource={publicTest}
        />
      )}
      <h4>Danh sách các private test bạn được chỉ định tham gia</h4>{' '}
      {privateTest && (
        <Table
          className="table"
          rowKey="_id"
          columns={columnsPrivate}
          dataSource={privateTest}
        />
      )}
    </UserStyle>
  );
};

const mapStateToProps = state => {
  return {
    privateTest: state.user.privateTest,
    publicTest: state.user.publicTest,
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  { getPrivateTest, getPublicTest },
)(User);
