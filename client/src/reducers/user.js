import { GET_PUBLIC_TEST_SUCCESS, GET_PRIVATE_TEST_SUCCESS } from '../actions/types';

const initialState = {
  publicTest: null,
  privateTest: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PUBLIC_TEST_SUCCESS: 
      return {
        ...state, 
        publicTest: payload.tests,
      }
    case GET_PRIVATE_TEST_SUCCESS:
      return {
        ...state,
        privateTest: payload.tests,
      }
    default: return state;
  }
}