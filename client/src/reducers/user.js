import {
  GET_PUBLIC_TEST_SUCCESS,
  GET_PRIVATE_TEST_SUCCESS,
  SET_TEST_CURRENTLY,
  GET_AUDIO_FOR_USER, 
  SET_POINT_FOR_AUDIO,
} from '../actions/types';

const initialState = {
  publicTest: null,
  privateTest: null,
  testCurrently: null,
  audios: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PUBLIC_TEST_SUCCESS:
      return {
        ...state,
        publicTest: payload.tests,
      };
    case GET_PRIVATE_TEST_SUCCESS:
      return {
        ...state,
        privateTest: payload.tests,
      };
    case SET_TEST_CURRENTLY:
      return {
        ...state,
        testCurrently: payload,
      };
    case GET_AUDIO_FOR_USER: 
      return {
        ...state, 
        audios: payload.audios,
      }
    case SET_POINT_FOR_AUDIO: 
      return {
        ...state,
      }
    default:
      return state;
  }
}
