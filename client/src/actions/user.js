import {
  GET_PRIVATE_TEST_SUCCESS,
  GET_PUBLIC_TEST_SUCCESS,
  SET_TEST_CURRENTLY,
  GET_AUDIO_FOR_USER,
  SET_POINT_FOR_AUDIO,
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

export const setPointForAudio = (audioId, userId, point) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    audioId,
    userId,
    point,
  };
  try {
    const res = await axios.put(`/api/users/set-point`, body, config);
    
    if (res.data.status === 1) {
      dispatch({
        type: SET_POINT_FOR_AUDIO,
      });
    }
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(setAlert(error.response.data.message, 'danger', 2000));
  }
};
