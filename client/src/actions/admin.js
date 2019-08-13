import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  ADD_TEST_FAILED,
  ADD_TEST_SUCCESS,
} from './types';

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
