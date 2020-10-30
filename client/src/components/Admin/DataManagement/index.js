import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'antd';
import DataManagementStyle from './index.style';

const DataManagement = ({ history }) => {
  const [competitions, setCompetitions] = useState();

  const getListCompetition = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/get-list-competition',
    );

    setCompetitions(res.data.results.competitions);
  };

  useEffect(() => {
    getListCompetition();
  }, []);

  const columns = [
    {
      title: 'Tên cuộc thi',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>{data}</span>
      ),
    },
    {
      title: 'Số lượng người audio/người',
      key: 'numberOfAudiosPerListener',
      align: 'center',
      render: data => (
        <span style={{ textAlign: 'center', display: 'block' }}>
          {data.rules.numberOfAudiosPerListener}
        </span>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
      title: 'Ngày kết thúc',
      dataIndex: 'timeExpired',
      key: 'timeExpired',
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
      key: 'action',
      render: (text, record) => {
        return (
          <span>
            <Button
              type="primary"
              style={{ display: 'block', margin: '0 auto' }}
              onClick={() => history.push(`data-management/${record._id}`)}
            >
              Xem dữ liệu
            </Button>
          </span>
        );
      },
    },
  ];

  return (
    <DataManagementStyle>
      {competitions && (
        <Table
          className="table"
          bordered
          rowKey="_id"
          columns={columns}
          dataSource={competitions}
        />
      )}
    </DataManagementStyle>
  );
};

export default DataManagement;
