import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import {
  getPublicTest,
  getPrivateTest,
  setTestCurrently,
  updateRealUserForAudio,
} from '../../actions/user';

import UserStyle from './index.style';
import { withRouter } from 'react-router-dom';

const User = ({
  privateTest,
  publicTest,
  user,
  getPublicTest,
  getPrivateTest,
  setTestCurrently,
  history,
  updateRealUserForAudio,
}) => {
  const [displayPerform, setDisplayPerform] = useState();
  useEffect(() => {
    getPublicTest();
    if (user) {
      getPrivateTest(user._id);
    }
  }, [getPrivateTest, getPublicTest, user]);
  const onClickJoinPublicTest = _id => {
    updateRealUserForAudio(user._id, _id);
    setDisplayPerform(_id);
  };

  const onClickPerformPrivateTest = _id => {
    setTestCurrently(_id);
    history.push(`/evaluate/${_id}`);
  };
  const onClickPerformPublicTest = _id => {
    setTestCurrently(_id);
    history.push(`/evaluate/${_id}`);
  };

  const columnsPublic = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Số lượng câu',
      dataIndex: 'numberOfSentences',
      key: 'numberOfSentences',
      align: 'center',
    },
    {
      title: 'Ngày mở',
      dataIndex: 'dateOpened',
      key: 'dateOpened',
      align: 'center',
      render: dateString => {
        const date = new Date(dateString);
        return (
          <span>
            {date.getDate() +
              ' - ' +
              (date.getMonth() + 1) +
              ' - ' +
              date.getFullYear()}
          </span>
        );
      },
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'dateClosed',
      key: 'dateClosed',
      align: 'center',
      render: dateString => {
        const date = new Date(dateString);
        return (
          <span>
            {date.getDate() +
              ' - ' +
              (date.getMonth() + 1) +
              ' - ' +
              date.getFullYear()}
          </span>
        );
      },
    },
    {
      key: 'action',
      render: (text, record) => {
        const { _id } = record;

        return (
          <span>
            {!record.users.map(user => user.id).includes(user._id) &&
            displayPerform !== _id ? (
              <Button onClick={() => onClickJoinPublicTest(_id)} type="primary">
                Join bài test
              </Button>
            ) : (
              <Button
                onClick={() => onClickPerformPublicTest(_id)}
                type="primary"
              >
                Thực hiện
              </Button>
            )}
          </span>
        );
      },
    },
  ];

  const columnsPrivate = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'column',
    },
    {
      title: 'Số lượng câu',
      dataIndex: 'numberOfSentences',
      key: 'numberOfSentences',
      className: 'column',
    },
    {
      title: 'Ngày mở',
      dataIndex: 'dateOpened',
      key: 'dateOpened',
      className: 'column',
      render: dateString => {
        const date = new Date(dateString);
        return (
          <span>
            {date.getDate() +
              ' - ' +
              (date.getMonth() + 1) +
              ' - ' +
              date.getFullYear()}
          </span>
        );
      },
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'dateClosed',
      key: 'dateClosed',
      className: 'column',
      render: dateString => {
        const date = new Date(dateString);
        return (
          <span>
            {date.getDate() +
              ' - ' +
              (date.getMonth() + 1) +
              ' - ' +
              date.getFullYear()}
          </span>
        );
      },
    },
    {
      key: 'action',
      render: (text, record) => {
        const { _id } = record;
        return (
          <Button onClick={() => onClickPerformPrivateTest(_id)} type="primary">
            Thực hiện
          </Button>
        );
      },
    },
  ];

  return (
    <UserStyle>
      <h4>Danh sách các public test bạn có thể tham gia</h4>
      {publicTest && (
        <Table
          bordered
          className="table"
          rowKey="_id"
          columns={columnsPublic}
          dataSource={publicTest.filter(
            item =>
              Date.now() >= new Date(item.dateOpened) &&
              Date.now() <= new Date(item.dateClosed),
          )}
        />
      )}
      <h4>Danh sách các private test bạn được chỉ định tham gia</h4>{' '}
      {privateTest && (
        <Table
          bordered
          className="table"
          rowKey="_id"
          columns={columnsPrivate}
          dataSource={privateTest.filter(
            item =>
              Date.now() >= new Date(item.dateOpened) &&
              Date.now() <= new Date(item.dateClosed),
          )}
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

export default withRouter(
  connect(
    mapStateToProps,
    {
      getPrivateTest,
      getPublicTest,
      setTestCurrently,
      updateRealUserForAudio,
    },
  )(User),
);
