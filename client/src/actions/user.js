import {
  GET_PRIVATE_TEST_SUCCESS,
  GET_PUBLIC_TEST_SUCCESS,
  SET_TEST_CURRENTLY,
  GET_AUDIO_FOR_USER,
  SET_POINT_FOR_AUDIO,
  UPDATE_REAL_USER_FOR_AUDIO,
  INCREASE_INDEX_AUDIO,
  DECREASE_INDEX_AUDIO,
  GET_INDEX_AUDIO,
  SET_AUDIOS,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getPublicTest = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/public-tests');
    if (res.data.status === 1) {
      dispatch({
        type: GET_PUBLIC_TEST_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPrivateTest = user => async dispatch => {
  try {
    const res = await axios.get(`/api/users/private-tests/${user}`);

    if (res.data.status === 1) {
      dispatch({
        type: GET_PRIVATE_TEST_SUCCESS,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setTestCurrently = testCurrently => dispatch => {
  dispatch({
    type: SET_TEST_CURRENTLY,
    payload: testCurrently,
  });
};

export const getAudioForUser = (user, test) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/users/get-audio?user=${user}&test=${test}`,
    );

    if (res.data.status === 1) {
      dispatch({
        type: GET_AUDIO_FOR_USER,
        payload: res.data.results,
      });
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 2000));
  }
};

export const setPointForAudio = (
  testId,
  audioId,
  userId,
  point,
  indexAudio,
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    testId,
    audioId,
    userId,
    point,
    indexAudio,
  };
  try {
    const res = await axios.put(`/api/users/set-point`, body, config);

    if (res.data.status === 1) {
      dispatch({
        type: SET_POINT_FOR_AUDIO,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.response.data.message, 'danger', 2000));
  }
};

export const updateRealUserForAudio = (userId, testId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    userId,
    testId,
  };
  try {
    const res = await axios.put('/api/users/update-real-user', body, config);

    if (res.data.status === 1) {
      dispatch({
        type: UPDATE_REAL_USER_FOR_AUDIO,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
    // console.log(error.response.data.message);
  }
};

export const increaseIndexAudio = () => dispatch => {
  dispatch({
    type: INCREASE_INDEX_AUDIO,
  });
};

export const decreaseIndexAudio = () => dispatch => {
  dispatch({
    type: DECREASE_INDEX_AUDIO,
  });
};

export const getIndexAudio = (userId, testId) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/users/get-index-audio?userId=${userId}&&testId=${testId}`,
    );

    if (res.data.status === 1) {
      dispatch({
        type: GET_INDEX_AUDIO,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setAudios = (id, point) => dispatch => {
  dispatch({
    type: SET_AUDIOS,
    payload: { id, point },
  });
};
