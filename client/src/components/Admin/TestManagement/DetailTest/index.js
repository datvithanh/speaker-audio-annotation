import React, { useState, useEffect, useRef } from 'react';
import { Select, Table, Modal, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import DetailTestStyle from './index.style';
import { withRouter } from 'react-router-dom';

import {
  getTestById,
  getAudioByTestAndVoice,
  getAllAudioByTestId,
} from '../../../../actions/admin';

const { Option } = Select;

const DetailTest = ({
  getTestById,
  getAudioByTestAndVoice,
  testDetail,
  match,
  audios,
  getAllAudioByTestId,
}) => {
  const [visible, setVisible] = useState(false);
  const [contentModal, setContentModal] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    getTestById(match.params.id);
    getAllAudioByTestId(match.params.id);
  }, [getAllAudioByTestId, getTestById, match.params.id]);

  const handleChange = voice => {
    if (voice === 'all') {
      getAllAudioByTestId(testDetail._id);
    } else {
      testDetail.voices.forEach(item => {
        if (item.name === voice) {
          getAudioByTestAndVoice(match.params.id, item._id);
        }
      });
    }
  };

  const onClickIconAudioHanler = link => {
    audioRef.current.src = process.env.REACT_APP_API_DOMAIN + link;
    audioRef.current.play();
  };

  const columns = [
    {
      title: 'Tên voice',
      dataIndex: 'voice',
      key: 'voice',
      width: '90px',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Nội dung audio',
      dataIndex: 'sentence',
      key: 'sentence',
      className: 'column',
      render: data => (
        <span
          style={{
            textAlign: 'justify',
            display: 'flex',
            alignItems: 'flex-end',
            maxWidth: '700px',
          }}
        >
          {data}
        </span>
      ),
    },
    {
      title: 'Nghe audio',
      dataIndex: 'link',
      key: 'link',
      className: 'column',
      render: link => (
        <span
          style={{ textAlign: 'center', display: 'block', cursor: 'pointer' }}
        >
          <Icon
            onClick={() => onClickIconAudioHanler(link)}
            type="sound"
            theme="filled"
          />
        </span>
      ),
    },
    {
      title: 'Số lượt đánh giá',
      dataIndex: 'numberOfReviews',
      key: 'numberOfReviews',
      width: '100px',
      className: 'column',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Điểm trung bình',
      dataIndex: 'averagePoint',
      key: 'averagePoint',
      width: '100px',
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
            <Button onClick={() => showModal(record)} type="primary">
              Xem chi tiết đánh giá
            </Button>
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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Điểm đánh giá',
      dataIndex: 'point',
      key: 'point',
      className: 'ant-table-thead',
      align: 'center',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Cập nhật ngày',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      align: 'center',
      render: dateString => {
        const date = new Date(dateString);
        return (
          <>
            {dateString ? (
              <span style={{ textAlign: 'center', display: 'block' }}>
                {date.getDate() +
                  ' - ' +
                  (date.getMonth() + 1) +
                  ' - ' +
                  date.getFullYear()}
              </span>
            ) : null}
          </>
        );
      },
    },
  ];

  return (
    <DetailTestStyle>
      {testDetail ? (
        <>
          <h2>Chi tiết các audio của bài test {testDetail.name}</h2>
          <audio className="audio" ref={audioRef} controls>
            <track kind="captions" />
          </audio>
          <Select
            defaultValue="Tất cả"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="all">Tất cả</Option>
            {testDetail.voices.map(voice => (
              <Option key={voice._id} value={voice.name}>
                {voice.name}
              </Option>
            ))}
          </Select>
        </>
      ) : null}

      <Table
        className="table"
        bordered
        rowKey="_id"
        columns={columns}
        dataSource={audios}
      />
      <Modal
        title="Chi tiết đánh giá từng người"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ minWidth: '60%' }}
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
    { getTestById, getAudioByTestAndVoice, getAllAudioByTestId },
  )(DetailTest),
);
