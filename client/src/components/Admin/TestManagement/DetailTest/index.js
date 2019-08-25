import React, { useState, useEffect } from 'react';
import { Select, Table, Modal } from 'antd';
import { connect } from 'react-redux';
import DetailTestStyle from './index.style';
import { withRouter } from 'react-router-dom';

import { getTestById, getAudioByTestAndVoice } from '../../../../actions/admin';

const { Option } = Select;

const DetailTest = ({
  getTestById,
  getAudioByTestAndVoice,
  testDetail,
  match,
  audios,
  user,
}) => {
  const [visible, setVisible] = useState(false);
  const [contentModal, setContentModal] = useState([]);

  useEffect(() => {
    getTestById(match.params.id);
  }, [getTestById, match.params.id]);

  const handleChange = voice => {
    testDetail.voices.forEach(item => {
      if (item.name === voice) {
        getAudioByTestAndVoice(match.params.id, item._id);
      }
    });
  };

  const columns = [
    {
      title: 'Nội dung audio',
      dataIndex: 'sentence',
      key: 'sentence',
      className: 'column',
      render: data => (
        <span
          style={{ textAlign: 'justify', display: 'block', maxWidth: '700px' }}
        >
          {data}
        </span>
      ),
    },
    {
      title: 'Số lượt đánh giá',
      dataIndex: 'numberOfReviews',
      key: 'numberOfReviews',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Điểm trung bình',
      dataIndex: 'averagePoint',
      key: 'averagePoint',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      key: 'action',
      render: (text, record) => {
        return (
          <span>
            <button onClick={() => showModal(record)}>
              Xem chi tiết đánh giá
            </button>
          </span>
        );
      },
    },
  ];

  const showModal = audio => {
    setContentModal(audio.users);
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const columnsModal = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      className: 'column1',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'column',
    },
    {
      title: 'Điểm đánh giá',
      dataIndex: 'point',
      key: 'point',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
  ];

  return (
    <DetailTestStyle>
      {testDetail ? (
        <Select
          defaultValue="Chọn giọng"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          {testDetail.voices.map(voice => (
            <Option key={voice._id} value={voice.name}>
              {voice.name}
            </Option>
          ))}
        </Select>
      ) : null}

      <Table
        className="table"
        bordered
        rowKey="_id"
        columns={columns}
        dataSource={audios}
      />
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {contentModal ? (
          <Table
            className="table"
            bordered
            rowKey="userId"
            columns={columnsModal}
            dataSource={contentModal}
          />
        ) : null}
      </Modal>
    </DetailTestStyle>
  );
};

const mapStateToProps = state => {
  return {
    testDetail: state.admin.testDetail,
    audios: state.admin.audios,
    user: state.auth.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getTestById, getAudioByTestAndVoice },
  )(DetailTest),
);
