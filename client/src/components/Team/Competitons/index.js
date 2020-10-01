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
      title: 'Name',
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
            style={{ margin: '0 auto', display: 'block' }}
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
            style={{ margin: '0 auto', display: 'block' }}
            type="primary"
            onClick={() => joinCompetitionHandler(competition._id, 'joined')}
          >
            Thực hiện tiếp
          </Button>
        );
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
