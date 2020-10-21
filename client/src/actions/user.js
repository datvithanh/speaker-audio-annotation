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
  SET_INDEX_AUDIO,
  CHANGE_PASSWORD,
  RESET_AUDIOS,
  UPDATE_PUBLIC_TEST_AFTER_USER_JOIN,
  SET_MAX_INDEX_AUDIO,
  GET_TEST_BY_ID,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getPublicTest = () => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + '/api/users/public-tests',
    );
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
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + `/api/users/private-tests/${user}`,
    );

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
      process.env.REACT_APP_API_DOMAIN +
        `/api/users/get-audio?user=${user}&test=${test}`,
    );

    if (res.data.status === 1) {
      dispatch({
        type: GET_AUDIO_FOR_USER,
        // payload: {"audios": randomArray},
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
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
    const res = await axios.put(
      process.env.REACT_APP_API_DOMAIN + `/api/users/set-point`,
      body,
      config,
    );

    if (res.data.status === 1) {
      dispatch({
        type: SET_POINT_FOR_AUDIO,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.response.data.message, 'danger', 1000));
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
    const res = await axios.put(
      process.env.REACT_APP_API_DOMAIN + '/api/users/update-real-user',
      body,
      config,
    );

    if (res.data.status === 1) {
      dispatch({
        type: UPDATE_REAL_USER_FOR_AUDIO,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
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

export const setIndexAudio = _id => dispatch => {
  dispatch({
    type: SET_INDEX_AUDIO,
    payload: _id,
  });
};

export const getIndexAudio = (userId, testId) => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN +
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

export const changePassword = (
  userId,
  password,
  newPassword,
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { userId, password, newPassword };
  try {
    const res = await axios.put(
      process.env.REACT_APP_API_DOMAIN + '/api/users/change-password',
      body,
      config,
    );

    if (res.data.status === 1) {
      dispatch({
        type: CHANGE_PASSWORD,
      });
      dispatch(setAlert('Đổi mật khẩu thành công', 'success', 2000));
      setTimeout(() => {
        window.location.href = '/team/competitions';
      }, 2000);
    } else {
      dispatch(setAlert(res.data.message, 'danger', 1000));
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 1000));
  }
};

export const resetAudio = () => dispatch => {
  dispatch({
    type: RESET_AUDIOS,
  });
};

export const updatePublicTestAfterUserJoin = (testId, userId) => dispatch => {
  dispatch({
    type: UPDATE_PUBLIC_TEST_AFTER_USER_JOIN,
    payload: { testId, userId },
  });
};

export const setMaxIndexAudio = (userId, testId) => async dispatch => {
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
    const res = await axios.put(
      process.env.REACT_APP_API_DOMAIN + `/api/users/set-max-index-audio`,
      body,
      config,
    );

    if (res.data.status === 1) {
      dispatch({
        type: SET_MAX_INDEX_AUDIO,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTestById = id => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + `/api/users/tests/${id}`,
    );

    console.log({ data: res.data });

    if (res.data.status === 1) {
      dispatch({
        type: GET_TEST_BY_ID,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};
