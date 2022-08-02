import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  RESET_AUDIOS,
  REMOVE_ALERT,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';
import { response } from 'express';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + '/api/users',
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data.results,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = ({
  name,
  email,
  password,
  birthYear,
  sex,
  job,
  hometown,
  yearLivingInHaNoi,
  yearLivingInHCM,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    email,
    password,
    birthYear,
    sex,
    job,
    hometown,
    yearLivingInHaNoi,
    yearLivingInHCM,
  });
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_DOMAIN + '/api/users/signup',
      body,
      config,
    );
    if (res.data.status === 1) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.results,
      });

      dispatch(loadUser());
      dispatch({ type: REMOVE_ALERT });
    } else {
      toast.error(res.data.message);
      dispatch({
        type: REGISTER_FAILED,
      });
    }
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: REGISTER_FAILED,
    });
  }
};

// Register user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_DOMAIN + '/api/users/signin',
      body,
      config,
    );

    if (res.data.status === 1) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.results,
      });

      dispatch(loadUser());
    } else {
      toast.error(res.data.message);
      dispatch({
        type: LOGIN_FAILED,
      });
    }
  } catch (error) {
    toast.error(error.response.data.message);

    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

// Logout
export const logout = () => async dispatch => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_DOMAIN + '/api/users/logout',
    );
    if (res.data.status === 1) {
      dispatch({ type: LOGOUT });
      dispatch({ type: RESET_AUDIOS });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
