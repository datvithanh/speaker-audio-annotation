import axios from 'axios';
import { toast } from 'react-toastify';

import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  ADD_TEST_FAILED,
  ADD_TEST_SUCCESS,
  SET_STEP_CREATE_TEST,
  SET_DIRECTORY_AUDIO_PATH,
  GET_LIST_USERS,
  ADD_USER_AND_FILEUPLOAD_SUCCESS,
  ADD_USER_USER_AND_FILEUPLOAD_FAILED,
  RESET_TEST,
  SET_USER_CHOSEN,
  GET_LIST_TEST,
  GET_TEST_BY_ID,
  GET_AUDIO_BY_TEST_AND_VOICE,
  RESET_AUDIO_STORE,
  RESET_USER_CHOOSEN,
  GET_ALL_AUDIO_BY_TEST_ID,
  GET_VOICES,
} from './types';

// Get list user
export const getListUser = () => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/users',
    );
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
    const res = await axios.post(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/add-user',
      body,
      config,
    );
    if (res.data.status === 1) {
      dispatch({
        type: ADD_USER_SUCCESS,
      });
      toast.success('Thêm thành công');
    } else {
      toast.error(res.data.message);
      dispatch({
        type: ADD_USER_FAILED,
      });
    }
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: ADD_USER_FAILED,
    });
  }
};

// Add test
export const addTest = ({
  type,
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
    type,
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
    const res = await axios.post(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/create-test',
      body,
      config,
    );
    if (res.data.status === 1) {
      dispatch({
        type: ADD_TEST_SUCCESS,
        payload: res.data.results,
      });
      dispatch(setStepCreateTest('step2'));
    } else {
      toast.error(res.data.message);
      dispatch({
        type: ADD_TEST_FAILED,
      });
    }
  } catch (error) {
    toast.error(error.response.data.message);
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
  audioPath,
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ users, test, audioPath });

  try {
    const res = await axios.put(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/add-user-fileupload',
      body,
      config,
    );

    if (res.data.status === 1) {
      dispatch({
        type: ADD_USER_AND_FILEUPLOAD_SUCCESS,
        payload: res.data.results,
      });
      dispatch({
        type: RESET_USER_CHOOSEN,
      });
    } else {
      toast.error(res.data.message);
      dispatch({
        type: ADD_USER_USER_AND_FILEUPLOAD_FAILED,
      });
    }
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: ADD_USER_USER_AND_FILEUPLOAD_FAILED,
    });
  }
};

// export const setSentencePath = sentencePath => dispatch => {
//   dispatch({
//     type: SET_DIRECTORY_SENTENCES_PATH,
//     payload: sentencePath,
//   });
// };

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
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/tests',
    );

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
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + `/api/admin/tests/${id}`,
    );

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
      process.env.REACT_APP_API_DOMAIN +
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
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const getAllAudioByTestId = testId => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + `/api/admin/get-all-audios/${testId}`,
    );

    if (res.data.status === 1) {
      dispatch({
        type: GET_ALL_AUDIO_BY_TEST_ID,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getVoices = () => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/get-voices',
    );
    if (res.data.status === 1) {
      dispatch({
        type: GET_VOICES,
        payload: res.data.results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addVoice = (voiceId, voiceName) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    voiceId,
    voiceName,
  };
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/add-voice',
      body,
      config,
    );

    if (res.data.status === 1) {
      toast.success('Thêm voice thành công!');
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteVoice = voiceId => async dispatch => {
  try {
    await axios.delete(
      process.env.REACT_APP_API_DOMAIN + '/api/admin/delete-voice/' + voiceId,
    );
  } catch (error) {
    console.log(error);
  }
};
