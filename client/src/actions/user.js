import { GET_PRIVATE_TEST_SUCCESS, GET_PUBLIC_TEST_SUCCESS } from './types';
import axios from 'axios';

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
