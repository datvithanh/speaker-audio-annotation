import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
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