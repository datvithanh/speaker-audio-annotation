import React, { useEffect } from 'react';
import { Table, Button } from 'antd';
import TestManagementStyle from './index.style';
import { connect } from 'react-redux';
import { getListTest, resetAudioStore } from '../../../actions/admin';

const TestManagement = ({ tests, getListTest, history }) => {
  const onClickDetailTest = _id => {
    history.push(`test-management/${_id}`);
  };

  const columns = [
    {
      title: 'Tên bài test',
      dataIndex: 'name',
      key: 'name',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'accessModifier',
      key: 'accessModifier',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Số voice',
      dataIndex: 'voices.length',
      key: 'voices.length',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Số câu/voice',
      dataIndex: 'numberOfSentences',
      key: 'numberOfSentences',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Số người',
      dataIndex: 'minPeopleJoin',
      key: 'minPeopleJoin',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Ngày mở',
      dataIndex: 'dateOpened',
      key: 'dateOpened',
      className: 'column',
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
    {
      title: 'Ngày kết thúc',
      dataIndex: 'dateClosed',
      key: 'dateClosed',
      className: 'column',
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
    {
      key: 'action',
      render: (text, record) => {
        return (
          <span>
            <Button
              onClick={() => onClickDetailTest(record._id)}
              type="primary"
            >
              Xem chi tiết
            </Button>
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    getListTest();
  }, [getListTest]);

  return (
    <TestManagementStyle>
      {tests ? (
        <Table
          className="table"
          bordered
          rowKey="_id"
          columns={columns}
          dataSource={tests}
        />
      ) : null}
    </TestManagementStyle>
  );
};

const mapStateToProps = state => {
  return {
    tests: state.admin.tests,
  };
};

export default connect(
  mapStateToProps,
  { getListTest, resetAudioStore },
)(TestManagement);
