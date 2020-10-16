import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import CompetitionsStyle from './index.style';
import {
  getListCompetition,
  joinCompetition,
  getTaskProcess,
  getRandomizeAudio,
} from '../../../actions/team';

const Competitions = ({
  getListCompetition,
  joinCompetition,
  competitions,
  history,
}) => {
  useEffect(() => {
    getListCompetition();
  }, [getListCompetition]);

  const dispatch = useDispatch();

  const joinCompetitionHandler = (competitionId, status) => {
    status === 'join' && joinCompetition(competitionId);
    history.push(`/team/competitions/${competitionId}`);
    dispatch(getTaskProcess(competitionId));
    dispatch(getRandomizeAudio(competitionId));
  };

  const columns = [
    {
      title: 'Tên cuộc thi',
      dataIndex: 'name',
      width: '50%',
      render: name => name.toUpperCase(),
    },
    {
      title: 'Ngày bắt đầu',
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
          competition.numberOfCompletedAudio ===
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
        // return (
        //   <a
        //     href="http://localhost:5000/2020/10/17/18a3526e-0c3f-44e5-8e32-80848920999a/train-data.zip"
        //     style={{
        //       textDecoration: 'underline',
        //       textAlign: 'center',
        //       display: 'block',
        //     }}
        //   >
        //     Download Training Data
        //   </a>
        // );
      },
    },
  ];

  return (
    <CompetitionsStyle>
      <Table
        columns={columns}
        rowKey="_id"
        bordered
        className="table"
        dataSource={competitions}
        pagination={{ pageSize: 6 }}
      />
    </CompetitionsStyle>
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
