import axios from 'axios';
import { setAlert } from './alert';
import { GET_LIST_COMPETITION, JOIN_COMPETITIONS } from './types';

// Get list competition
export const getListCompetition = () => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + '/api/teams/get-list-competition',
    );
    if (res.data.status === 1) {
      dispatch({
        type: GET_LIST_COMPETITION,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const joinCompetition = competitionId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    competitionId,
  });
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_DOMAIN + '/api/teams/join-competiton',
      body,
      config,
    );
    if (res.data.status === 1) {
      dispatch({
        type: JOIN_COMPETITIONS,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
