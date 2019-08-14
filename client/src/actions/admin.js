import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  ADD_TEST_FAILED,
  ADD_TEST_SUCCESS,
  SET_STEP_CREATE_TEST,
  GET_LIST_USERS,
  ADD_USER_CHOSEN_SUCCESS, 
  ADD_USER_CHOSEN_FAILED,
  RESET_TEST,
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

export const setStepCreateTest = step => dispatch => {
  dispatch({
    type: SET_STEP_CREATE_TEST,
    payload: step,
  });
};

// Add user
export const addUserChosen = (users, test) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ users, test });
  try {
    const res = await axios.put('/api/admin/add-user-choosen', body, config);
    
    if (res.data.status === 1) {
      dispatch({
        type: ADD_USER_CHOSEN_SUCCESS,
        payload: res.data.results,
      });
    } else {
      dispatch(setAlert(res.data.message, 'danger', 2000));
      dispatch({
        type: ADD_USER_CHOSEN_FAILED,
      });
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 2000));
    dispatch({
      type: ADD_USER_CHOSEN_FAILED,
    });
  }
};

export const resetTest = () => async dispatch => {
  dispatch({
    type: RESET_TEST,
  })
}