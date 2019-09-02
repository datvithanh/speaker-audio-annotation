import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VoiceManagementStyle from './index.style';
import { Table, Button, Modal } from 'antd';
import { getVoices, deleteVoice } from '../../../actions/admin';
import { connect } from 'react-redux';

const VoiceManagement = ({ getVoices, voices, deleteVoice }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getVoices();
  }, [getVoices, voices]);

  const columns = [
    {
      title: 'Mã voice',
      dataIndex: '_id',
    },
    {
      title: 'Tên voice',
      dataIndex: 'name',
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
    {
      render: record => {
        const { _id } = record;
        return (
          <>
            <Button
              style={{ margin: '0 auto', display: 'block' }}
              onClick={() => showModal(_id)}
              type="primary"
            >
              Xóa
            </Button>
            <Modal
              title="Basic Modal"
              visible={visible}
              onOk={() => handleOk(_id)}
              onCancel={() => handleCancel(_id)}
            >
              {' '}
              <p>Bạn chắc chắn muốn xóa voice {_id} chứ?</p>
            </Modal>
          </>
        );
      },
    },
  ];

  const showModal = _id => {
    setVisible(true);
  };

  const handleOk = _id => {
    deleteVoice(_id);
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };
  return (
    <VoiceManagementStyle>
      <Link className="btn" to="/admin/voice-management/add-voice">
        Thêm voice
      </Link>
      <Table
        columns={columns}
        rowKey="_id"
        bordered
        className="table"
        dataSource={voices}
        pagination={{ pageSize: 6 }}
      />
    </VoiceManagementStyle>
  );
};

const mapStateToProps = state => {
  return {
    voices: state.admin.voices,
  };
};

export default connect(
  mapStateToProps,
  { getVoices, deleteVoice },
)(VoiceManagement);
