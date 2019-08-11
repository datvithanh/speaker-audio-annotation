import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  ADD_TEST_FAILED,
  ADD_TEST_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case ADD_USER_SUCCESS:
    case ADD_USER_FAILED:
    case ADD_TEST_SUCCESS:
    case ADD_TEST_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
