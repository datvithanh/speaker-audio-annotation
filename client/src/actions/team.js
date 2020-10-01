import axios from 'axios';
import {
  GET_LIST_COMPETITION,
  JOIN_COMPETITIONS,
  GET_LIST_TRANSCRIPT,
  GET_RANDOMIZE_AUDIO,
  GET_COMPETITION_BY_ID,
  FINISH_TASK,
  GET_TASK_PROCESS,
  INCEASE_COMPLETED_AUDIO,
} from './types';

import { toast } from 'react-toastify';

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

export const getRandomizeAudio = competitionId => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN +
        `/api/teams/randomize-audio/${competitionId}`,
    );

    if (res.data.status === 1) {
      dispatch({
        type: GET_RANDOMIZE_AUDIO,
        payload: res.data.results,
      });

      dispatch(getListTranscript(res.data.results.audio._id));
      // dispatch(getListTranscript('5f6c5f6ab286b052d2dd6590'));
    }
  } catch (error) {
    if (error.response.data.message === 'completed') {
      dispatch({
        type: FINISH_TASK,
      });
    }
  }
};

export const getListTranscript = audioId => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN +
        `/api/teams/get-list-transcript/${audioId}`,
    );

    if (res.data.status === 1) {
      dispatch({
        type: GET_LIST_TRANSCRIPT,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCompetitionById = competitionId => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN +
        `/api/teams/get-competition/${competitionId}`,
    );

    if (res.data.status === 1) {
      dispatch({
        type: GET_COMPETITION_BY_ID,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const typing = (text, audioId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    text,
    audioId,
  });

  try {
    const res = await axios.patch(
      process.env.REACT_APP_API_DOMAIN + `/api/teams/typing`,
      body,
      config,
    );

    if (res.data.status === 1) {
      dispatch({ type: INCEASE_COMPLETED_AUDIO });
      dispatch(getRandomizeAudio(res.data.results.audio.competitionId));
    }
  } catch (error) {
    if (error.response.data.message === 'Dupicate text content to anyone') {
      toast.error('Nội dung bị trùng!');
    }

    if (error.response.data.message === 'Missing text') {
      toast.error('Bạn chưa nhập nội dung!');
    }
  }
};

export const voting = (teamId, audioId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    teamId,
    audioId,
  });

  try {
    const res = await axios.patch(
      process.env.REACT_APP_API_DOMAIN + `/api/teams/voting`,
      body,
      config,
    );

    if (res.data.status === 1) {
      dispatch({ type: INCEASE_COMPLETED_AUDIO });
      dispatch(getRandomizeAudio(res.data.results.audio.competitionId));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const getTaskProcess = competitionId => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN +
        `/api/teams/get-task-process/${competitionId}`,
    );

    if (res.data.status === 1) {
      dispatch({
        type: GET_TASK_PROCESS,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
