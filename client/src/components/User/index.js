/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import {
  getPublicTest,
  getPrivateTest,
  setTestCurrently,
  updateRealUserForAudio,
  resetAudio,
  updatePublicTestAfterUserJoin,
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
  resetAudio,
  updatePublicTestAfterUserJoin,
}) => {
  // const [displayPerform, setDisplayPerform] = useState();
  const [displaySpinner, setDisplaySpinner] = useState(false);

  useEffect(() => {
    resetAudio();
    if (user && user._id) {
      getPublicTest();
      getPrivateTest(user._id);
      if (
        privateTest &&
        privateTest.length !== 0 &&
        publicTest &&
        publicTest.length !== 0
      ) {
        setDisplaySpinner(false);
      } else {
        setDisplaySpinner(true);

        setTimeout(() => {
          setDisplaySpinner(false);
        }, 500);
      }
    }
  }, [user, resetAudio, getPublicTest, getPrivateTest]);

  // const onClickJoinPublicTest = _id => {
  //   updateRealUserForAudio(user._id, _id);
  //   updatePublicTestAfterUserJoin(_id, user._id);
  // };

  const onClickPerformPrivateTest = _id => {
    setTestCurrently(_id);
    history.push(`/evaluate/${_id}`);
  };
  const onClickPerformPublicTest = _id => {
    updateRealUserForAudio(user._id, _id);
    updatePublicTestAfterUserJoin(_id, user._id);
    setTestCurrently(_id);
    history.push(`/evaluate/${_id}`);
  };

  const columnsPublic = [
    {
      title: 'Test name',
      dataIndex: 'name',
      key: 'name',
      // align: 'center',
    },
    {
      title: 'Number of utterances',
      // dataIndex: 'numberOfSentences',
      key: 'numberOfSentences',
      className: 'column',
      align: 'right',
      width: 200,
      render: ({ voices, minSentences }) => {
        return voices.length * minSentences;
      },
    },
    {
      title: 'Open date',
      dataIndex: 'dateOpened',
      key: 'dateOpened',
      align: 'left',
      width: 200,
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
      title: 'Close date',
      dataIndex: 'dateClosed',
      key: 'dateClosed',

      align: 'left',
      width: 200,
      render: dateString => {
        const date = new Date(dateString);
        return (
          <span>
            {date.getDate() -
              1 +
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
      width: 200,
      render: (text, record) => {
        const { _id } = record;

        return (
          <span>
            {record.users.length === 0 ||
            (!record.users.map(user => user.id).includes(user._id) ||
              record.users.find(item => item.id === user._id.toString())
                .indexAudio === 0) ? (
              <Button
                onClick={() => onClickPerformPublicTest(_id)}
                type="primary"
                style={{ color: 'white', backgroundColor: '#0f6398' }}
              >
                Bắt đầu test
              </Button>
            ) : record.users.find(item => item.id === user._id.toString())
                .indexAudio !==
              record.minSentences * record.voices.length + 1 ? (
              <Button
                type="primary"
                onClick={() => onClickPerformPublicTest(_id)}
                style={{ color: 'white', backgroundColor: '#0f6398' }}
              >
                Thực hiện tiếp
              </Button>
            ) : (
              <div style={{ textAlign: 'center' }}>Đã hoàn thành</div>
            )}
            {/* {!record.users.map(user => user.id).includes(user._id) ? (
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
            )} */}
          </span>
        );
      },
    },
  ];

  const columnsPrivate = [
    {
      title: 'Test name',
      dataIndex: 'name',
      key: 'name',
      className: 'column',
      align: 'left',
    },
    {
      title: 'Number of utterances',
      // dataIndex: 'numberOfSentences',
      align: 'right',
      key: 'numberOfSentences',
      className: 'column',
      width: 200,
      render: ({ voices, minSentences }) => {
        return voices.length * minSentences;
      },
    },
    {
      title: 'Open date',
      dataIndex: 'dateOpened',
      key: 'dateOpened',
      className: 'column',
      align: 'left',
      width: 200,
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
      title: 'Close date',
      dataIndex: 'dateClosed',
      align: 'left',
      key: 'dateClosed',
      className: 'column',
      width: 200,
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
      width: 200,
      render: (text, record) => {
        const { _id } = record;
        return (
          // <Button onClick={() => onClickPerformPrivateTest(_id)} type="primary">
          //   Thực hiện
          // </Button>
          <span>
            {record.users.length === 0 ||
            (!record.users.map(user => user.id).includes(user._id) ||
              record.users.find(item => item.id === user._id.toString())
                .indexAudio === 0) ? (
              <Button
                onClick={() => onClickPerformPrivateTest(_id)}
                type="primary"
                style={{ color: 'white', backgroundColor: '#0f6398' }}
              >
                Start the evaluation
              </Button>
            ) : record.users.find(item => item.id === user._id.toString())
                .indexAudio !==
              record.minSentences * record.voices.length + 1 ? (
              <Button
                type="primary"
                onClick={() => onClickPerformPrivateTest(_id)}
                style={{ color: 'white', backgroundColor: '#0f6398' }}
              >
                Continue
              </Button>
            ) : (
              <div style={{ textAlign: 'center' }}>Completed</div>
            )}
          </span>
        );
      },
    },
  ];

  return (
    <UserStyle>
      {displaySpinner ? (
        <Spin />
      ) : (
        <>
          {publicTest && user && (
            <>
              <h4>Available evaluations that you can join</h4>

              <Table
                bordered
                className="table"
                rowKey="_id"
                columns={columnsPublic}
                pagination={{ pageSize: 10 }}
                scroll={{ y: 240 }}
                dataSource={publicTest.filter(
                  item =>
                    Date.now() >= new Date(item.dateOpened) &&
                    Date.now() <= new Date(item.dateClosed) &&
                    (item.users.map(user => user.id).includes(user._id) ||
                      item.users.length < item.minPeopleJoin),
                )}
              />
            </>
          )}
          {privateTest && user && (
            <>
              <h4>Available evaluations that you are required to join</h4>{' '}
              <Table
                bordered
                className="table"
                rowKey="_id"
                columns={columnsPrivate}
                pagination={{ pageSize: 10 }}
                scroll={{ y: 240 }}
                dataSource={privateTest.filter(
                  item =>
                    Date.now() >= new Date(item.dateOpened) &&
                    Date.now() <= new Date(item.dateClosed),
                )}
              />
            </>
          )}
        </>
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
      resetAudio,
      updatePublicTestAfterUserJoin,
    },
  )(User),
);
