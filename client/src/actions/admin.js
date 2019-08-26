import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  ADD_TEST_FAILED,
  ADD_TEST_SUCCESS,
  SET_STEP_CREATE_TEST,
  SET_DIRECTORY_AUDIO_PATH,
  SET_DIRECTORY_SENTENCES_PATH,
  GET_LIST_USERS,
  ADD_USER_AND_FILEUPLOAD_SUCCESS,
  ADD_USER_USER_AND_FILEUPLOAD_FAILED,
  RESET_TEST,
  SET_USER_CHOSEN,
  GET_LIST_TEST,
  GET_TEST_BY_ID,
  GET_AUDIO_BY_TEST_AND_VOICE,
  RESET_AUDIO_STORE,
} from './types';

// Get list user
export const getListUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/users');
    if (res.data.status === 1) {
      dispatch({
        type: GET_LIST_USERS,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// Add user
export const addUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/admin/add-user', body, config);
    if (res.data.status === 1) {
      dispatch({
        type: ADD_USER_SUCCESS,
      });
    } else {
      dispatch(setAlert(res.data.message, 'danger', 2000));
      dispatch({
        type: ADD_USER_FAILED,
      });
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 2000));
    dispatch({
      type: ADD_USER_FAILED,
    });
  }
};

// Add test
export const addTest = ({
  name,
  numberOfVoices,
  voices,
  numberOfSentences,
  minSentences,
  minPeopleListenAudio,
  minPeopleJoin,
  accessModifier,
  dateOpened,
  dateClosed,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    numberOfVoices,
    voices,
    numberOfSentences,
    minSentences,
    minPeopleListenAudio,
    accessModifier,
    dateOpened,
    dateClosed,
  });

  try {
    const res = await axios.post('/api/admin/create-test', body, config);
    if (res.data.status === 1) {
      dispatch({
        type: ADD_TEST_SUCCESS,
        payload: res.data.results,
      });
      dispatch(setStepCreateTest('step2'));
    } else {
      dispatch(setAlert(res.data.message, 'danger', 2000));
      dispatch({
        type: ADD_TEST_FAILED,
      });
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 2000));
    dispatch({
      type: ADD_TEST_FAILED,
    });
  }
};

export const setStepCreateTest = step => dispatch => {
  dispatch({
    type: SET_STEP_CREATE_TEST,
    payload: step,
  });
};

export const setUserChosen = users => dispatch => {
  dispatch({
    type: SET_USER_CHOSEN,
    payload: users,
  });
};

// Add user
export const addUserAndFileupload = (
  users,
  test,
  sentencePath,
  audioPath,
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ users, test, sentencePath, audioPath });

  try {
    const res = await axios.put('/api/admin/add-user-fileupload', body, config);

    if (res.data.status === 1) {
      dispatch({
        type: ADD_USER_AND_FILEUPLOAD_SUCCESS,
        payload: res.data.results,
      });
    } else {
      dispatch(setAlert(res.data.message, 'danger', 2000));
      dispatch({
        type: ADD_USER_USER_AND_FILEUPLOAD_FAILED,
      });
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 2000));
    dispatch({
      type: ADD_USER_USER_AND_FILEUPLOAD_FAILED,
    });
  }
};

export const setSentencePath = sentencePath => dispatch => {
  dispatch({
    type: SET_DIRECTORY_SENTENCES_PATH,
    payload: sentencePath,
  });
};

export const setAudioPath = audioPath => dispatch => {
  dispatch({
    type: SET_DIRECTORY_AUDIO_PATH,
    payload: audioPath,
  });
};

export const resetTest = () => async dispatch => {
  dispatch({
    type: RESET_TEST,
  });
};

export const getListTest = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/tests');

    if (res.data.status === 1) {
      dispatch({
        type: GET_LIST_TEST,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const getTestById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/admin/tests/${id}`);
    
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

export const getAudioByTestAndVoice = (test, voice) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/admin/get-audio?test=${test}&voice=${voice}`,
    );
    
    if (res.data.status === 1) {
      dispatch({
        type: GET_AUDIO_BY_TEST_AND_VOICE,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const resetAudioStore = () => async dispatch => {
  try {
    dispatch({
      type: RESET_AUDIO_STORE,
    })
  } catch (error) {
    console.log(error.response.data.message);
  }
}