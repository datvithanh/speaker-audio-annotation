import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import CompetitionsStyle from './index.style';
import {
  getListCompetition,
  joinCompetition,
  getTaskProcess,
  getRandomizeAudio,
} from '../../../actions/team';
import axios from 'axios';

const Competitions = ({
  getListCompetition,
  joinCompetition,
  competitions,
  history,
}) => {
  useEffect(() => {
    getListCompetition();
    getResource();
  }, [getListCompetition]);

  const [resource, setResource] = useState();
  const dispatch = useDispatch();

  const joinCompetitionHandler = (competitionId, status) => {
    status === 'join' && joinCompetition(competitionId);
    history.push(`/team/competitions/${competitionId}`);
    dispatch(getTaskProcess(competitionId));
    dispatch(getRandomizeAudio(competitionId));
  };

  const getResource = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + `/api/teams/get-resource`,
    );

    if (res && res.data) {
      setResource(res.data.results.file);
    }
  };

  const columns = [
    {
      // title: 'Tên cuộc thi',
      dataIndex: 'name',
      width: '50%',
      render: name => name.toUpperCase(),
    },
    {
      // title: 'Ngày bắt đầu',
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
      title: 'Ngày kết thúc',
      dataIndex: 'timeExpired',
      key: 'timeExpired',
      align: 'center',
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
      render: competition => {
        return competition.numberOfCompletedAudio === undefined ? (
          <Button
            style={{
              margin: '0 auto',
              display: 'block',
              backgroundColor: '#0b6398',
            }}
            type="primary"
            onClick={() => joinCompetitionHandler(competition._id, 'join')}
          >
            Tham gia
          </Button>
        ) : competition.numberOfCompletedAudio &&
          competition.numberOfCompletedAudio >=
            competition.rules.numberOfAudiosPerListener ? (
          <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
            Đã hoàn thành
          </div>
        ) : (
          <Button
            style={{
              margin: '0 auto',
              display: 'block',
              backgroundColor: '#0b6398',
            }}
            type="primary"
            onClick={() => joinCompetitionHandler(competition._id, 'joined')}
          >
            Thực hiện tiếp
          </Button>
        );
      },
    },
  ];

  // // DEMO
  const columnsFile = [
    {
      // title: 'Tên cuộc thi',
      dataIndex: 'fileName',
      width: '50%',
      render: name =>
        'Dữ liệu huấn luyện cho cuộc thi VLSP TTS 2020'.toUpperCase(),
    },
    {
      // title: 'Ngày bắt đầu',
      dataIndex: 'link',
      align: 'center',
      render: link => {
        return (
          <Button
            style={{ color: 'white', backgroundColor: '#0f6398' }}
            href={`${process.env.REACT_APP_API_DOMAIN}/${link}`}
          >
            Download
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <CompetitionsStyle>
        <h4>Công việc cần hoàn thành</h4>
        <Table
          columns={columns}
          rowKey="_id"
          bordered
          className="table"
          dataSource={competitions}
          pagination={{ pageSize: 6 }}
        />
      </CompetitionsStyle>

      <CompetitionsStyle>
        <h4>Tài nguyên được chia sẻ</h4>
        <Table
          columns={columnsFile}
          rowKey="_id"
          bordered
          className="table"
          dataSource={resource}
          pagination={{ pageSize: 6 }}
        />
      </CompetitionsStyle>
    </>
  );
};

const mapStateToProps = state => {
  return {
    competitions: state.team.competitions,
  };
};

export default connect(
  mapStateToProps,
  { getListCompetition, joinCompetition },
)(Competitions);
